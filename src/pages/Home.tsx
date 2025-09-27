import AuthorCard from '@/components/AuthorCard';
import BookBriefCard from '@/components/BookBriefCard';
import Loading from '@/components/Loading';
import { Button } from '@/components/ui/button';
import { genreMenu, imageLink } from '@/constant/home';
import { useBooksRecommendationQuery } from '@/hooks/useBooks';
import { cn } from '@/lib/utils';
import { CircleDot } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [imageIndex, setImageIndex] = useState<number>(0);
  const [showAllReviews, setShowAllReviews] = useState<boolean>(false);
  const { BooksRecommendationData } = useBooksRecommendationQuery({
    by: 'rating',
    categoryId: undefined,
    limit: 10,
  });

  if (!BooksRecommendationData) {
    return <Loading />;
  }

  const displayedFilter = showAllReviews
    ? BooksRecommendationData.data.books
    : BooksRecommendationData.data.books.slice(0, 10);

  return (
    <div className='flex flex-col gap-6 md:gap-12'>
      {/* Image */}
      <div className='flex flex-col items-center gap-[10px] md:gap-4'>
        <img
          src={imageLink[imageIndex]}
          alt='Welcome to Booky'
          className='w-full'
        />
        <div className='flex gap-1 md:gap-[10px]'>
          {[0, 1, 2].map((index) => (
            <CircleDot
              key={'image ' + index}
              onClick={() => setImageIndex(index)}
              className={cn(
                'size-[6px] cursor-pointer transition-all duration-300 md:size-[10px]',
                index === imageIndex
                  ? 'text-primary-300 fill-primary-300'
                  : 'fill-neutral-300 text-neutral-300'
              )}
            />
          ))}
        </div>
      </div>

      {/* Genre List */}
      <div className='grid grid-cols-3 items-center gap-3 md:grid-cols-6 md:gap-4'>
        {genreMenu.map((genre) => (
          <Link to='/category' className='group' key={'Genre:' + genre.name}>
            <div className='h-full gap-3 rounded-[16px] bg-white p-2 shadow-[0_0_20px_0_#CBCACA40] transition-all duration-300 group-hover:bg-neutral-100 md:p-3'>
              <div className='flex w-full items-center justify-center gap-2 rounded-[12px] bg-[#E0ECFF] p-2'>
                <img src={genre.link} alt={genre.name} />
              </div>
              <span className='group-hover:text-primary-300 text-xs font-bold'>
                {genre.name}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Recommendation */}
      <div className='flex flex-col gap-5 md:gap-10'>
        <span className='text-display-xs md:text-display-lg font-bold'>
          Recommendation
        </span>

        <div className='grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 md:gap-5'>
          {displayedFilter.map((book) => (
            <BookBriefCard key={'Book Id:' + book.id} id={book.id} />
          ))}
        </div>

        {/* Load More Button */}
        {BooksRecommendationData.data.books.length > 10 &&
          showAllReviews === false && (
            <Button
              onClick={() => setShowAllReviews(true)}
              className='mx-auto h-10 max-w-[200px] border border-neutral-300 bg-white px-9 font-bold text-neutral-950 hover:bg-neutral-50 md:h-12'
            >
              Load More
            </Button>
          )}
      </div>

      {/* Authors */}
      <div className='flex flex-col gap-6 md:gap-10'>
        <span className='text-display-xs md:text-display-lg font-bold'>
          Authors
        </span>

        <div className='flex flex-col items-center gap-4 md:w-full md:flex-row md:gap-5'>
          {BooksRecommendationData?.data.books.slice(0, 4).map((author) => (
            <AuthorCard
              key={'Author Id:' + author.author.id}
              id={author.author.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
