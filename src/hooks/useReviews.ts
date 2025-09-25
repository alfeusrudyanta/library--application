import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiReview from '@/services/queries/reviews';
import type { PostReviewsReq, GetReviewsBookParamsReq } from '@/types/review';

const useReview = () => {
  const queryClient = useQueryClient();

  const PostReviewsMutation = useMutation({
    mutationFn: (data: PostReviewsReq) => apiReview.PostReviews(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['reviews'] }),
    onError: (error) => console.error('PostReviewsMutation error:', error),
  });

  const DeleteReviewsMutation = useMutation({
    mutationFn: (id: number) => apiReview.DeleteReviews(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['reviews'] }),
    onError: (error) => console.error('DeleteReviewsMutation error:', error),
  });

  const loading =
    PostReviewsMutation.isPending || DeleteReviewsMutation.isPending;
  const error = PostReviewsMutation.isError || DeleteReviewsMutation.isError;

  const success =
    PostReviewsMutation.isSuccess || DeleteReviewsMutation.isSuccess;

  return {
    // Mutations
    PostReviewsMutation: PostReviewsMutation.mutate,
    DeleteReviewsMutation: DeleteReviewsMutation.mutate,

    // Aggregate state
    success,
    loading,
    error,
  };
};

const useReviewsBookQuery = (
  bookId: number,
  params: GetReviewsBookParamsReq
) => {
  const ReviewsBookQuery = useQuery({
    queryKey: ['reviews', 'books', bookId, params],
    queryFn: () => apiReview.GetReviewsBook(bookId, params),
  });

  return {
    ReviewsBookQuery: ReviewsBookQuery.data,
    loading: ReviewsBookQuery.isLoading,
    error: ReviewsBookQuery.isError,
  };
};

export { useReview, useReviewsBookQuery };
