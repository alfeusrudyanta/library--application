import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiBooks from '@/services/queries/books';
import type {
  GetBooksParamsReq,
  GetBooksRecommendedReq,
  PostBooksReq,
  PutBooksReq,
} from '@/types/books';

const useBooks = () => {
  const queryClient = useQueryClient();

  const PostBooksMutation = useMutation({
    mutationFn: (data: PostBooksReq) => apiBooks.PostBooks(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['books'] }),
    onError: (error) => console.error('PostBooksMutation error:', error),
  });

  const PutBooksMutation = useMutation({
    mutationFn: (payload: { id: number; data: PutBooksReq }) =>
      apiBooks.PutBooks(payload.id, payload.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['books'] }),
    onError: (error) => console.error('PutBooksMutation error:', error),
  });

  const DeleteBooksMutation = useMutation({
    mutationFn: (id: number) => apiBooks.DeleteBooks(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['books'] }),
    onError: (error) => console.error('DeleteBooksMutation error:', error),
  });

  // Aggregate loading and error
  const success =
    PostBooksMutation.isSuccess ||
    PutBooksMutation.isSuccess ||
    DeleteBooksMutation.isSuccess;

  const loading =
    PostBooksMutation.isPending ||
    PutBooksMutation.isPending ||
    DeleteBooksMutation.isPending;

  const error =
    PostBooksMutation.isError ||
    PutBooksMutation.isError ||
    DeleteBooksMutation.isError;

  return {
    // Mutations
    PostBooksMutation: PostBooksMutation.mutate,
    PutBooksMutation: PutBooksMutation.mutate,
    DeleteBooksMutation: DeleteBooksMutation.mutate,

    // Aggregate state
    success,
    loading,
    error,
  };
};

const useBooksFilterQuery = (params: GetBooksParamsReq) => {
  const BooksFilterQuery = useQuery({
    queryKey: ['books', 'authors', 'categories', params],
    queryFn: () => apiBooks.GetBooks(params),
  });

  return {
    BooksQueryFilterData: BooksFilterQuery.data,
    loading: BooksFilterQuery.isLoading,
    error: BooksFilterQuery.isError,
  };
};

const useBooksQuery = (id: number) => {
  const BooksQuery = useQuery({
    queryKey: ['books', id],
    queryFn: () => apiBooks.GetBook(id),
  });

  return {
    BooksQueryData: BooksQuery.data,
    loading: BooksQuery.isLoading,
    error: BooksQuery.isError,
  };
};

const useBooksRecommendationQuery = (params: GetBooksRecommendedReq) => {
  const BooksRecommendationQuery = useQuery({
    queryKey: ['books', params],
    queryFn: () => apiBooks.GetBooksRecommended(params),
    staleTime: Infinity,
  });

  return {
    BooksRecommendationData: BooksRecommendationQuery.data,
    loading: BooksRecommendationQuery.isLoading,
    error: BooksRecommendationQuery.isError,
  };
};

export {
  useBooks,
  useBooksFilterQuery,
  useBooksQuery,
  useBooksRecommendationQuery,
};
