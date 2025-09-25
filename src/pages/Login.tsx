import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useAuth from '@/hooks/useAuth';
import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const { PostAuthLoginMutation, loading } = useAuth();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      return setErrorMsg('Please fill all fields');
    }

    if (password.length < 8) {
      return setErrorMsg('Password must be more than 7 characters.');
    }

    const data = {
      email: email.trim(),
      password: password.trim(),
    };

    PostAuthLoginMutation(data, {
      onSuccess: () => {
        setErrorMsg('');
        navigate('/');
      },
      onError: () => {
        setErrorMsg('Incorrect email/password');
      },
    });
  };

  return (
    <div className='flex w-full max-w-[400px] flex-col gap-5'>
      {/* Logo */}
      <div className='flex items-center gap-2'>
        <img
          src='/icons/public-logo.svg'
          alt='Library Logo'
          loading='lazy'
          height={33}
          width={33}
        />
        <span className='text-[25px] font-bold'>Booky</span>
      </div>

      {/* Information */}
      <div className='flex flex-col gap-[2px] md:gap-2'>
        <span className='text-display-xs md:text-display-sm font-bold'>
          Login
        </span>
        <span className='font-semibold text-neutral-700'>
          Sign in to manage your library account.
        </span>
      </div>

      {/* Form */}
      <form onSubmit={handleLogin} className='flex flex-col gap-4'>
        {/* Email */}
        <div className='flex flex-col'>
          <span className='font-bold md:text-sm'>Email</span>
          <Input
            type='email'
            disabled={loading}
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            className='h-12 font-semibold'
          />
        </div>

        {/* Password */}
        <div className='flex flex-col'>
          <span className='font-bold md:text-sm'>Password</span>
          <Input
            type='password'
            disabled={loading}
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            className='h-12 font-semibold'
          />
        </div>

        {/* Error Msg */}
        {errorMsg && <span className='text-red-600'>{errorMsg}</span>}

        {/* Button */}
        <Button type='submit' disabled={loading} className='h-12'>
          {loading ? (
            <div className='mx-auto h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent' />
          ) : (
            'Login'
          )}
        </Button>

        {/* Redirect */}
        <span className='text-center font-semibold'>
          Don't have an account?{' '}
          <span
            onClick={() => navigate('/register')}
            className='cursor-pointer text-[#1C65DA]'
          >
            Register
          </span>
        </span>
      </form>
    </div>
  );
};

export default Login;
