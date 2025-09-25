import AuthorCard from '@/components/AuthorCard';
import BookBriefCard from '@/components/BookBriefCard';
import Loading from '@/components/Loading';
import { useAuthorBooksQuery } from '@/hooks/useAuthors';
import { useParams } from 'react-router-dom';

const Author = () => {
  const { id } = useParams();
  const { AuthorBooksQueryData } = useAuthorBooksQuery(Number(id));

  if (!AuthorBooksQueryData) {
    return <Loading />;
  }

  return (
    <div className='flex flex-col gap-4 md:gap-10'>
      <AuthorCard id={Number(id)} />

      <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 md:gap-5'>
        {AuthorBooksQueryData?.data.books.map((book) => (
          <BookBriefCard
            key={book.id}
            id={book.id}
            authorName={AuthorBooksQueryData.data.author.name}
            coverImage={book.coverImage}
            rating={book.rating}
            title={book.title}
          />
        ))}
      </div>
    </div>
  );
};

export default Author;
