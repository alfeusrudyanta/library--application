type BorrowedStatus = 'BORROWED' | 'LATE' | 'RETURNED';

type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

type AuthorData = {
  id: number;
  name: string;
};

type CategoryData = {
  id: number;
  name: string;
};

type UserData = {
  id: number;
  name: string;
  email: string;
};

type BookDetail = {
  id: number;
  title: string;
  author: AuthorData;
};

type LoanData = {
  id: number;
  userId: number;
  bookId: number;
  status: BorrowedStatus;
  borrowedAt: string;
  dueAt: string;
  returnedAt: null | string;
};

type OverdueData = LoanData & {
  user: UserData;
  book: BookDetail;
};

type TopBorrowedBook = {
  id: number;
  title: string;
  borrowCount: number;
  rating: number;
  availableCopies: number;
  totalCopies: number;
  author: AuthorData;
  category: CategoryData;
};

type TotalsData = {
  users: number;
  books: number;
};

type LoansData = {
  active: number;
  overdue: number;
};

type AuthorsData = {
  id: number;
  name: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
};

type CreateCategoryData = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

type PostAdminLoansReq = {
  userId: number;
  bookId: number;
  dueAt: string;
};

type PostAdminLoansRes = {
  success: boolean;
  message: string;
  data: {
    loan: LoanData;
  };
};

type PatchAdminLoansReq = {
  dueAt: string;
  status: string;
};

type PatchAdminLoansRes = PostAdminLoansRes;

type GetAdminLoansOverdueParamsReq = {
  page: number;
  limit: number;
};

type GetAdminLoansOverdueRes = {
  success: boolean;
  message: string;
  data: {
    overdue: OverdueData[];
    pagination: Pagination;
  };
};

type GetAdminOverviewRes = {
  success: boolean;
  message: string;
  data: {
    totals: TotalsData;
    loans: LoansData;
    topBorrowed: TopBorrowedBook[];
    generatedAt: string;
  };
};

type PostAuthorsReq = {
  name: string;
  bio: string;
};

type PostAuthorsRes = {
  success: boolean;
  message: string;
  data: AuthorsData;
};

type PutAuthorsReq = {
  name: string;
  bio: string;
};

type PutAuthorsRes = PostAuthorsRes;

type DeleteAuthorsRes = {
  success: boolean;
  message: string;
  data: {
    id: number;
  };
};

type DeleteBooksRes = DeleteAuthorsRes;

type PostCategoriesReq = {
  name: string;
};

type PostCategoriesRes = {
  success: boolean;
  message: string;
  data: CreateCategoryData;
};

type PutCategoriesReq = PostCategoriesReq;

type PutCategoriesRes = PostCategoriesRes;

type DeleteCategoriesRes = {
  success: boolean;
  message: string;
  data: {
    id: number;
  };
};

export type {
  PostAdminLoansReq,
  PostAdminLoansRes,
  PatchAdminLoansReq,
  PatchAdminLoansRes,
  GetAdminLoansOverdueParamsReq,
  GetAdminLoansOverdueRes,
  GetAdminOverviewRes,
  PostAuthorsReq,
  PostAuthorsRes,
  PutAuthorsReq,
  PutAuthorsRes,
  DeleteAuthorsRes,
  DeleteBooksRes,
  PostCategoriesReq,
  PostCategoriesRes,
  PutCategoriesReq,
  PutCategoriesRes,
  DeleteCategoriesRes,
  OverdueData,
};
