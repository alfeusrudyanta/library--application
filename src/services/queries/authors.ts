import AxiosInstance from '@/services/api/axios';
import type {
  GetAuthorsRes,
  PostAuthorsReq,
  PostAuthorsRes,
  GetAuthorsBookRes,
  PutAuthorsReq,
  PutAuthorsRes,
  DeleteAuthorsRes,
} from '@/types/authors';

const apiAuthors = {
  GetAuthors: async (): Promise<GetAuthorsRes> => {
    const res = await AxiosInstance.get('/api/authors');
    return res.data;
  },

  PostAuthors: async (data: PostAuthorsReq): Promise<PostAuthorsRes> => {
    const res = await AxiosInstance.post('/api/authors', data);
    return res.data;
  },

  GetAuthorsBook: async (id: number): Promise<GetAuthorsBookRes> => {
    const res = await AxiosInstance.get(`/api/authors/${id}/books`);
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
};

export default apiAuthors;
