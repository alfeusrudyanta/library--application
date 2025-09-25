import AxiosInstance from '@/services/api/axios';
import type {
  PostLoansReq,
  PostLoansRes,
  PatchLoansReturnRes,
  GetLoansMyRes,
} from '@/types/loans';

const apiLoans = {
  PostLoans: async (data: PostLoansReq): Promise<PostLoansRes> => {
    const res = await AxiosInstance.post('/api/loans', data);
    return res.data;
  },

  PatchLoansReturn: async (id: number): Promise<PatchLoansReturnRes> => {
    const res = await AxiosInstance.patch(`/api/loans/${id}/return`);
    return res.data;
  },

  GetLoansMy: async (): Promise<GetLoansMyRes> => {
    const res = await AxiosInstance.get('/api/loans/my');
    return res.data;
  },
};

export default apiLoans;
