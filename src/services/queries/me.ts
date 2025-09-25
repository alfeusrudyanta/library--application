import AxiosInstance from '@/services/api/axios';
import type {
  GetMeRes,
  PatchMeReq,
  PatchMeRes,
  GetMeLoansParamsReq,
  GetMeLoansRes,
  GetMeReviewsParamsReq,
  GetMeReviewsRes,
} from '@/types/me';

const apiMe = {
  GetMe: async (): Promise<GetMeRes> => {
    const res = await AxiosInstance.get('/api/me');
    return res.data;
  },

  PatchMe: async (data: PatchMeReq): Promise<PatchMeRes> => {
    const res = await AxiosInstance.patch('/api/me', data);
    return res.data;
  },

  GetMeLoans: async (params: GetMeLoansParamsReq): Promise<GetMeLoansRes> => {
    const res = await AxiosInstance.get('/api/me/loans', { params });
    return res.data;
  },

  GetMeReviews: async (
    params: GetMeReviewsParamsReq
  ): Promise<GetMeReviewsRes> => {
    const res = await AxiosInstance.get('/api/me/reviews', { params });
    return res.data;
  },
};

export default apiMe;
