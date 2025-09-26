import BookCartCard from '@/components/BookCartCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const [tempCheckout, setTempCheckout] = useState<number[]>([]);

  const cartListString = localStorage.getItem('cart');
  const cartList: number[] = cartListString ? JSON.parse(cartListString) : [];

  const isAllSelected =
    cartList.length > 0 && tempCheckout.length === cartList.length;

  const handleSelectAll = () => {
    if (isAllSelected) {
      setTempCheckout([]);
    } else {
      setTempCheckout([...cartList]);
    }
  };

  const handleSelectItem = (id: number) => {
    if (tempCheckout.includes(id)) {
      setTempCheckout(tempCheckout.filter((i) => i !== id));
    } else {
      setTempCheckout([...tempCheckout, id]);
    }
  };

  const handleSubmit = () => {
    const updatedCart = cartList.filter((id) => !tempCheckout.includes(id));
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    localStorage.setItem('checkout', JSON.stringify(tempCheckout));

    setTempCheckout([]);
    window.dispatchEvent(new Event('cartUpdated'));
    navigate('/checkout');
  };

  return (
    <div className='flex flex-col gap-4 md:gap-8'>
      <span className='text-display-xs md:text-display-lg font-bold'>
        My Cart
      </span>

      <div className='flex gap-10'>
        {/* Cart List */}
        <div className='flex w-full flex-col gap-4 md:gap-6'>
          {/* Select All */}
          <div className='flex items-center gap-4'>
            <Input
              checked={isAllSelected}
              onChange={handleSelectAll}
              type='checkbox'
              className='size-5'
            />
            <span className='text-md font-semibold'>Select All</span>
          </div>

          {/* Cart Items */}
          <div className='flex flex-col gap-4 md:gap-6'>
            {cartList.length === 0 ? (
              <span className='text-neutral-500'>Your cart is empty</span>
            ) : (
              cartList.map((item, index) => (
                <div key={index} className='flex flex-col gap-4 md:gap-6'>
                  <div className='flex items-start gap-4'>
                    <Input
                      type='checkbox'
                      checked={tempCheckout.includes(item)}
                      onChange={() => handleSelectItem(item)}
                      className='size-5'
                    />
                    <BookCartCard id={item} />
                  </div>
                  {index < cartList.length - 1 && (
                    <div className='w-full border border-neutral-300' />
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Desktop Summary */}
        <div className='bg-neutral-25 fixed bottom-0 flex w-full flex-row items-center gap-6 p-5 md:static md:max-w-[318px] md:flex-col md:items-stretch'>
          <span className='hidden text-xl font-bold md:block'>
            Loan Summary
          </span>
          <div className='flex flex-1 flex-col md:flex-none md:flex-row md:items-center md:justify-between'>
            <span>Total Book</span>
            <span className='font-bold'>{tempCheckout.length} items</span>
          </div>
          <Button
            disabled={tempCheckout.length <= 0}
            onClick={handleSubmit}
            className='flex-1 md:flex-none'
          >
            Borrow Book
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
