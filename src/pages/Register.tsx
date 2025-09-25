import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useAuth from '@/hooks/useAuth';
import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const { PostAuthRegisterMutation, loading } = useAuth();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      return setErrorMsg('Please fill all fields');
    }

    if (name.length < 6) {
      return setErrorMsg('Name must be more than 5 characters.');
    }

    if (password.length < 8) {
      return setErrorMsg('Password must be more than 7 characters.');
    }

    if (password !== confirmPassword) {
      return setErrorMsg("Passwords don't match");
    }

    const data = {
      name: name.trim(),
      email: email.trim(),
      password: password.trim(),
    };

    PostAuthRegisterMutation(data, {
      onSuccess: () => {
        setErrorMsg('');
        navigate('/login');
      },
      onError: () => setErrorMsg('Server error. Please try again later.'),
    });
  };

  return (
    <div className='flex w-full max-w-[400px] flex-col gap-5 py-[75px]'>
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
          Register
        </span>
        <span className='font-semibold text-neutral-700'>
          Create your account to start borrowing books.
        </span>
      </div>

      {/* Form */}
      <form onSubmit={handleRegister} className='flex flex-col gap-4'>
        {/* Name */}
        <div className='flex flex-col'>
          <span className='font-bold md:text-sm'>Name</span>
          <Input
            type='text'
            disabled={loading}
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            className='h-12 font-semibold'
          />
        </div>

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

        {/* PhoneNumber */}
        <div className='flex flex-col'>
          <span className='font-bold md:text-sm'>Phone Number</span>
          <Input
            type='tel'
            disabled={loading}
            placeholder='Phone Number'
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.currentTarget.value)}
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

        {/* Confirm Password */}
        <div className='flex flex-col'>
          <span className='font-bold md:text-sm'>Confirm Password</span>
          <Input
            type='password'
            disabled={loading}
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.currentTarget.value)}
            className='h-12 font-semibold'
          />
        </div>

        {/* Error Msg */}
        {errorMsg && <span className='text-red-600'>{errorMsg}</span>}

        {/* Button */}
        <Button disabled={loading} type='submit' className='h-12'>
          {loading ? (
            <div className='mx-auto h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent' />
          ) : (
            'Submit'
          )}
        </Button>

        {/* Redirect */}
        <span className='text-center font-semibold'>
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')}
            className='cursor-pointer text-[#1C65DA]'
          >
            Log In
          </span>
        </span>
      </form>
    </div>
  );
};

export default Register;
