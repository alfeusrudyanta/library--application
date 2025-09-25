import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiAuthors from '@/services/queries/authors';
import type { PostAuthorsReq, PutAuthorsReq } from '@/types/authors';

const useAuthors = () => {
  const queryClient = useQueryClient();

  // Queries
  const AuthorsQuery = useQuery({
    queryKey: ['authors'],
    queryFn: () => apiAuthors.GetAuthors(),
  });

  // Mutations
  const PostAuthorsMutation = useMutation({
    mutationFn: (data: PostAuthorsReq) => apiAuthors.PostAuthors(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['authors'] }),
    onError: (error) => console.error('PostAuthorsMutation error:', error),
  });

  const PutAuthorsMutation = useMutation({
    mutationFn: (payload: { id: number; data: PutAuthorsReq }) =>
      apiAuthors.PutAuthors(payload.id, payload.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['authors'] }),
    onError: (error) => console.error('PutAuthorsMutation error:', error),
  });

  const DeleteAuthorsMutation = useMutation({
    mutationFn: (id: number) => apiAuthors.DeleteAuthors(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['authors'] }),
    onError: (error) => console.error('DeleteAuthorsMutation error:', error),
  });

  const loading =
    AuthorsQuery.isPending ||
    PostAuthorsMutation.isPending ||
    PutAuthorsMutation.isPending ||
    DeleteAuthorsMutation.isPending;

  const error =
    AuthorsQuery.isError ||
    PostAuthorsMutation.isError ||
    PutAuthorsMutation.isError ||
    DeleteAuthorsMutation.isError;

  return {
    // Queries
    AuthorsQuery: AuthorsQuery.data,

    // Refetch
    AuthorsQueryRefetch: AuthorsQuery.refetch,

    // Mutations
    PostAuthorsMutation: PostAuthorsMutation.mutate,
    PutAuthorsMutation: PutAuthorsMutation.mutate,
    DeleteAuthorsMutation: DeleteAuthorsMutation.mutate,

    // Aggregate state
    loading,
    error,
  };
};

const useAuthorBooksQuery = (id: number) => {
  const AuthorBooksQuery = useQuery({
    queryFn: () => apiAuthors.GetAuthorsBook(id),
    queryKey: ['authors', id],
  });

  return {
    AuthorBooksQueryData: AuthorBooksQuery.data,
    AuthorBooksQueryRefetch: AuthorBooksQuery.refetch,
    loading: AuthorBooksQuery.isLoading,
    error: AuthorBooksQuery.isError,
  };
};

export { useAuthors, useAuthorBooksQuery };
