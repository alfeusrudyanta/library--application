type Profile = {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
};

type LoanStats = {
  borrowed: number;
  late: number;
  returned: number;
  total: number;
};

type BorrowedStatus = 'BORROWED' | 'LATE' | 'RETURNED';

type LoanedBook = {
  id: number;
  title: string;
  coverImage: string | null;
};

type Loans = {
  id: number;
  userId: number;
  bookId: number;
  status: BorrowedStatus;
  borrowedAt: string;
  dueAt: string;
  returnedAt: string | null;
  book: LoanedBook;
};

type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

type Review = {
  id: number;
  star: number;
  comment: string;
  userId: number;
  bookId: number;
  createdAt: string;
  book: LoanedBook;
};

type GetMeRes = {
  success: boolean;
  message: string;
  data: {
    profile: Profile;
    loanStats: LoanStats;
    reviewsCount: number;
  };
};

type PatchMeReq = {
  name: string;
};

type PatchMeRes = {
  success: boolean;
  message: string;
  data: Profile;
};

type GetMeLoansParamsReq = {
  status?: BorrowedStatus;
  page: number;
  limit: number;
};

type GetMeLoansRes = {
  success: boolean;
  message: string;
  data: {
    loans: Loans[];
    pagination: Pagination;
  };
};

type GetMeReviewsParamsReq = {
  page: number;
  limit: number;
};

type GetMeReviewsRes = {
  success: boolean;
  message: string;
  data: {
    reviews: Review[];
    pagination: Pagination;
  };
};

export type {
  GetMeRes,
  PatchMeReq,
  PatchMeRes,
  GetMeLoansParamsReq,
  GetMeLoansRes,
  GetMeReviewsParamsReq,
  GetMeReviewsRes,
  Loans,
};
