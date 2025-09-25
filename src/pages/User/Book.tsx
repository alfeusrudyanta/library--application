import BookBriefCard from '@/components/BookBriefCard';
import BookCard from '@/components/BookCard';
import Loading from '@/components/Loading';
import { useBooksQuery, useBooksRecommendationQuery } from '@/hooks/useBooks';
import dayjs from 'dayjs';
import { Star } from 'lucide-react';
import { useParams } from 'react-router-dom';

const Book = () => {
  const { id } = useParams();
  const { BooksQueryData } = useBooksQuery(Number(id));

  const { BooksRecommendationData } = useBooksRecommendationQuery({
    categoryId: BooksQueryData?.data.categoryId,
    limit: 6,
    by: 'popular',
  });

  if (!BooksQueryData || !BooksRecommendationData) {
    return <Loading />;
  }

  return (
    <div className='flex flex-col gap-6 md:gap-16'>
      {/* Book Detail */}
      <BookCard
        key={BooksQueryData.data.id}
        id={BooksQueryData.data.id}
        coverImage={BooksQueryData.data.coverImage}
        title={BooksQueryData.data.title}
        categoryName={BooksQueryData.data.category.name}
        authorName={BooksQueryData.data.author.name}
        rating={BooksQueryData.data.rating}
        reviewCount={BooksQueryData.data.reviewCount}
        description={BooksQueryData.data.description}
        availableCopies={BooksQueryData.data.availableCopies}
      />

      {/* Line */}
      <div className='w-full border border-neutral-300' />

      {/* Review */}
      <div className='flex flex-col gap-[18px]'>
        {/* Title */}
        <div className='flex flex-col gap-1 md:gap-3'>
          <span className='text-display-xs md:text-display-lg font-bold'>
            Review
          </span>
          <div className='flex items-center gap-1'>
            <Star className='size-6 fill-[#FFAB0D] stroke-0' />
            <span className='text-md font-bold md:text-xl'>
              {BooksQueryData.data.rating.toFixed(1)} (
              {BooksQueryData.data.reviewCount} ulasan)
            </span>
          </div>
        </div>

        {/* Review Card */}
        <div className='grid grid-cols-1 gap-x-5 gap-y-[18px] md:grid-cols-2'>
          {BooksQueryData.data.reviews.map((review) => (
            <div
              key={'Review' + review.id}
              className='flex flex-col gap-4 rounded-[16px] bg-white p-4 shadow-[0_0_20px_0_#CBCACA40]'
            >
              {/* Profile */}
              <div className='flex items-center gap-3'>
                <img
                  src='/images/author-profile.png'
                  alt='Profile Picture'
                  className='size-[58px] rounded-full md:size-16'
                />
                <div className='flex flex-col'>
                  <span className='md:text-lg'>{review.user.name}</span>
                  <span>
                    {dayjs(review.createdAt).format('DD MMMM YYYY, HH:mm')}
                  </span>
                </div>
              </div>

              {/* Review Content */}
              <div className='flex flex-col gap-2'>
                {/* Star */}
                <div className='flex items-center gap-[2px]'>
                  {Array.from({ length: review.star }).map((_, index) => (
                    <Star
                      key={'star: ' + index}
                      className='size-6 fill-[#FFAB0D] stroke-0'
                    />
                  ))}
                </div>

                {/* Comment */}
                <span className=''>{review.comment}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Line */}
      <div className='w-full border border-neutral-300' />

      {/* Related Books */}
      <div className='flex flex-col gap-5 md:gap-10'>
        <span className='text-display-xs md:text-display-lg font-bold'>
          Related Books
        </span>

        <div className='grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-5'>
          {BooksRecommendationData.data.books
            .filter((book) => book.id !== BooksQueryData.data.id)
            .map((book) => (
              <BookBriefCard
                key={book.id}
                authorName={book.author.name}
                coverImage={book.coverImage}
                id={book.id}
                rating={book.rating}
                title={book.title}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Book;
