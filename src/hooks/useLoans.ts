import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiLoans from '@/services/queries/loans';
import type { PostLoansReq } from '@/types/loans';

const useLoans = () => {
  const queryClient = useQueryClient();

  const LoansMyQuery = useQuery({
    queryKey: ['loans'],
    queryFn: () => apiLoans.GetLoansMy(),
  });

  const PostLoansMutation = useMutation({
    mutationFn: (data: PostLoansReq) => apiLoans.PostLoans(data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['loans', 'books'] }),
    onError: (error) => console.error('PostLoansMutation error:', error),
  });

  const PatchLoansReturnMutation = useMutation({
    mutationFn: (id: number) => apiLoans.PatchLoansReturn(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['loans', 'books'] }),
    onError: (error) => console.error('PatchLoansReturnMutation error:', error),
  });

  const loading =
    PostLoansMutation.isPending || PatchLoansReturnMutation.isPending;
  const error = PostLoansMutation.isError || PatchLoansReturnMutation.isError;
  const success =
    PostLoansMutation.isSuccess || PatchLoansReturnMutation.isSuccess;

  return {
    // Query
    LoansMyQuery: LoansMyQuery.data,

    // Mutations
    PostLoansMutation: PostLoansMutation.mutateAsync,
    PatchLoansReturnMutation: PatchLoansReturnMutation.mutate,

    // Aggregate state
    success,
    loading,
    error,
  };
};

export default useLoans;
