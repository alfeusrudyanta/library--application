type Category = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

type GetCategoriesRes = {
  success: boolean;
  message: string;
  data: {
    categories: Category[];
  };
};

type PostCategoriesReq = {
  name: string;
};

type PostCategoriesRes = {
  success: boolean;
  message: string;
  data: Category;
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
  GetCategoriesRes,
  PostCategoriesReq,
  PostCategoriesRes,
  PutCategoriesReq,
  PutCategoriesRes,
  DeleteCategoriesRes,
};
