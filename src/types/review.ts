type Review = {
  id: number;
  star: number;
  comment: string;
  userId: number;
  bookId: number;
  createdAt: string;
};

type User = {
  id: number;
  name: string;
};

type UserReview = Review & {
  user: User;
};

type BookStats = {
  rating: number;
  reviewCount: number;
};

type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

type PostReviewsReq = {
  bookId: number;
  star: number;
  comment: string;
};

type PostReviewsRes = {
  success: boolean;
  message: string;
  data: {
    review: Review;
    bookStats: BookStats;
  };
};

type GetReviewsBookParamsReq = {
  page: number;
  limit: number;
};

type GetReviewsBookRes = {
  success: boolean;
  message: string;
  data: {
    bookId: number;
    reviews: UserReview[];
    pagination: Pagination;
  };
};

type DeleteReviewsRes = {
  success: boolean;
  message: string;
  data: {
    bookStats: BookStats;
  };
};

export type {
  PostReviewsReq,
  PostReviewsRes,
  GetReviewsBookParamsReq,
  GetReviewsBookRes,
  DeleteReviewsRes,
};
