import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiCategories from '@/services/queries/categories';
import type { PostCategoriesReq, PutCategoriesReq } from '@/types/categories';

const useCategories = () => {
  const queryClient = useQueryClient();

  const CategoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: () => apiCategories.GetCategories(),
    staleTime: Infinity,
  });

  const PostCategoriesMutation = useMutation({
    mutationFn: (data: PostCategoriesReq) => apiCategories.PostCategories(data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['categories'] }),
    onError: (error) => console.error('PostCategoriesMutation error:', error),
  });

  const PutCategoriesMutation = useMutation({
    mutationFn: (payload: { id: number; data: PutCategoriesReq }) =>
      apiCategories.PutCategories(payload.id, payload.data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['categories'] }),
    onError: (error) => console.error('PutCategoriesMutation error:', error),
  });

  const DeleteCategoriesMutation = useMutation({
    mutationFn: (id: number) => apiCategories.DeleteCategories(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['categories'] }),
    onError: (error) => console.error('DeleteCategoriesMutation error:', error),
  });

  const loading =
    PostCategoriesMutation.isPending ||
    PutCategoriesMutation.isPending ||
    DeleteCategoriesMutation.isPending;

  const error =
    PostCategoriesMutation.isError ||
    PutCategoriesMutation.isError ||
    DeleteCategoriesMutation.isError;

  return {
    // Query
    CategoriesQuery: CategoriesQuery.data,

    // Mutations
    PostCategoriesMutation: PostCategoriesMutation.mutate,
    PutCategoriesMutation: PutCategoriesMutation.mutate,
    DeleteCategoriesMutation: DeleteCategoriesMutation.mutate,

    // Aggregate state
    loading,
    error,
  };
};

export default useCategories;
