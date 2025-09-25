import { Input } from '@/components/ui/input';
import { dummyUser } from '@/constant/admin-home';
import { Search } from 'lucide-react';
import { useState } from 'react';

const User = () => {
  const [search, setSearch] = useState<string>('');

  return (
    <div className='flex flex-col gap-[15px] md:gap-6'>
      {/* Title */}
      <span className='text-display-xs md:text-display-sm font-bold'>User</span>

      {/* Search Bar */}
      <div className='relative'>
        <Input
          type='text'
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          placeholder='Search user'
          className='h-11 max-w-[600px] rounded-full pl-[42px] md:h-12'
        />
        <Search className='absolute top-1/2 left-4 size-5 -translate-y-1/2 cursor-pointer' />
      </div>

      {/* Mobile Viwe */}
      <div className='flex flex-col gap-[15px] md:hidden'>
        {dummyUser
          .filter((user) =>
            user.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
          )
          .map((user) => (
            <div
              key={user.id}
              className='flex flex-col gap-1 rounded-[12px] bg-white p-3 shadow-[0_0_20px_0_#CBCACA40]'
            >
              <div className='flex items-center justify-between'>
                <span className='font-semibold'>No</span>
                <span className='font-semibold'>{user.id}</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='font-semibold'>Name</span>
                <span className='font-semibold'>{user.name}</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='font-semibold'>Email</span>
                <span className='font-semibold'>{user.email}</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='font-semibold'>Phone Number</span>
                <span className='font-semibold'>{user.phoneNumber}</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='font-semibold'>Created at</span>
                <span className='font-semibold'>{user.createdAt}</span>
              </div>
            </div>
          ))}
      </div>

      {/* Desktop View */}
      <div className='hidden w-full flex-col rounded-[12px] border border-neutral-300 bg-white p-4 shadow-[0_0_24px_0_#CBCACA33] md:flex'>
        <div className='flex h-16 items-center bg-neutral-50'>
          <span className='w-11 text-center text-sm font-bold'>No</span>
          <span className='flex-1 pl-4 text-sm font-bold'>Name</span>
          <span className='flex-1 pl-4 text-sm font-bold'>Phone Number</span>
          <span className='flex-1 pl-4 text-sm font-bold'>Email</span>
          <span className='flex-1 pl-4 text-sm font-bold'>Created at</span>
        </div>

        {dummyUser
          .filter((user) =>
            user.name.toLowerCase().includes(search.toLocaleLowerCase())
          )
          .map((user) => (
            <div
              className='flex h-16 items-center border-b border-neutral-300'
              key={user.id}
            >
              <span className='w-11 text-center font-semibold'>{user.id}</span>
              <span className='flex-1 pl-4 font-semibold'>{user.name}</span>
              <span className='flex-1 pl-4 font-semibold'>
                {user.phoneNumber}
              </span>
              <span className='flex-1 pl-4 font-semibold'>{user.email}</span>
              <span className='flex-1 pl-4 font-semibold'>
                {user.createdAt}
              </span>
            </div>
          ))}

        <div className='flex h-16 items-center px-6'>
          <span>
            Showing {Math.ceil(dummyUser.length / 10)} to 10 of{' '}
            {dummyUser.length} entrie
            {dummyUser.length > 1 && 's'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default User;
