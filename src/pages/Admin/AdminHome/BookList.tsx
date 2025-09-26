import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useBooks, useBooksFilterQuery, useBooksQuery } from '@/hooks/useBooks';
import useWindowWidth from '@/hooks/useWindowWidth';
import { cn } from '@/lib/utils';
import { Search, Star, Ellipsis } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import type { BookDetail } from '@/types/books';
import Loading from '@/components/Loading';
import { toast } from 'sonner';

const BookFilter = ['All', 'Available', 'Borrowed', 'Returned', 'Damaged'];

const BookList = () => {
  const [search, setSearch] = useState<string>('');
  const [bookFilter, setBookFilter] = useState<string>('All');
  const [filteredBooks, setFilteredBooks] = useState<BookDetail[]>([]);

  const { BooksQueryFilterData } = useBooksFilterQuery({
    q: search,
    categoryId: undefined,
    authorId: undefined,
    page: 1,
    limit: 20,
  });

  useEffect(() => {
    if (!BooksQueryFilterData?.data.books) return;

    const result = BooksQueryFilterData.data.books.filter((book) => {
      switch (bookFilter) {
        case 'Available':
          return book.availableCopies > 0;
        case 'Borrowed':
          return book.availableCopies < book.totalCopies;
        case 'Returned':
          return book.borrowCount > 1 && book.availableCopies > 0;
        case 'Damaged':
          return false;
        case 'All':
        default:
          return true;
      }
    });

    setFilteredBooks(result);
  }, [bookFilter, BooksQueryFilterData]);

  if (!BooksQueryFilterData) {
    return <Loading />;
  }

  return (
    <div className='flex flex-col gap-[15px] md:gap-6'>
      {/* Title */}
      <span className='text-display-xs md:text-display-sm font-bold'>
        BookList
      </span>

      {/* Button */}
      <Link to='/addbook'>
        <Button className='text-md md:max-w-[240px]'>Add Book</Button>
      </Link>

      {/* Search Bar */}
      <div className='relative'>
        <Input
          type='text'
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          placeholder='Search book'
          className='h-11 max-w-[600px] rounded-full pl-[42px] md:h-12'
        />
        <Search className='absolute top-1/2 left-4 size-5 -translate-y-1/2 cursor-pointer' />
      </div>

      {/* Book List */}
      <div className='flex flex-col gap-[15px] md:gap-6'>
        <div className='flex items-center gap-2 overflow-x-auto md:gap-3'>
          {BookFilter.map((value, index) => (
            <Button
              size='none'
              key={'Filter ' + index}
              value={value}
              onClick={() => setBookFilter(value)}
              className={cn(
                'hover:border-primary-100 h-10 border px-4 hover:bg-blue-100',
                value === bookFilter
                  ? 'border-primary-300 text-primary-300 bg-[#F6F9FE]'
                  : 'border-neutral-300 bg-white font-semibold text-neutral-950'
              )}
            >
              {value}
            </Button>
          ))}
        </div>

        <div className='flex flex-col gap-4'>
          {filteredBooks.map((book) => (
            <BookListCard key={book.id} id={book.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookList;

type BookListCardProps = {
  id: number;
};

const BookListCard: React.FC<BookListCardProps> = ({ id }) => {
  const { BooksQueryData } = useBooksQuery(id);

  const isMobile = useWindowWidth();
  const menuRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const { DeleteBooksMutation, success, loading, error } = useBooks();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [isMobile]);

  const handleDelete = () => {
    DeleteBooksMutation(id);
  };

  useEffect(() => {
    if (success) {
      setIsDeleteOpen(false);
      toast.success('Book deleted successfully');
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      setIsDeleteOpen(false);
      toast.error('Cannot delete book — copies still borrowed');
    }
  }, [error]);

  useEffect(() => {}, []);

  if (!BooksQueryData) {
    return <Loading />;
  }

  return (
    <div className='group flex items-center justify-between gap-4 p-4 md:p-5'>
      <div className='flex items-center gap-3 md:gap-4'>
        {/* Image */}
        <Link to={`/preview/${id}`}>
          <div className='h-[138px] w-[92px] overflow-hidden'>
            <img
              src={
                !BooksQueryData?.data.coverImage ||
                BooksQueryData?.data.coverImage.trim() === ''
                  ? '/images/book-no-cover.jpg'
                  : BooksQueryData?.data.coverImage.trim()
              }
              onError={(e) =>
                (e.currentTarget.src = '/images/book-no-cover.jpg')
              }
              alt={
                BooksQueryData?.data.coverImage
                  ? BooksQueryData?.data.title
                  : 'Book cover image'
              }
              loading='lazy'
              className='h-full w-full transition-all duration-300 ease-in-out group-hover:scale-105'
            />
          </div>
        </Link>

        {/* Detail */}
        <div className='flex flex-col items-start gap-[2px] md:gap-1'>
          <span className='rounded-[6px] border border-neutral-300 px-2 font-bold md:text-sm'>
            {BooksQueryData?.data.category.name}
          </span>
          <Link to={`/preview/${id}`}>
            <span className='hover:text-primary-300 font-bold md:text-lg'>
              {BooksQueryData?.data.title}
            </span>
          </Link>
          <Link to={`/author/${BooksQueryData.data.authorId}`}>
            <span className='text-neutral-700'>
              {BooksQueryData?.data.author.name}
            </span>
          </Link>
          <div className='flex items-center gap-[2px]'>
            <Star fill='#FFAB0D' stroke='none' className='size-6' />
            <span className='font-bold text-neutral-900 md:text-sm'>
              {BooksQueryData?.data.rating.toFixed(1)}
            </span>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      <div className='relative md:hidden'>
        <Ellipsis
          onClick={() => setIsOpen((prev) => !prev)}
          className='size-6 cursor-pointer'
        />

        {isOpen && (
          <div
            ref={menuRef}
            className='absolute right-0 flex w-[154px] flex-col gap-4 rounded-[16px] bg-white p-4 shadow-[0_0_20px_0_#CBCACA40]'
          >
            <Link to={`/preview/${id}`}>
              <Button className='hover:text-primary-300 h-[30px] justify-start rounded-none border-none bg-white font-semibold text-neutral-950 hover:bg-white'>
                Preview
              </Button>
            </Link>
            <Link to={`/editbook/${id}`}>
              <Button className='hover:text-primary-300 h-[30px] justify-start rounded-none border-none bg-white font-semibold text-neutral-950 hover:bg-white'>
                Edit
              </Button>
            </Link>
            <Button
              onClick={() => setIsDeleteOpen(true)}
              className='h-[30px] justify-start rounded-none border-none bg-white font-semibold text-[#EE1D52] hover:bg-white hover:text-red-700'
            >
              Delete
            </Button>
          </div>
        )}
      </div>

      {/* Menu Desktop */}
      <div className='hidden h-12 items-center gap-3 md:flex'>
        <Link to={`/preview/${id}`}>
          <Button className='border border-neutral-300 bg-white px-[18px] font-bold text-neutral-950 hover:border-blue-100 hover:bg-blue-100'>
            Preview
          </Button>
        </Link>
        <Link to={`/editbook/${id}`}>
          <Button className='border border-neutral-300 bg-white px-[18px] font-bold text-neutral-950 hover:border-blue-100 hover:bg-blue-100'>
            Edit
          </Button>
        </Link>
        <Button
          onClick={() => setIsDeleteOpen(true)}
          className='border border-neutral-300 bg-white px-[18px] font-bold text-[#EE1D52] hover:border-red-100 hover:bg-red-100'
        >
          Delete
        </Button>
      </div>

      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Data</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Once deleted, you won’t be able to recover this data.
          </DialogDescription>
          <div className='flex items-center gap-4'>
            <Button
              disabled={loading}
              onClick={() => setIsDeleteOpen(false)}
              className='bg-white text-neutral-950 hover:bg-neutral-50'
            >
              Cancel
            </Button>
            <Button
              disabled={loading}
              onClick={handleDelete}
              variant='delete'
              className='h-10 md:h-11'
            >
              {loading ? (
                <div className='mx-auto h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent' />
              ) : (
                'Delete'
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
