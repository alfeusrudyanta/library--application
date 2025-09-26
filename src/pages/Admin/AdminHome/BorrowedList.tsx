import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAdminLoansOverdue } from '@/hooks/useAdmin';
import { cn } from '@/lib/utils';
import { Dot, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { OverdueData } from '@/types/admin';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { useBooksQuery } from '@/hooks/useBooks';
import Loading from '@/components/Loading';

const BookFilter = ['All', 'Activate', 'Returned', 'Overdue'];

const BorrowedList = () => {
  const [search, setSearch] = useState<string>('');
  const [bookFilter, setBookFilter] = useState<string>('');
  const [filteredBooks, setFilteredBooks] = useState<OverdueData[]>([]);

  const { OverdueData } = useAdminLoansOverdue({ page: 1, limit: 20 });

  useEffect(() => {
    if (!OverdueData?.data.overdue) return;

    const result = OverdueData.data.overdue.filter((book) => {
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
  }, [bookFilter, OverdueData]);

  if (!OverdueData) {
    return <Loading />;
  }

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

export default BorrowedList;

type Status = 'BORROWED' | 'RETURNED' | 'LATE';

const FilteredBook: React.FC<OverdueData> = (OverdueData) => {
  const { BooksQueryData } = useBooksQuery(OverdueData.id);
  const coverImage =
    BooksQueryData?.data.coverImage?.trim() || '/images/book-no-cover.jpg';

  const borrowed = dayjs(OverdueData.borrowedAt);
  const due = dayjs(OverdueData.dueAt);

  const durationDays = due.diff(borrowed, 'day');

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

  return (
    <div className='group flex flex-col gap-4 rounded-[16px] bg-white p-4 shadow-[0_0_20px_0_#CBCACA40] md:gap-5 md:p-5'>
      {/* Status */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <span className='font-bold'>Status</span>
          <div className='rounded-[4px] bg-[#24A5000D] px-2'>
            <span className='font-bold text-[#24A500] md:text-sm'>
              {bookStatus(OverdueData.status)}
            </span>
          </div>
        </div>

        <div className='flex items-center gap-3'>
          <span className='font-bold'>Due Date</span>
          <div className='rounded-[4px] bg-[#EE1D521A] px-2'>
            <span className='font-bold text-[#EE1D52] md:text-sm'>
              {dayjs(OverdueData.dueAt).format('DD MMMM YYYY')}
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
          <Link to={`/book/${OverdueData.bookId}`}>
            <div className='h-[140px] w-[90px] overflow-hidden'>
              <img
                src={coverImage}
                alt={OverdueData.book.title}
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
              <Link to={`/book/${OverdueData.bookId}`}>
                <span className='group-hover:text-primary-300 text-md font-bold md:text-xl'>
                  {OverdueData.book.title}
                </span>
              </Link>
              <Link to={`/author/${OverdueData.book.author.id}`}>
                <span className='text-neutral-700'>
                  {OverdueData.book.author.name}
                </span>
              </Link>
              <div className='flex items-center gap-2'>
                <span className='font-bold'>
                  {dayjs(OverdueData.dueAt).format('DD MMM YYYY')}
                </span>
                <Dot className='size-3' />
                <span className='font-bold'>
                  {OverdueData.status !== 'RETURNED' &&
                    `Duration ${Math.max(durationDays, 0)} day${durationDays > 1 ? 's' : ''}`}
                </span>
              </div>
            </div>

            {/* Line */}
            <div className='w-full border border-neutral-300 md:hidden' />
          </div>
        </div>

        {/* Second Column */}
        <div className='flex flex-col justify-start'>
          <span className='font-semibold'>Borrower's name</span>
          <span className='text-md font-bold md:text-xl'>
            {OverdueData.user.name}
          </span>
        </div>
      </div>
    </div>
  );
};
