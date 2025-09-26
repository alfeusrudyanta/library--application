import BookBriefCard from '@/components/BookBriefCard';
import Loading from '@/components/Loading';
import { useBooksFilterQuery } from '@/hooks/useBooks';
import useCategories from '@/hooks/useCategories';
import { cn } from '@/lib/utils';
import { ListFilter, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Category = () => {
  const { CategoriesQuery } = useCategories();

  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  const location = useLocation();
  const q = new URLSearchParams(location.search).get('q') ?? '';
  const [searchTerm, setSearchTerm] = useState(q);

  const { BooksQueryFilterData } = useBooksFilterQuery({
    q: searchTerm,
    categoryId: categoryId,
    page: 1,
    limit: 8,
  });

  useEffect(() => {
    setSearchTerm(q);
  }, [q]);

  if (!BooksQueryFilterData || !CategoriesQuery) {
    return <Loading />;
  }

  return (
    <div className='flex flex-col gap-4 md:gap-8'>
      <span className='text-display-xs md:text-display-lg font-bold'>
        Book List
      </span>

      {/* Filter */}
      <div className='flex flex-col gap-4 md:flex-row md:gap-10'>
        {/* Mobile Filter */}
        <div className='flex h-[52px] items-center justify-between rounded-[12px] p-3 px-3 shadow-[0_0_20px_0_#CBCACA40] md:hidden'>
          <span className='font-extrabold'>FILTER</span>
          <ListFilter
            onClick={() => setIsFilterOpen((prev) => !prev)}
            className={cn(
              'size-5 transition-all duration-300',
              isFilterOpen && 'rotate-180'
            )}
          />
        </div>

        {/* Desktop Filter */}
        <div className='w-full max-w-[270px]'>
          <div className='flex flex-col gap-4 md:gap-6'>
            <div className='flex flex-col gap-[10px]'>
              <span className='text-md font-extrabold md:text-lg'>
                Category
              </span>

              <div className='flex flex-col gap-[10px]'>
                {CategoriesQuery.data.categories.map((category) => (
                  <label
                    key={category.id}
                    className='flex cursor-pointer items-center gap-2'
                  >
                    <input
                      type='checkbox'
                      name='category'
                      value={category.id}
                      checked={categoryId === category.id}
                      onChange={() =>
                        setCategoryId(
                          categoryId === Number(category.id)
                            ? undefined
                            : Number(category.id)
                        )
                      }
                      className='h-4 w-4 accent-blue-500'
                    />
                    <span className='text-sm font-medium'>{category.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className='w-full border border-neutral-300' />

            <div className='flex flex-col gap-[10px]'>
              <span className='text-md font-extrabold md:text-lg'>Rating</span>

              <div className='flex flex-col gap-2'>
                {[5, 4, 3, 2, 1].map((value) => (
                  <label
                    key={value}
                    className='flex cursor-pointer items-center gap-2'
                  >
                    <input
                      type='checkbox'
                      checked={selectedRating === value}
                      onChange={() =>
                        setSelectedRating(
                          selectedRating === value ? null : value
                        )
                      }
                      className='accent-primary-300ri h-4 w-4 cursor-pointer'
                    />
                    <div className='flex items-center gap-2'>
                      <Star className='size-6 fill-[#FFAB0D] stroke-0' />
                      <span>{value}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Books */}
        <div className='grid w-full grid-cols-2 gap-4 md:grid-cols-4 md:gap-5'>
          {BooksQueryFilterData?.data.books
            .filter((book) =>
              selectedRating === null
                ? true
                : Number(book.rating.toFixed(0)) === selectedRating
            )
            .map((book) => (
              <BookBriefCard key={book.id} id={book.id} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
