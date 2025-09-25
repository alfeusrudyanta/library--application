import AxiosInstance from '@/services/api/axios';
import type {
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
} from '@/types/admin';

const apiAdmin = {
  PostAdminLoans: async (
    data: PostAdminLoansReq
  ): Promise<PostAdminLoansRes> => {
    const res = await AxiosInstance.post('/api/admin/loans', data);
    return res.data;
  },

  PatchAdminLoans: async (
    id: number,
    data: PatchAdminLoansReq
  ): Promise<PatchAdminLoansRes> => {
    const res = await AxiosInstance.patch(`/api/admin/loans/${id}`, data);
    return res.data;
  },

  GetAdminLoansOverdue: async (
    params: GetAdminLoansOverdueParamsReq
  ): Promise<GetAdminLoansOverdueRes> => {
    const res = await AxiosInstance.get('/api/admin/loans/overdue', { params });
    return res.data;
  },

  GetAdminOverview: async (): Promise<GetAdminOverviewRes> => {
    const res = await AxiosInstance.get('/api/admin/overview');
    return res.data;
  },

  PostAuthors: async (data: PostAuthorsReq): Promise<PostAuthorsRes> => {
    const res = await AxiosInstance.post('/api/authors', data);
    return res.data;
  },

  PutAuthors: async (
    id: number,
    data: PutAuthorsReq
  ): Promise<PutAuthorsRes> => {
    const res = await AxiosInstance.put(`/api/authors/${id}`, data);
    return res.data;
  },

  DeleteAuthors: async (id: number): Promise<DeleteAuthorsRes> => {
    const res = await AxiosInstance.delete(`/api/authors/${id}`);
    return res.data;
  },

  DeleteBooks: async (id: number): Promise<DeleteBooksRes> => {
    const res = await AxiosInstance.delete(`/api/books/${id}`);
    return res.data;
  },

  PostCategories: async (
    data: PostCategoriesReq
  ): Promise<PostCategoriesRes> => {
    const res = await AxiosInstance.post('/api/categories', data);
    return res.data;
  },

  PutCategories: async (
    id: number,
    data: PutCategoriesReq
  ): Promise<PutCategoriesRes> => {
    const res = await AxiosInstance.put(`/api/categories/${id}`, data);
    return res.data;
  },

  DeleteCategories: async (id: number): Promise<DeleteCategoriesRes> => {
    const res = await AxiosInstance.delete(`/api/categories/${id}`);
    return res.data;
  },
};

export default apiAdmin;
