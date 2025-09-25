import AxiosInstance from '@/services/api/axios';
import type {
  GetCategoriesRes,
  PostCategoriesReq,
  PostCategoriesRes,
  PutCategoriesReq,
  PutCategoriesRes,
  DeleteCategoriesRes,
} from '@/types/categories';

const apiCategories = {
  GetCategories: async (): Promise<GetCategoriesRes> => {
    const res = await AxiosInstance.get('/api/categories');
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

export default apiCategories;
