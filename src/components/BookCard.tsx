import { Star, Share2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useBooksQuery } from '@/hooks/useBooks';

type CardComponentProps = {
  id: number;
};

const CardComponent: React.FC<CardComponentProps> = ({ id }) => {
  const { BooksQueryData } = useBooksQuery(id);

  const navigate = useNavigate();
  const [inCart, setInCart] = useState(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    return cart.includes(id);
  });

  const handleCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (!cart.includes(id)) {
      const updated = [...cart, id];
      localStorage.setItem('cart', JSON.stringify(updated));
      setInCart(true);
    } else {
      const updated = cart.filter((bookId: number) => bookId !== id);
      localStorage.setItem('cart', JSON.stringify(updated));
      setInCart(false);
    }
  };

  const handleBorrow = () => {
    localStorage.setItem('checkout', JSON.stringify([id]));
    navigate('/checkout');
  };

  return (
    <div className='flex flex-col justify-center gap-9 md:flex-row md:justify-start'>
      {/* Image */}
      <Link
        to={`/book/${id}`}
        className='mx-auto w-full max-w-[250px] md:max-w-[330px]'
      >
        <img
          src={
            !BooksQueryData?.data.coverImage ||
            BooksQueryData?.data.coverImage.trim() === ''
              ? '/images/book-no-cover.jpg'
              : BooksQueryData?.data.coverImage.trim()
          }
          onError={(e) => (e.currentTarget.src = '/images/book-no-cover.jpg')}
          alt={
            BooksQueryData?.data.coverImage
              ? BooksQueryData?.data.title
              : 'Book cover image'
          }
          loading='lazy'
          className='mx-auto w-full md:mx-0'
        />
      </Link>

      {/* Details */}
      <div className='flex flex-col gap-3 md:flex-1 md:gap-5'>
        <div className='flex flex-col items-start gap-[2px] md:gap-1'>
          <span className='rounded-[6px] border border-neutral-300 px-2 font-bold md:text-sm'>
            {BooksQueryData?.data.category.name}
          </span>
          <Link to={`/book/${id}`}>
            <span className='group-hover:text-primary-300 text-display-xs md:text-display-sm font-bold'>
              {BooksQueryData?.data.title}
            </span>
          </Link>
          <Link to={`/author/${BooksQueryData?.data.authorId}`}>
            <span className='text-neutral-700'>
              {BooksQueryData?.data.author.name}
            </span>
          </Link>
          <div className='flex items-center gap-[2px]'>
            <Star fill='#FFAB0D' stroke='none' className='size-6' />
            <span className='text-md font-bold text-neutral-900'>
              {BooksQueryData?.data.rating.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Rating Details */}
        <div className='flex h-[60px] max-w-[286px] items-center justify-between md:h-[66px]'>
          <div className='flex flex-1 flex-col'>
            <span className='md:text-display-xs text-lg font-bold'>320</span>
            <span>Page</span>
          </div>

          <div className='mx-5 h-full border border-neutral-300' />

          <div className='flex flex-1 flex-col'>
            <span className='md:text-display-xs text-lg font-bold'>
              {BooksQueryData?.data.rating.toFixed(1)}
            </span>
            <span>Rating</span>
          </div>

          <div className='mx-5 h-full border border-neutral-300' />

          <div className='flex flex-1 flex-col'>
            <span className='md:text-display-xs text-lg font-bold'>
              {BooksQueryData?.data.reviewCount}
            </span>
            <span>Reviews</span>
          </div>
        </div>

        {/* Line */}
        <div className='w-full max-w-[560px] border border-neutral-300' />

        <div className='flex flex-col gap-3 md:gap-5'>
          <span className='text-xl font-bold md:text-xl'>Description</span>
          <span>{BooksQueryData?.data.description}</span>
        </div>

        {/* Cart */}
        <div className='fixed bottom-0 left-0 flex w-full items-center justify-center gap-3 border-none bg-white p-4 shadow-[0_0_20px_0_#CBCACA40] md:static md:justify-start md:p-0 md:shadow-none'>
          <Button
            onClick={handleCart}
            disabled={
              !inCart && (BooksQueryData?.data?.availableCopies ?? 0) <= 0
            } // disable only if trying to add and no copies
            className='h-10 max-w-[200px] border border-neutral-300 bg-white px-9 font-bold text-neutral-950 hover:bg-neutral-50 md:h-12'
          >
            {inCart ? 'Remove Book' : 'Add to Cart'}
          </Button>

          <Button
            onClick={handleBorrow}
            disabled={(BooksQueryData?.data?.availableCopies ?? 0) <= 0}
            className='h-10 max-w-[200px] px-9 md:h-12'
          >
            Borrow&nbsp;Book
          </Button>

          <Button
            size='none'
            className='flex size-10 items-center justify-center border border-neutral-300 bg-white p-[10px] hover:bg-neutral-50 md:size-11'
          >
            <Share2 color='#0A0D12' />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
