type BorrowedStatus = 'BORROWED' | 'LATE' | 'RETURNED';

type LoanData = {
  id: number;
  userId: number;
  bookId: number;
  status: string;
  borrowedAt: BorrowedStatus;
  dueAt: string;
  returnedAt: null | string;
};

type BookDetail = {
  id: number;
  title: string;
  coverImage: string;
};

type BorrowedBooks = LoanData & { book: BookDetail };

type PostLoansReq = {
  bookId: number;
  days: number;
};

type PostLoansRes = {
  success: boolean;
  message: string;
  data: {
    loan: LoanData;
  };
};

type PatchLoansReturnRes = PostLoansRes;

type GetLoansMyRes = {
  success: boolean;
  message: string;
  data: {
    loans: BorrowedBooks;
  };
};

export type { PostLoansReq, PostLoansRes, PatchLoansReturnRes, GetLoansMyRes };
