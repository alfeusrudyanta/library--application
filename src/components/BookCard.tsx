import { Star, Share2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

type CardComponentProps = {
  id: number;
  coverImage: string | null;
  title: string;
  categoryName: string;
  authorName: string;
  rating: number;
  reviewCount: number;
  description: string;
  availableCopies: number;
};

const CardComponent: React.FC<CardComponentProps> = ({
  id,
  coverImage,
  title,
  categoryName,
  authorName,
  rating,
  reviewCount,
  description,
  availableCopies,
}) => {
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
      <img
        src={coverImage ?? '/images/book-no-cover.jpg'}
        alt={title}
        loading='lazy'
        onError={(e) => (e.currentTarget.src = '/images/book-no-cover.jpg')}
        className='mx-auto h-[330px] md:mx-0 md:h-[500px]'
      />

      {/* Details */}
      <div className='flex flex-col gap-3 md:gap-5'>
        <div className='flex flex-col items-start gap-[2px] md:gap-1'>
          <span className='rounded-[6px] border border-neutral-300 px-2 font-bold md:text-sm'>
            {categoryName}
          </span>
          <Link to={`/preview/${id}`}>
            <span className='hover:text-primary-300 text-display-xs md:text-display-sm font-bold'>
              {title}
            </span>
          </Link>
          <span className='text-neutral-700'>{authorName}</span>
          <div className='flex items-center gap-[2px]'>
            <Star fill='#FFAB0D' stroke='none' className='size-6' />
            <span className='text-md font-bold text-neutral-900'>
              {rating.toFixed(1)}
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
              {rating.toFixed(1)}
            </span>
            <span>Rating</span>
          </div>

          <div className='mx-5 h-full border border-neutral-300' />

          <div className='flex flex-1 flex-col'>
            <span className='md:text-display-xs text-lg font-bold'>
              {reviewCount}
            </span>
            <span>Reviews</span>
          </div>
        </div>

        {/* Line */}
        <div className='w-full max-w-[560px] border border-neutral-300' />

        <div className='flex flex-col gap-3 md:gap-5'>
          <span className='text-xl font-bold md:text-xl'>Description</span>
          <span>{description}</span>
        </div>

        {/* Cart */}
        <div className='fixed bottom-0 left-0 flex w-full items-center justify-center gap-3 border-none bg-white p-4 shadow-[0_0_20px_0_#CBCACA40] md:static md:justify-start md:p-0 md:shadow-none'>
          <Button
            onClick={handleCart}
            disabled={!inCart && availableCopies <= 0} // disable only if trying to add and no copies
            className='h-10 max-w-[200px] border border-neutral-300 bg-white px-9 font-bold text-neutral-950 hover:bg-neutral-50 md:h-12'
          >
            {inCart ? 'Remove Book' : 'Add to Cart'}
          </Button>

          <Button
            onClick={handleBorrow}
            disabled={availableCopies <= 0}
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
