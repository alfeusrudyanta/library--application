import { useBooksQuery } from '@/hooks/useBooks';
import { Link } from 'react-router-dom';

type BookCartCardProps = {
  id: number;
};

const BookCartCard: React.FC<BookCartCardProps> = ({ id }) => {
  const { BooksQueryData } = useBooksQuery(id);

  return (
    <div className='flex items-center gap-3 md:gap-4'>
      <Link to={`/preview/${BooksQueryData?.data.id}`}>
        <div className='flex aspect-[2/3] max-w-[70px] items-center justify-between overflow-hidden md:max-w-[90px]'>
          <img
            src={BooksQueryData?.data.coverImage ?? '/images/book-no-cover.jpg'}
            alt='Book cover'
            onError={(e) => (e.currentTarget.src = '/images/book-no-cover.jpg')}
            className='w-full object-cover object-center transition-all duration-300 group-hover:scale-105'
          />
        </div>
      </Link>

      {/* Details */}
      <div className='flex flex-col items-start gap-[2px] md:gap-1'>
        <span className='rounded-[6px] border border-neutral-300 px-2 font-bold md:text-sm'>
          {BooksQueryData?.data.category.name}
        </span>
        <Link to={`/preview/${BooksQueryData?.data.id}`}>
          <span className='hover:text-primary-300 text-md font-bold md:text-xl'>
            {BooksQueryData?.data.title}
          </span>
        </Link>
        <span className='text-neutral-700'>
          {BooksQueryData?.data.author.name}
        </span>
      </div>
    </div>
  );
};

export default BookCartCard;
