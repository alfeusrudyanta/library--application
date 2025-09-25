import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';

type BookBriefCardProps = {
  id: number;
  coverImage: string | null;
  title: string;
  authorName: string;
  rating: number;
};

const BookBriefCard: React.FC<BookBriefCardProps> = ({
  id,
  coverImage,
  title,
  authorName,
  rating,
}) => {
  return (
    <div className='group flex h-full flex-col overflow-hidden rounded-[12px] bg-white shadow-[0_0_20px_0_#CBCACA40] group-hover:bg-neutral-100'>
      {/* Images */}
      <Link to={`/book/${id}`}>
        <div className='flex aspect-[2/3] items-center justify-between overflow-hidden'>
          <img
            src={
              !coverImage || coverImage.trim() === ''
                ? '/images/book-no-cover.jpg'
                : coverImage.trim()
            }
            onError={(e) => (e.currentTarget.src = '/images/book-no-cover.jpg')}
            alt={coverImage ? title : 'Book cover image'}
            className='w-full object-cover object-center transition-all duration-300 group-hover:scale-105'
          />
        </div>
      </Link>

      {/* Details */}
      <div className='flex flex-col gap-[2px] p-3 md:gap-1 md:p-4'>
        <Link to={`/book/${id}`}>
          <span className='group-hover:text-primary-300 font-bold text-neutral-900 md:text-lg'>
            {title}
          </span>
        </Link>

        <Link to={`/author/i${id}`}>
          <span className='text-neutral-700'>{authorName}</span>
        </Link>
        <div className='flex items-center gap-1'>
          <Star className='size-6 fill-[#FFAB0D] stroke-0' />
          <span className='font-semibold text-neutral-900'>
            {rating.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookBriefCard;
