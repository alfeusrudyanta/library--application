import BookCartCard from '@/components/BookCartCard';
import Loading from '@/components/Loading';
import { Input } from '@/components/ui/input';
import { useMeReviewsQuery } from '@/hooks/useMe';
import dayjs from 'dayjs';
import { Search, Star } from 'lucide-react';
import { useState } from 'react';

const Reviews = () => {
  const { MeReviewsQueryData } = useMeReviewsQuery({ page: 1, limit: 20 });
  const [search, setSearch] = useState<string>('');

  if (!MeReviewsQueryData) {
    <Loading />;
  }

  return (
    <div className='flex flex-col gap-[15px] md:gap-6'>
      {/* Title */}
      <span className='text-display-xs md:text-display-sm font-bold'>
        BookList
      </span>

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

      <div className='flex flex-col gap-4 md:gap-6'>
        {MeReviewsQueryData?.data.reviews
          .filter((review) =>
            review.book.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((review) => {
            return (
              <div
                key={review.id}
                className='flex flex-col gap-4 rounded-[16px] bg-white p-4 shadow-[0_0_20px_0_#CBCACA40] md:gap-5 md:p-5'
              >
                {/* Date */}
                <span className='font-semibold'>
                  {dayjs(review.createdAt).format('DD MMMM YYYY, HH:MM')}
                </span>

                {/* Line */}
                <div className='w-full border border-neutral-300' />

                {/* Book */}
                <BookCartCard id={review.bookId} key={review.id} />

                {/* Line */}
                <div className='w-full border border-neutral-300' />

                <div className='flex flex-col gap-2'>
                  {/* Star */}
                  <div className='flex items-center gap-[2px]'>
                    {Array.from({ length: review.star }).map((_, index) => (
                      <Star
                        key={index}
                        className='size-6 fill-[#FFAB0D] stroke-0'
                      />
                    ))}
                  </div>

                  {/* Comment */}
                  <span className='font-semibold'>{review.comment}</span>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Reviews;
