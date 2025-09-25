import AxiosInstance from '@/services/api/axios';
import type {
  PostReviewsReq,
  PostReviewsRes,
  GetReviewsBookParamsReq,
  GetReviewsBookRes,
  DeleteReviewsRes,
} from '@/types/review';

const apiReview = {
  PostReviews: async (data: PostReviewsReq): Promise<PostReviewsRes> => {
    const res = await AxiosInstance.post('/api/reviews', data);
    return res.data;
  },

  GetReviewsBook: async (
    bookId: number,
    params: GetReviewsBookParamsReq
  ): Promise<GetReviewsBookRes> => {
    const res = await AxiosInstance.get(`/api/reviews/book/${bookId}`, {
      params,
    });
    return res.data;
  },

  DeleteReviews: async (id: number): Promise<DeleteReviewsRes> => {
    const res = await AxiosInstance.delete(`/api/reviews/${id}`);
    return res.data;
  },
};

export default apiReview;
