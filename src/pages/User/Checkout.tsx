import BookCartCard from '@/components/BookCartCard';
import Loading from '@/components/Loading';
import { Button } from '@/components/ui/button';
import useLoans from '@/hooks/useLoans';
import { useMe } from '@/hooks/useMe';
import dayjs from 'dayjs';
import { Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { MeQuery } = useMe();
  const { PostLoansMutation, loading } = useLoans();
  const navigate = useNavigate();

  const [selectedDay, setSelectedDay] = useState<number>(3);
  const [agreeReturnBook, setAgreeReturnBook] = useState<boolean>(false);
  const [agreePolicy, setAgreePolicy] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const checkoutString = localStorage.getItem('checkout');
  const checkoutList: number[] = checkoutString
    ? JSON.parse(checkoutString)
    : [];

  const handleSubmit = async () => {
    const remainingBooks: number[] = [];

    for (const bookId of checkoutList) {
      try {
        await PostLoansMutation({ bookId, days: selectedDay });
      } catch {
        remainingBooks.push(bookId);
      }
    }

    if (remainingBooks.length > 0) {
      localStorage.setItem('checkout', JSON.stringify(remainingBooks));
      setErrorMsg(
        'Some books could not be borrowed and have been removed from your checkout list.'
      );
    } else {
      localStorage.removeItem('checkout');
      navigate(`/success/${selectedDay}`);
    }
  };

  useEffect(() => {
    const currentPath = location.pathname;
    return () => {
      if (location.pathname !== currentPath) {
        localStorage.removeItem('checkout');
      }
    };
  }, []);

  useEffect(() => {
    setErrorMsg('');
  }, [selectedDay, agreeReturnBook, agreePolicy]);

  if (!MeQuery || loading) {
    return <Loading />;
  }

  return (
    <div className='flex flex-col gap-4 md:gap-8'>
      <span className='text-display-xs md:text-display-lg font-bold'>
        Checkout
      </span>
      <div className='flex flex-col gap-6 md:flex-row md:justify-between md:gap-15'>
        {/* Personal information */}
        <div className='flex w-full flex-col gap-2 md:gap-4'>
          <span className='md:text-display-xs text-lg font-bold'>
            User Information
          </span>

          <div className='flex flex-col gap-2 md:gap-4'>
            <div className='flex items-center justify-between'>
              <span>Name</span>
              <span className='font-bold'>{MeQuery.data.profile.name}</span>
            </div>
            <div className='flex items-center justify-between'>
              <span>Email</span>
              <span className='font-bold'>{MeQuery.data.profile.email}</span>
            </div>
            <div className='flex items-center justify-between'>
              <span>Nomor Handphone</span>
              <span className='font-bold'>081234567890</span>
            </div>
          </div>

          <div className='w-full border border-neutral-300' />

          <div className='flex flex-col gap-2 md:gap-4'>
            <span className='md:text-display-xs text-lg font-bold'>
              Book List
            </span>

            {checkoutList.length === 0 ? (
              <span>No books found in your checkout list</span>
            ) : (
              checkoutList.map((item) => <BookCartCard key={item} id={item} />)
            )}
          </div>
        </div>

        {/* Returned date */}
        <div className='flex w-full flex-col gap-4 rounded-[20px] bg-white p-4 shadow-[0_0_20px_0_#CBCACA40] md:gap-6 md:p-5'>
          <span className='md:text-display-sm text-xl font-bold'>
            Complete Your Borrow Request
          </span>

          {/* Borrow Date */}
          <div className='flex flex-col gap-[2px]'>
            <span className='font-bold md:text-sm'>Borrow Date</span>
            <div className='flex h-12 items-center justify-between gap-2 rounded-[12px] border border-neutral-300 bg-neutral-100 px-4'>
              <span className='text-md font-semibold'>
                {dayjs().format('D MMM YYYY')}
              </span>
              <Calendar className='size-5' />
            </div>
          </div>

          {/* Borrow Duration */}
          <div className='flex flex-col gap-[2px]'>
            <span className='font-bold md:text-sm'>Borrow Duration</span>

            <div className='flex flex-col gap-3'>
              {[3, 5, 10].map((value) => (
                <label
                  key={value}
                  className='flex cursor-pointer items-center gap-3'
                >
                  <input
                    type='radio'
                    checked={selectedDay === value}
                    onChange={() => setSelectedDay(value)}
                    className='accent-primary-300 h-4 w-4 cursor-pointer'
                  />
                  <div className='flex items-center gap-2'>
                    <span className='font-semibold'>{value} Days</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Warning */}
          <div className='flex flex-col rounded-[12px] bg-[#F6F9FE] p-3'>
            <span className='font-bold'>Return Date</span>
            <span>
              Please return the book no later than <br className='md:hidden' />
              <span className='font-semibold text-[#EE1D52]'>
                {dayjs().add(selectedDay, 'days').format('DD MMMM YYYY')}
              </span>
            </span>
          </div>

          {/* Checklist */}
          <div className='flex flex-col'>
            <label className='flex cursor-pointer items-center gap-2 md:gap-3'>
              <input
                type='checkbox'
                onChange={() => setAgreeReturnBook((prev) => !prev)}
                className='accent-primary-300 h-4 w-4 cursor-pointer'
              />
              <span className='font-semibold'>
                I agree to return the book(s) before the due date.
              </span>
            </label>

            <label className='flex cursor-pointer items-center gap-2 md:gap-3'>
              <input
                type='checkbox'
                onChange={() => setAgreePolicy((prev) => !prev)}
                className='accent-primary-300 h-4 w-4 cursor-pointer'
              />
              <span className='font-semibold'>
                I accept the library borrowing policy.
              </span>
            </label>
          </div>

          {errorMsg && <span className='text-red-700'>{errorMsg}</span>}

          <Button
            disabled={
              loading ||
              checkoutList.length === 0 ||
              !agreeReturnBook ||
              !agreePolicy
            }
            onClick={handleSubmit}
          >
            {loading ? 'Processing...' : 'Confirm & Borrow'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
