import { useAuthorBooksQuery } from '@/hooks/useAuthors';
import React from 'react';
import { Link } from 'react-router-dom';

type AuthorCardProps = {
  id: number;
};

const AuthorCard: React.FC<AuthorCardProps> = ({ id }) => {
  const { AuthorBooksQueryData } = useAuthorBooksQuery(id);

  return (
    <Link to={`/author/${id}`} className='group w-full md:flex-1'>
      <div className='flex w-full items-center gap-3 rounded-[12px] bg-white p-3 shadow-[0_0_20px_0_#CBCACA40] md:gap-4 md:p-4'>
        {/* Image */}
        <img
          src='/images/author-profile.png'
          alt='Author profile picture'
          className='size-[60px] rounded-full md:size-20'
        />

        {/* Details */}
        <div className='flex flex-col gap-[2px]'>
          <span className='text-md group-hover:text-primary-300 font-bold text-neutral-900 md:text-lg'>
            {AuthorBooksQueryData?.data?.author?.name}
          </span>
          <div className='flex items-center gap-[6px]'>
            <img src='/icons/home-book.svg' alt='Book icons' />
            <span>
              {AuthorBooksQueryData?.data?.books?.length} book
              {AuthorBooksQueryData &&
                AuthorBooksQueryData?.data?.books?.length > 1 &&
                's'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AuthorCard;
