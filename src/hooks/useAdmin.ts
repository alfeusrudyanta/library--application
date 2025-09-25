import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiAdmin from '@/services/queries/admin';
import type {
  PostAdminLoansReq,
  PatchAdminLoansReq,
  GetAdminLoansOverdueParamsReq,
  PostAuthorsReq,
  PutAuthorsReq,
  PostCategoriesReq,
  PutCategoriesReq,
} from '@/types/admin';

const useAdmin = () => {
  const queryClient = useQueryClient();

  // Queries
  const AdminOverviewQuery = useQuery({
    queryKey: ['books', 'loans', 'authors'],
    queryFn: () => apiAdmin.GetAdminOverview(),
  });

  // Mutations
  const PostAdminLoansMutation = useMutation({
    mutationFn: (data: PostAdminLoansReq) => apiAdmin.PostAdminLoans(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['loans'] }),
    onError: (error) => console.error('PostAdminLoansMutation error:', error),
  });

  const PatchAdminLoansMutation = useMutation({
    mutationFn: (payload: { id: number; data: PatchAdminLoansReq }) =>
      apiAdmin.PatchAdminLoans(payload.id, payload.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['loans'] }),
    onError: (error) => console.error('PatchAdminLoansMutation error:', error),
  });

  const PostAuthorsMutation = useMutation({
    mutationFn: (data: PostAuthorsReq) => apiAdmin.PostAuthors(data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['books', 'authors'] }),
    onError: (error) => console.error('PostAuthorsMutation error:', error),
  });

  const PutAuthorsMutation = useMutation({
    mutationFn: (payload: { id: number; data: PutAuthorsReq }) =>
      apiAdmin.PutAuthors(payload.id, payload.data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['books', 'authors'] }),
    onError: (error) => console.error('PutAuthorsMutation error:', error),
  });

  const DeleteAuthorsMutation = useMutation({
    mutationFn: (id: number) => apiAdmin.DeleteAuthors(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['authors'] }),
    onError: (error) => console.error('DeleteAuthorsMutation error:', error),
  });

  const DeleteBooksMutation = useMutation({
    mutationFn: (id: number) => apiAdmin.DeleteBooks(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['books'] }),
    onError: (error) => console.error('DeleteBooksMutation error:', error),
  });

  const PostCategoriesMutation = useMutation({
    mutationFn: (data: PostCategoriesReq) => apiAdmin.PostCategories(data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['books', 'categories'] }),
    onError: (error) => console.error('PostCategoriesMutation error:', error),
  });

  const PutCategoriesMutation = useMutation({
    mutationFn: (payload: { id: number; data: PutCategoriesReq }) =>
      apiAdmin.PutCategories(payload.id, payload.data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['categories'] }),
    onError: (error) => console.error('PutCategoriesMutation error:', error),
  });

  const DeleteCategoriesMutation = useMutation({
    mutationFn: (id: number) => apiAdmin.DeleteCategories(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['categories'] }),
    onError: (error) => console.error('DeleteCategoriesMutation error:', error),
  });

  const loading =
    AdminOverviewQuery.isPending ||
    PostAdminLoansMutation.isPending ||
    PatchAdminLoansMutation.isPending ||
    PostAuthorsMutation.isPending ||
    PutAuthorsMutation.isPending ||
    DeleteAuthorsMutation.isPending ||
    DeleteBooksMutation.isPending ||
    PostCategoriesMutation.isPending ||
    PutCategoriesMutation.isPending ||
    DeleteCategoriesMutation.isPending;

  const error =
    AdminOverviewQuery.isError ||
    PostAdminLoansMutation.isError ||
    PatchAdminLoansMutation.isError ||
    PostAuthorsMutation.isError ||
    PutAuthorsMutation.isError ||
    DeleteAuthorsMutation.isError ||
    DeleteBooksMutation.isError ||
    PostCategoriesMutation.isError ||
    PutCategoriesMutation.isError ||
    DeleteCategoriesMutation.isError;

  return {
    // Queries
    AdminOverviewQuery: AdminOverviewQuery.data,

    // Mutations
    PostAdminLoansMutation: PostAdminLoansMutation.mutate,
    PatchAdminLoansMutation: PatchAdminLoansMutation.mutate,
    PostAuthorsMutation: PostAuthorsMutation.mutate,
    PutAuthorsMutation: PutAuthorsMutation.mutate,
    DeleteAuthorsMutation: DeleteAuthorsMutation.mutate,
    DeleteBooksMutation: DeleteBooksMutation.mutate,
    PostCategoriesMutation: PostCategoriesMutation.mutate,
    PutCategoriesMutation: PutCategoriesMutation.mutate,
    DeleteCategoriesMutation: DeleteCategoriesMutation.mutate,

    // Aggregate state
    loading,
    error,
  };
};

const useAdminLoansOverdue = (params: GetAdminLoansOverdueParamsReq) => {
  const AdminLoansOverdueQuery = useQuery({
    queryKey: ['books', 'loans', 'authors', 'categories', params],
    queryFn: () => apiAdmin.GetAdminLoansOverdue(params),
  });

  return {
    OverdueData: AdminLoansOverdueQuery.data,
    loading: AdminLoansOverdueQuery.isPending,
    error: AdminLoansOverdueQuery.isError,
  };
};

export { useAdmin, useAdminLoansOverdue };
