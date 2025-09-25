import { Button } from '@/components/ui/button';
import { adminHomeMenu } from '@/constant/admin-home';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import User from './User';
import BookList from './BookList';
import BorrowedList from './BorrowedList';

type Options = 'borrowed_list' | 'user' | 'book_list';

const AdminHome = () => {
  const [options, setOptions] = useState<Options>('borrowed_list');

  return (
    <div className='bg-neutral-25 flex flex-col gap-[15px] md:gap-6'>
      {/* Option */}
      <div className='flex max-w-[600px] items-center gap-2 rounded-[16px] bg-neutral-100 p-2'>
        {adminHomeMenu.map((item) => (
          <Button
            key={item.value}
            type='button'
            value={item.value}
            onClick={(e) => setOptions(e.currentTarget.value as Options)}
            className={cn(
              'h-10 rounded-[12px] hover:bg-neutral-50 md:h-10',
              item.value === options
                ? 'bg-white text-neutral-950 shadow-[0_0_20px_0_#CBCACA40]'
                : 'bg-transparent font-medium text-neutral-600 hover:text-neutral-950'
            )}
          >
            {item.display}
          </Button>
        ))}
      </div>

      {options === 'borrowed_list' && <BorrowedList />}
      {options === 'user' && <User />}
      {options === 'book_list' && <BookList />}
    </div>
  );
};

export default AdminHome;
