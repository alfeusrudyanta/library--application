import { Link, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { Button } from '@/components/ui/button';

const Success = () => {
  const { days } = useParams();

  return (
    <div className='mt-[100px] flex flex-col items-center justify-center gap-6 md:gap-8'>
      {/* Image */}
      <img
        src='/icons/success-logo.svg'
        alt='Success Icon'
        className='size-[140px]'
      />

      {/* Test */}
      <div className='flex flex-col gap-2 text-center'>
        <span className='md:text-display-sm text-xl font-bold'>
          Borrowing Successful!
        </span>
        <span className='text-md font-semibold md:text-lg'>
          Your book has been successfully borrowed. Please return it by{' '}
          <span className='text-[#EE1D52]'>
            {dayjs().add(Number(days), 'days').format('DD MMMM YYYY')}
          </span>
        </span>
      </div>

      {/* Button */}
      <Link to='/profile' className='w-full max-w-[286px]'>
        <Button>See Borrowed List</Button>
      </Link>
    </div>
  );
};

export default Success;
