import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useBooksQuery } from '@/hooks/useBooks';
import BookCard from '@/components/BookCard';

const Preview = () => {
  const { id } = useParams();
  const { BooksQueryData } = useBooksQuery(Number(id));

  return (
    <div className='flex flex-col gap-9 md:gap-[32px]'>
      {/* Link to admin */}
      <Link to='/admin'>
        <div className='flex items-center gap-[6px] md:gap-3'>
          <ArrowLeft className='size-6 cursor-pointer md:size-[32px]' />
          <span className='md:text-display-sm text-xl font-bold'>
            Preview Book
          </span>
        </div>
      </Link>

      {/* Book Detail */}
      {BooksQueryData && <BookCard key={id} id={BooksQueryData.data.id} />}
    </div>
  );
};

export default Preview;
