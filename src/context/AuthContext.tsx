import type { UserProfile } from '@/types/auth';
import { createContext, useContext } from 'react';
import { useMe } from '@/hooks/useMe';

type AuthContextType = {
  user: UserProfile['role'] | undefined;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { MeQuery, MeQueryLoading } = useMe();

  const user =
    (MeQuery?.data?.profile?.role as UserProfile['role']) ?? undefined;
  const isLoading = MeQueryLoading;

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
