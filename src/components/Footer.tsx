import SocialMediaList from '@/constant/footer';

const Footer = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-4 border-t border-neutral-300 px-4 py-10 md:gap-10 md:px-[150px] md:py-20'>
      <div className='flex flex-col items-center justify-center gap-4 md:gap-[22px]'>
        <div className='flex items-center gap-3'>
          <img
            src='/icons/public-logo.svg'
            alt='Booky Logo'
            className='size-[32px] md:size-[42px]'
          />
          <span className='text-display-md font-extrabold'>Booky</span>
        </div>

        <span className='text-center font-semibold'>
          Discover inspiring stories & timeless knowledge, ready to borrow
          anytime. Explore online or visit our nearest library branch.
        </span>
      </div>

      <div className='flex flex-col gap-5'>
        <span className='text-md text-center font-bold'>
          Follow on Social Media
        </span>

        <div className='flex items-center gap-3'>
          {SocialMediaList.map((item) => (
            <div
              key={item.name}
              className='flex size-10 cursor-pointer items-center justify-center rounded-full border border-neutral-300'
            >
              <img src={item.icon} alt={item.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
