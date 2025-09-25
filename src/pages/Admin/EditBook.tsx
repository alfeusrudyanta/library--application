import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import generateRandomString from '@/hooks/generateRandomString';
import { useAuthors } from '@/hooks/useAuthors';
import { useBooks, useBooksQuery } from '@/hooks/useBooks';
import useCategories from '@/hooks/useCategories';
import {
  ArrowLeft,
  ArrowUpToLine,
  CloudUpload,
  Trash,
  ChevronDown,
} from 'lucide-react';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

const EditBook = () => {
  const { id } = useParams();
  const { BooksQueryData } = useBooksQuery(Number(id));
  const navigate = useNavigate();
  const { CategoriesQuery } = useCategories();
  const { PutBooksMutation, loading, error, success } = useBooks();
  const { AuthorsQuery } = useAuthors();
  const { PostAuthorsMutation } = useAuthors();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [categoryId, setCategoryId] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>();
  const [description, setDescription] = useState<string>('');
  const [imageFile, setImageFile] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleTriggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | { target: { files: FileList | null } }
  ) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      setImageFile(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!categoryId) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    const authorIndex = AuthorsQuery?.data.authors.findIndex(
      (item) => item.name.toLowerCase() === author.toLowerCase().trim()
    );

    if (authorIndex === undefined || authorIndex === -1) {
      PostAuthorsMutation({
        name: author,
        bio: generateRandomString(20),
      });
    }

    if (authorIndex === undefined || authorIndex === -1) {
      setErrorMsg('Creating new author. Please click save once again.');
      return;
    }

    const authorId = AuthorsQuery!.data.authors[authorIndex].id;

    PutBooksMutation({
      id: Number(id),
      data: {
        title,
        description,
        categoryId,
        coverImage: imageFile,
        authorId,
        isbn: generateRandomString(10),
        publishedYear: 0,
        totalCopies: 1,
        availableCopies: 0,
      },
    });
  };

  useEffect(() => {
    if (BooksQueryData?.data) {
      setTitle(BooksQueryData.data.title);
      setAuthor(BooksQueryData.data.author.name);
      setCategoryId(BooksQueryData.data.categoryId);
      setPageNumber(320);
      setDescription(BooksQueryData.data.description);
      setImageFile(BooksQueryData.data.coverImage);
    }
  }, [BooksQueryData]);

  useEffect(() => {
    if (error) {
      setErrorMsg('Server Error. Please try again later.');
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      toast.success('Edit Success ');
      navigate('/admin');
    }
  }, [success, navigate]);

  return (
    <div className='flex items-center justify-center'>
      <div className='flex w-full max-w-[530px] flex-col gap-4'>
        {/* Redirect */}
        <Link to='/admin'>
          <div className='flex items-center gap-[6px] md:gap-3'>
            <ArrowLeft className='size-6 cursor-pointer md:size-[32px]' />
            <span className='md:text-display-sm text-xl font-bold'>
              Edit Book
            </span>
          </div>
        </Link>

        {/* Form */}
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          {/* Title */}
          <div className='flex flex-col'>
            <span className='font-bold md:text-sm'>Title</span>
            <Input
              type='text'
              placeholder='Title'
              value={title}
              required
              disabled={loading}
              onChange={(e) => setTitle(e.currentTarget.value)}
              className='h-12 font-semibold'
            />
          </div>

          {/* Author */}
          <div className='flex flex-col'>
            <span className='font-bold md:text-sm'>Author</span>
            <Input
              type='text'
              placeholder='Author'
              value={author}
              required
              disabled={loading}
              onChange={(e) => setAuthor(e.currentTarget.value)}
              className='h-12 font-semibold'
            />
          </div>

          {/* Category */}
          <div className='flex flex-col'>
            <span className='font-bold md:text-sm'>Category</span>
            <div className='relative flex w-full'>
              <select
                name='category'
                value={categoryId}
                required
                disabled={loading}
                onChange={(e) => setCategoryId(Number(e.currentTarget.value))}
                className='h-12 w-full cursor-pointer appearance-none rounded-[12px] border border-neutral-300 px-4 md:h-12'
              >
                <option value=''>Select a category</option>
                {CategoriesQuery?.data.categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <ChevronDown className='absolute top-1/2 right-4 -z-10 size-5 -translate-y-1/2 cursor-pointer text-neutral-950' />
            </div>
          </div>

          {/* Number of Pages */}
          <div className='flex flex-col'>
            <span className='font-bold md:text-sm'>Number of Pages</span>
            <Input
              type='number'
              placeholder='Number of Pages'
              value={pageNumber}
              required
              disabled={loading}
              onChange={(e) => setPageNumber(Number(e.currentTarget.value))}
              className='h-12 font-semibold'
            />
          </div>

          {/* Description */}
          <div className='flex flex-col'>
            <span className='font-bold md:text-sm'>Description</span>
            <textarea
              placeholder='Description'
              value={description}
              required
              disabled={loading}
              onChange={(e) => setDescription(e.currentTarget.value)}
              className='h-[100px] rounded-[12px] border border-neutral-300 p-4 font-semibold'
            />
          </div>

          {/* Cover Image */}
          {!imageFile && (
            <div
              className='relative flex h-[140px] flex-col items-center gap-4 rounded-[12px] border border-dotted border-[#A4A7AE]'
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleImageChange({ target: { files: e.dataTransfer.files } });
              }}
            >
              <Input
                id='image'
                type='file'
                accept='image/*'
                onChange={handleImageChange}
                disabled={loading}
                className='absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0'
              />
              <div className='absolute inset-0 flex flex-col items-center justify-center gap-1 text-[14px] leading-[28px] font-semibold text-[#414651]'>
                <div className='flex items-center justify-center rounded-[8px] border border-[#D5D7DA] p-2'>
                  <CloudUpload />
                </div>
                <p>
                  <span className='text-[#0093DD]'>Click or drag</span> to
                  upload an image
                </p>
                <p>PNG or JPG (max. 5mb)</p>
              </div>
            </div>
          )}

          {imageFile && (
            <div className='relative flex h-[260px] flex-col items-center gap-4 rounded-[12px] border border-dotted border-[#A4A7AE] px-[100px] pt-4'>
              <input
                type='file'
                accept='image/*'
                ref={fileInputRef}
                className='hidden'
                disabled={loading}
                onChange={handleImageChange}
              />

              <div className='absolute flex flex-col gap-3'>
                <div className='mx-auto h-[140px] w-[100px] overflow-hidden'>
                  <img
                    src={imageFile}
                    alt='Image Preview'
                    onError={(e) =>
                      (e.currentTarget.src = '/images/book-no-cover.jpg')
                    }
                    className='h-full w-full object-cover object-center'
                  />
                </div>
                <div className='flex flex-row justify-center gap-3'>
                  <Button
                    type='button'
                    disabled={loading}
                    onClick={handleTriggerFileInput}
                    className='bg-neutral-25 flex w-full items-center justify-center rounded-[10px] border border-neutral-300 px-3 font-medium text-neutral-950 hover:bg-neutral-50 md:h-10 md:text-sm'
                  >
                    <ArrowUpToLine height={20} width={20} />
                    Change&nbsp;Image
                  </Button>

                  <Button
                    type='button'
                    disabled={loading}
                    onClick={handleRemoveImage}
                    className='bg-neutral-25 flex w-full items-center justify-center rounded-[10px] border border-neutral-300 px-3 font-medium text-[#D9206E] hover:bg-red-50 md:h-10 md:text-sm'
                  >
                    <Trash height={20} width={20} />
                    Delete&nbsp;Image
                  </Button>
                </div>
                <span className='text-center md:text-sm'>
                  PNG or JPG (max. 5mb)
                </span>
              </div>
            </div>
          )}

          {errorMsg && <span className='text-red-600'>{errorMsg}</span>}

          {/* Button */}
          <Button className='h-12'>Save</Button>
        </form>
      </div>
    </div>
  );
};

export default EditBook;
