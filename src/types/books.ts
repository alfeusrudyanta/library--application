type AuthorShort = {
  id: number;
  name: string;
};

type Author = AuthorShort & {
  bio: string;
  createdAt: string;
  updatedAt: string;
};

type CategoryShort = {
  id: number;
  name: string;
};

type Category = CategoryShort & {
  createdAt: string;
  updatedAt: string;
};

type BookBase = {
  id: number;
  title: string;
  description: string;
  isbn: string;
  publishedYear: number;
  coverImage: string | null;
  rating: number;
  reviewCount: number;
  totalCopies: number;
  availableCopies: number;
  borrowCount: number;
  authorId: number;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
};

type BookDetail = BookBase & {
  author: Author;
  category: Category;
};

type BookDetailRecommendation = BookBase & {
  author: AuthorShort;
  category: CategoryShort;
};

type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

type RecommendationFilter = 'rating' | 'popular';

type FilterData = {
  mode: RecommendationFilter;
  books: BookDetailRecommendation[];
};

type ReviewUser = {
  id: number;
  name: string;
};

type Review = {
  id: number;
  star: number;
  comment: string;
  userId: number;
  bookId: number;
  createdAt: string;
  user: ReviewUser;
};

type GetBooksParamsReq = {
  q?: string;
  categoryId?: number;
  authorId?: number;
  page: number;
  limit: number;
};

type GetBooksRes = {
  success: boolean;
  message: string;
  data: {
    books: BookDetail[];
    pagination: Pagination;
  };
};

type PostBooksReq = {
  title: string;
  description: string;
  isbn: string;
  publishedYear: number;
  coverImage: string | null | File;
  authorId: number;
  categoryId: number;
  totalCopies: number;
  availableCopies: number;
};

type PostBooksRes = {
  success: boolean;
  message: string;
  data: BookBase;
};

type GetBooksRecommendedReq = {
  by: RecommendationFilter;
  categoryId?: number;
  limit: number;
};

type GetBooksRecommendedRes = {
  success: boolean;
  message: string;
  data: FilterData;
};

type GetBookRes = {
  success: boolean;
  message: string;
  data: BookDetail & {
    reviews: Review[];
  };
};

type PutBooksReq = PostBooksReq;

type PutBooksRes = PostBooksRes;

type DeleteBooksRes = {
  success: boolean;
  message: string;
  data: {
    id: number;
  };
};

export type {
  GetBooksParamsReq,
  GetBooksRes,
  PostBooksReq,
  PostBooksRes,
  GetBooksRecommendedReq,
  GetBooksRecommendedRes,
  GetBookRes,
  PutBooksReq,
  PutBooksRes,
  DeleteBooksRes,
  BookDetail,
};
