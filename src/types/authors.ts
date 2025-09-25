type BookDetail = {
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

type AuthorsData = {
  id: number;
  name: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
};

type GetAuthorsRes = {
  success: boolean;
  message: string;
  data: {
    authors: AuthorsData[];
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

type GetAuthorsBookRes = {
  success: boolean;
  message: string;
  data: {
    author: AuthorsData;
    books: BookDetail[];
  };
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

export type {
  GetAuthorsRes,
  PostAuthorsReq,
  PostAuthorsRes,
  GetAuthorsBookRes,
  PutAuthorsReq,
  PutAuthorsRes,
  DeleteAuthorsRes,
};
