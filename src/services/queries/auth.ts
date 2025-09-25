import AxiosInstance from '@/services/api/axios';
import type {
  PostAuthRegisterReq,
  PostAuthRegisterRes,
  PostAuthLoginReq,
  PostAuthLoginRes,
} from '@/types/auth';

const apiAuth = {
  PostAuthRegister: async (
    data: PostAuthRegisterReq
  ): Promise<PostAuthRegisterRes> => {
    const res = await AxiosInstance.post('/api/auth/register', data);
    return res.data;
  },

  PostAuthLogin: async (data: PostAuthLoginReq): Promise<PostAuthLoginRes> => {
    const res = await AxiosInstance.post('/api/auth/login', data);
    return res.data;
  },
};

export default apiAuth;
