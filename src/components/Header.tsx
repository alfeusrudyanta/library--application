import useAuth from '@/hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from './ui/input';
import { ChevronDown, Menu, Search, XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import useWindowWidth from '@/hooks/useWindowWidth';
import { Button } from './ui/button';
import { useMe } from '@/hooks/useMe';
import { cn } from '@/lib/utils';

const Header = () => {
  const isMobile = useWindowWidth();
  const { isLoggedIn } = useAuth();
  const { MeQuery } = useMe();

  const [search, setSearch] = useState('');
  // 🔹 Single combined state for search/auth/profile
  const [openMenu, setOpenMenu] = useState<
    'search' | 'auth' | 'profile' | null
  >(null);
  const toggleMenu = (menu: 'search' | 'auth' | 'profile') => {
    setOpenMenu((prev) => (prev === menu ? null : menu));
  };

  useEffect(() => {
    if (!isMobile) {
      setOpenMenu(null);
    }
  }, [isMobile]);

  return (
    <div className='fixed z-30 flex h-[64px] w-full items-center justify-between gap-4 bg-white px-4 shadow-[0_0_20px_0_#CBCACA40] md:h-[80px] md:px-[120px]'>
      {/* Left Logo */}
      <Logo />

      {/* Desktop Search */}
      {isLoggedIn && !isMobile && (
        <SearchBar search={search} setSearch={setSearch} />
      )}

      {/* Desktop Right Not Logged In */}
      {!isLoggedIn && !isMobile && <AuthButtons />}

      {/* Desktop Right Logged In */}
      {isLoggedIn && !isMobile && (
        <div className='flex flex-1 items-center justify-end gap-6'>
          <Link to='/cart'>
            <img
              src='/icons/header-bag.svg'
              alt='Shopping Cart Icon'
              className='size-8'
            />
          </Link>
          <div
            onClick={() => toggleMenu('profile')}
            className='flex cursor-pointer items-center gap-4'
          >
            <img
              src='/images/author-profile.png'
              alt='Profile Picture'
              className='size-12 rounded-full'
            />
            <span className='text-lg font-semibold'>
              {MeQuery?.data.profile.name}
            </span>
            <ChevronDown
              className={cn(
                'size-6 transition-all duration-300',
                openMenu === 'profile' && 'rotate-180'
              )}
            />
          </div>
        </div>
      )}

      {/* Mobile Right Section */}
      {isMobile && (
        <div className='flex flex-1 items-center justify-end gap-4'>
          <Search
            onClick={() => toggleMenu('search')}
            className='size-6 cursor-pointer'
          />
          <img
            src='/icons/header-bag.svg'
            alt='Shopping Cart'
            className='size-[28px] cursor-pointer'
          />
          {isLoggedIn && (
            <img
              onClick={() => toggleMenu('profile')}
              src='/images/author-profile.png'
              alt='profile-picture'
              className='size-10 cursor-pointer rounded-full'
            />
          )}

          {!isLoggedIn &&
            (openMenu !== 'auth' ? (
              <Menu
                onClick={() => toggleMenu('auth')}
                className='size-6 cursor-pointer'
              />
            ) : (
              <XIcon
                onClick={() => toggleMenu('auth')}
                className='size-6 cursor-pointer'
              />
            ))}
        </div>
      )}

      {/* Mobile Search Overlay */}
      {openMenu === 'search' && isMobile && (
        <div className='absolute z-40 flex h-[64px] w-full items-center justify-between gap-4 bg-white px-4'>
          <Logo />
          <SearchBar search={search} setSearch={setSearch} />
          <XIcon
            onClick={() => toggleMenu('search')}
            className='size-6 cursor-pointer'
          />
        </div>
      )}

      {/* Mobile Auth Open Overlay */}
      {openMenu === 'auth' && isMobile && (
        <div className='absolute top-[64px] left-0 z-40 flex h-[64px] w-full items-center justify-between gap-3 bg-white px-4'>
          <AuthButtons />
        </div>
      )}

      {/* Profile menu (desktop + mobile) */}
      {openMenu === 'profile' && <ProfileMenuOption />}
    </div>
  );
};

export default Header;

const Logo = () => (
  <Link to='/' className='outline-0 md:flex-1'>
    <div className='flex items-center gap-3'>
      <img
        src='/icons/public-logo.svg'
        alt='Booky Logo'
        className='size-10 md:size-[42px]'
      />
      <span className='hidden font-extrabold md:block'>Booky</span>
    </div>
  </Link>
);

type SearchBarProps = {
  search: string;
  setSearch: (v: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ search, setSearch }) => {
  const navigate = useNavigate();

  const handleSearch = () => {
    if (search.trim() !== '') {
      navigate(`/category?q=${encodeURIComponent(search)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className='relative w-full flex-1'>
      <Input
        type='text'
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
        onKeyDown={handleKeyDown}
        placeholder='Search user'
        className='h-10 rounded-full pl-[42px] md:h-12 md:max-w-[500px]'
      />
      <Search
        onClick={handleSearch}
        className='absolute top-1/2 left-4 size-5 -translate-y-1/2 cursor-pointer'
      />
    </div>
  );
};

const AuthButtons = () => (
  <div className='flex w-full flex-1 items-center gap-4 md:max-w-[342px]'>
    <Link to='/login' className='w-full'>
      <Button className='w-full border border-neutral-300 bg-white font-bold text-neutral-950 hover:bg-neutral-100 md:max-w-[163px]'>
        Login
      </Button>
    </Link>
    <Link to='/register' className='w-full'>
      <Button className='w-full md:max-w-[163px]'>Register</Button>
    </Link>
  </div>
);

const ProfileMenuOption = () => {
  const navigate = useNavigate();
  const { Logout } = useAuth();
  const { MeQuery } = useMe();

  const handleLogout = () => {
    Logout();
    navigate('/login');
  };

  return (
    <div className='md:max-[184px] absolute top-[64px] left-0 flex w-full max-w-[calc(100%)-32px] flex-col gap-4 rounded-[16px] bg-white p-4 shadow-[0_0_20px_0_#CBCACA40] md:top-[74px] md:right-[120px] md:left-auto md:max-w-[185px]'>
      <Link to='/profile?tab=profile'>
        <span className='font-semibold'>Profile</span>
      </Link>
      <Link to='/profile?tab=borrowed_list'>
        <span className='font-semibold'>Borrowed List</span>
      </Link>
      <Link to='/profile?tab=reviews'>
        <span className='font-semibold'>Reviews</span>
      </Link>
      {MeQuery?.data.profile.role === 'ADMIN' && (
        <Link to='/admin'>
          <span className='font-semibold'>Admin</span>
        </Link>
      )}
      <span
        onClick={handleLogout}
        className='cursor-pointer font-semibold text-[#EE1D52]'
      >
        Logout
      </span>
    </div>
  );
};
