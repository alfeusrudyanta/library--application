import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/styles/index.css';
import App from '@/App.tsx';
import AuthProvider from '@/context/AuthContext.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className='md:text-md text-sm font-medium text-neutral-950'>
          <App />
        </div>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
