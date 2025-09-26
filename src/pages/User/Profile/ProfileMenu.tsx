import Loading from '@/components/Loading';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useMe } from '@/hooks/useMe';
import { useState } from 'react';

const ProfileMenu = () => {
  const { MeQuery, PatchMeMutation, loading } = useMe();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [updatedName, setUpdatedName] = useState<string>(
    () => MeQuery?.data.profile.name ?? ''
  );

  if (!MeQuery) {
    return <Loading />;
  }

  const handleSubmit = () => {
    const data = {
      name: updatedName,
    };
    PatchMeMutation(data);
    setIsOpen(false);
  };

  return (
    <div className='flex flex-col gap-[15px] md:gap-6'>
      <span className='text-display-xs md:text-display-md font-bold'>
        Profile
      </span>

      {/* Profile Card */}
      <div className='flex flex-col gap-4 rounded-[16px] bg-white p-4 shadow-[0_0_20px_0_#CBCACA40] md:max-w-[557px] md:gap-6 md:p-5'>
        <div className='flex flex-col gap-2 md:gap-3'>
          {/* Image */}
          <img
            src='/images/author-profile.png'
            alt='Profile Picture'
            className='size-[64px] rounded-full'
          />

          {/* Name */}
          <div className='flex items-center justify-between'>
            <span>Name</span>
            <span className='font-bold'>{MeQuery.data.profile.name}</span>
          </div>

          {/* Email */}
          <div className='flex items-center justify-between'>
            <span>Email</span>
            <span className='font-bold'>{MeQuery.data.profile.email}</span>
          </div>

          {/* Phone Number */}
          <div className='flex items-center justify-between'>
            <span>Nomor Handphone</span>
            <span className='font-bold'>081234567890</span>
          </div>
        </div>
        <Button
          onClick={() => setIsOpen((prev) => !prev)}
          className='h-11 md:h-11'
        >
          Update Profile
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogTitle>Update Profile</DialogTitle>
          <div className='flex flex-col gap-4 md:gap-5'>
            <div className='flex flex-col gap-1'>
              <span className='font-extrabold'>Name</span>
              <Input
                type='text'
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
              />
            </div>

            <Button
              disabled={
                updatedName === MeQuery.data.profile.name ||
                updatedName.length < 4
              }
              onClick={handleSubmit}
              className='h-10 md:h-11'
            >
              {loading ? (
                <div className='mx-auto h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent' />
              ) : (
                'Update'
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileMenu;
