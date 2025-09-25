import { Button } from '@/components/ui/button';
import profileMenu from '@/constant/profile';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ProfileMenu from './ProfileMenu';
import Reviews from './Reviews';
import BorrowedListProfile from './BorrowedListProfile';

type Options = 'profile' | 'borrowed_list' | 'reviews';

const Profile = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const tabParam = searchParams.get('tab') as Options | null;

  const [activeOption, setActiveOption] = useState<Options>('profile');

  useEffect(() => {
    if (
      tabParam &&
      ['profile', 'borrowed_list', 'reviews'].includes(tabParam)
    ) {
      setActiveOption(tabParam);
    }
  }, [tabParam]);

  const handleChangeTab = (option: Options) => {
    setActiveOption(option);
    navigate(`/profile?tab=${option}`);
  };

  return (
    <div className='bg-neutral-25 flex flex-col gap-[15px] md:gap-6'>
      {/* Menu Buttons */}
      <div className='flex max-w-[600px] items-center gap-2 rounded-[16px] bg-neutral-100 p-2'>
        {profileMenu.map((item) => {
          const isActive = item.value === activeOption;
          return (
            <Button
              key={item.value}
              type='button'
              onClick={() => handleChangeTab(item.value as Options)}
              className={cn(
                'h-10 rounded-[12px] hover:bg-neutral-50 md:h-10',
                isActive
                  ? 'bg-white text-neutral-950 shadow-[0_0_20px_0_#CBCACA40]'
                  : 'bg-transparent font-medium text-neutral-600 hover:text-neutral-950'
              )}
            >
              {item.display}
            </Button>
          );
        })}
      </div>

      {/* Content Switch */}
      {activeOption === 'profile' && <ProfileMenu />}
      {activeOption === 'borrowed_list' && <BorrowedListProfile />}
      {activeOption === 'reviews' && <Reviews />}
    </div>
  );
};

export default Profile;
