import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiMe from '@/services/queries/me';
import type {
  PatchMeReq,
  GetMeLoansParamsReq,
  GetMeReviewsParamsReq,
} from '@/types/me';

const useMe = () => {
  const queryClient = useQueryClient();

  const MeQuery = useQuery({
    queryKey: ['profile'],
    queryFn: () => apiMe.GetMe(),
  });

  const PatchMeMutation = useMutation({
    mutationFn: (data: PatchMeReq) => apiMe.PatchMe(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['profile'] }),
    onError: (error) => console.error('PatchMeMutation error:', error),
  });

  const loading = PatchMeMutation.isPending;
  const error = PatchMeMutation.isError;

  return {
    // Queries
    MeQuery: MeQuery.data,

    // Mutation
    PatchMeMutation: PatchMeMutation.mutate,

    // Aggregate state
    MeQueryLoading: MeQuery.isLoading,
    loading,
    error,
  };
};

const useMeLoansQuery = (params: GetMeLoansParamsReq) => {
  const MeLoansQuery = useQuery({
    queryKey: ['profile', 'loans', params],
    queryFn: () => apiMe.GetMeLoans(params),
  });

  return {
    MeLoansQueryData: MeLoansQuery.data,
    loading: MeLoansQuery.isLoading,
    error: MeLoansQuery.isError,
  };
};

const useMeReviewsQuery = (params: GetMeReviewsParamsReq) => {
  const MeReviewsQuery = useQuery({
    queryKey: ['profile', 'reviews', params],
    queryFn: () => apiMe.GetMeReviews(params),
    staleTime: Infinity,
  });

  return {
    MeReviewsQueryData: MeReviewsQuery.data,
    loading: MeReviewsQuery.isLoading,
    error: MeReviewsQuery.isError,
  };
};
export { useMe, useMeLoansQuery, useMeReviewsQuery };
