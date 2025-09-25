import getCookie from '@/lib/getCookie';
import apiAuth from '@/services/queries/auth';
import type { PostAuthLoginReq, PostAuthRegisterReq } from '@/types/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useAuth = () => {
  const queryClient = useQueryClient();
  const token = getCookie('token');

  const PostAuthRegisterMutation = useMutation({
    mutationFn: (data: PostAuthRegisterReq) => apiAuth.PostAuthRegister(data),
    onError: (error) => console.error('PostAuthRegisterMutation error:', error),
  });

  const PostAuthLoginMutation = useMutation({
    mutationFn: (data: PostAuthLoginReq) => apiAuth.PostAuthLogin(data),
    onSuccess: (data) => {
      if (data.data.token) {
        document.cookie = `token=${data.data.token}; max-age=${
          7 * 24 * 60 * 60
        }; path=/`;
      }
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (error) => console.error('PostAuthLoginMutation error:', error),
  });

  const Logout = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    queryClient.removeQueries({ queryKey: ['profile'] });
    PostAuthLoginMutation.reset();
  };

  const loading =
    PostAuthRegisterMutation.isPending || PostAuthLoginMutation.isPending;

  const error =
    PostAuthRegisterMutation.isError || PostAuthLoginMutation.isError;

  return {
    // Mutations
    PostAuthRegisterMutation: PostAuthRegisterMutation.mutate,
    PostAuthLoginMutation: PostAuthLoginMutation.mutate,

    // Logout
    Logout,

    // Aggregate state
    loading,
    error,

    // Data
    isLoggedIn: !!token,
  };
};

export default useAuth;
