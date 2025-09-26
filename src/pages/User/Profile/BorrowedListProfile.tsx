import Loading from '@/components/Loading';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useBooksQuery } from '@/hooks/useBooks';
import { useMeLoansQuery } from '@/hooks/useMe';
import { useReview } from '@/hooks/useReviews';
import { cn } from '@/lib/utils';
import type { Loans } from '@/types/me';
import dayjs from 'dayjs';
import { Dot, Search, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BookFilter = ['All', 'Activate', 'Returned', 'Overdue'];

const BorrowedListProfile = () => {
  const [search, setSearch] = useState<string>('');
  const [bookFilter, setBookFilter] = useState<string>('');
  const [filteredBooks, setFilteredBooks] = useState<Loans[]>([]);

  const { MeLoansQueryData } = useMeLoansQuery({ page: 1, limit: 50 });

  if (!MeLoansQueryData) {
    <Loading />;
  }

  useEffect(() => {
    if (!MeLoansQueryData?.data.loans) return;

    const result = MeLoansQueryData.data.loans.filter((book) => {
      switch (bookFilter) {
        case 'Activate':
          return book.status === 'BORROWED';
        case 'Returned':
          return book.status === 'RETURNED';
        case 'Overdue':
          return book.status === 'LATE';
        case 'All':
        default:
          return true;
      }
    });

    setFilteredBooks(result);
  }, [bookFilter, MeLoansQueryData]);

  return (
    <div className='flex flex-col gap-[15px] md:gap-6'>
      {/* Title */}
      <span className='text-display-xs md:text-display-sm font-bold'>
        Borrowed List
      </span>

      {/* Search Bar */}
      <div className='relative'>
        <Input
          type='text'
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          placeholder='Search user'
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

        {/* Books */}
        {filteredBooks.map((book) => (
          <FilteredBook key={book.id} {...book} />
        ))}
      </div>
    </div>
  );
};

export default BorrowedListProfile;

type Status = 'BORROWED' | 'RETURNED' | 'LATE';

const FilteredBook: React.FC<Loans> = (Loans) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedStar, setSelectedStar] = useState<number>(5);
  const [comment, setComment] = useState<string>('');

  const { PostReviewsMutation, success, loading } = useReview();
  const { BooksQueryData } = useBooksQuery(Loans.bookId);
  const coverImage =
    BooksQueryData?.data.coverImage?.trim() || '/images/book-no-cover.jpg';

  const borrowed = dayjs(Loans.borrowedAt);
  const due = dayjs(Loans.dueAt);

  const durationDays = due.diff(borrowed, 'day');

  useEffect(() => {
    if (success) {
      setIsOpen(false);
    }
  }, [success]);

  if (!BooksQueryData) {
    return <Loading />;
  }

  const bookStatus = (status: Status) => {
    switch (status) {
      case 'BORROWED':
        return 'Borrowed';
      case 'RETURNED':
        return 'Returned';
      case 'LATE':
        return 'Overdue';
      case undefined:
      default:
        return 'All';
    }
  };

  const handleSubmit = () => {
    PostReviewsMutation({
      bookId: Loans.bookId,
      comment: comment,
      star: selectedStar,
    });
    setComment('');
    setSelectedStar(5);
  };

  return (
    <div className='group flex flex-col gap-4 rounded-[16px] bg-white p-4 shadow-[0_0_20px_0_#CBCACA40] md:gap-5 md:p-5'>
      {/* Status */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <span className='font-bold'>Status</span>
          <div className='rounded-[4px] bg-[#24A5000D] px-2'>
            <span className='font-bold text-[#24A500] md:text-sm'>
              {bookStatus(Loans.status)}
            </span>
          </div>
        </div>

        <div className='flex items-center gap-3'>
          <span className='font-bold'>Due Date</span>
          <div className='rounded-[4px] bg-[#EE1D521A] px-2'>
            <span className='font-bold text-[#EE1D52] md:text-sm'>
              {dayjs(Loans.dueAt).format('DD MMMM YYYY')}
            </span>
          </div>
        </div>
      </div>

      {/* Line */}
      <div className='w-full border border-neutral-300' />

      <div className='flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-4'>
        {/* First Column */}
        <div className='flex flex-col gap-3 md:flex-row md:gap-4'>
          {/* Image */}
          <Link to={`/book/${BooksQueryData.data.id}`}>
            <div className='h-[140px] w-[90px] overflow-hidden'>
              <img
                src={coverImage}
                alt={Loans.book.title}
                onError={(e) =>
                  (e.currentTarget.src = '/images/book-no-cover.jpg')
                }
                className='h-full w-full transition-all duration-300 ease-in-out group-hover:scale-105'
              />
            </div>
          </Link>

          <div className='flex flex-col gap-3 md:gap-4'>
            {/* Details */}
            <div className='flex flex-col items-start gap-[2px] md:gap-1'>
              <span className='rounded-[6px] border border-neutral-300 px-2 font-bold md:text-sm'>
                {BooksQueryData?.data.category.name}
              </span>
              <Link to={`/book/${Loans.book.id}`}>
                <span className='group-hover:text-primary-300 text-md font-bold md:text-xl'>
                  {Loans.book.title}
                </span>
              </Link>
              <Link to={`/author/${BooksQueryData.data.authorId}`}>
                <span className='text-neutral-700'>
                  {BooksQueryData.data.author.name}
                </span>
              </Link>
              <div className='flex items-center gap-2'>
                <span className='font-bold'>
                  {dayjs(Loans.dueAt).format('DD MMM YYYY')}
                </span>
                <Dot className='size-3' />
                <span className='font-bold'>
                  <span>
                    Duration {Math.max(durationDays, 0)} day
                    {durationDays > 1 ? 's' : ''}
                  </span>
                </span>
              </div>
            </div>

            {/* Line */}
            <div className='w-full border border-neutral-300 md:hidden' />
          </div>
        </div>

        {/* Second Column */}
        <Button
          onClick={() => setIsOpen((prev) => !prev)}
          className='h-10 w-full md:h-10 md:max-w-[182px]'
        >
          Give Review
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className='max-w-[440px]'>
          <DialogHeader>
            <DialogTitle>Give Review</DialogTitle>
          </DialogHeader>

          {/* Rating */}
          <div className='flex flex-col'>
            <span className='font-bold md:font-extrabold'>Give Rating</span>
            <div className='flex items-center gap-1'>
              {[1, 2, 3, 4, 5].map((value) => (
                <Star
                  key={value}
                  onClick={() => setSelectedStar(value)}
                  className={cn(
                    'cursor-pointer stroke-0',
                    value <= selectedStar
                      ? 'fill-accent-yellow'
                      : 'fill-neutral-400'
                  )}
                />
              ))}
            </div>
          </div>

          {/* Comment */}
          <textarea
            required
            disabled={loading}
            value={comment}
            onChange={(e) => setComment(e.currentTarget.value)}
            placeholder='Please share your thoughts about this book'
            className='h-[235px] w-full gap-2 rounded-[12px] border border-neutral-300 px-3 py-2'
          />

          <div className='flex items-center gap-4'>
            <Button
              disabled={loading}
              onClick={handleSubmit}
              className='h-10 md:h-12'
            >
              Send
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
