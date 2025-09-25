import AxiosInstance from '@/services/api/axios';
import type {
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
} from '@/types/books';

const apiBooks = {
  GetBooks: async (params: GetBooksParamsReq): Promise<GetBooksRes> => {
    const res = await AxiosInstance.get('/api/books', { params });
    return res.data;
  },

  PostBooks: async (data: PostBooksReq): Promise<PostBooksRes> => {
    const res = await AxiosInstance.post('/api/books', data);
    return res.data;
  },

  GetBooksRecommended: async (
    params: GetBooksRecommendedReq
  ): Promise<GetBooksRecommendedRes> => {
    const res = await AxiosInstance.get('/api/books/recommend', { params });
    return res.data;
  },

  GetBook: async (id: number): Promise<GetBookRes> => {
    const res = await AxiosInstance.get(`/api/books/${id}`);
    return res.data;
  },

  PutBooks: async (id: number, data: PutBooksReq): Promise<PutBooksRes> => {
    const res = await AxiosInstance.put(`/api/books/${id}`, data);
    return res.data;
  },

  DeleteBooks: async (id: number): Promise<DeleteBooksRes> => {
    const res = await AxiosInstance.delete(`/api/books/${id}`);
    return res.data;
  },
};

export default apiBooks;
