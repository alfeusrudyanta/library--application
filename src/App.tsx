import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import Home from '@/pages/Home';
import AdminHome from '@/pages/Admin/AdminHome';
import ProtectedRoute from '@/components/ProtectedRoute';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Header from './components/Header';
import Footer from './components/Footer';
import Book from './pages/User/Book';
import Preview from './pages/Admin/Preview';
import AddBook from './pages/Admin/AddBook';
import { Toaster } from './components/ui/sonner';
import EditBook from './pages/Admin/EditBook';
import Category from './pages/User/Category';
import Author from './pages/User/Author';
import Checkout from './pages/User/Checkout';
import Success from './pages/User/Success';
import Profile from './pages/User/Profile/Profile';
import Cart from './pages/User/Cart';

const AdminLayout = () => {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <main className='flex-1 px-4 py-20 md:px-[120px] md:pt-[128px] md:pb-[108px]'>
        <Outlet />
      </main>
    </div>
  );
};

const UserLayout = () => {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <main className='flex-1 p-4 md:px-[120px] md:pt-[128px] md:pb-[118px]'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

const PublicLayout = () => {
  return (
    <div className='flex min-h-screen flex-col'>
      <main className='flex flex-1 items-center justify-center px-4'>
        <Outlet />
      </main>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Route>

        <Route element={<UserLayout />}>
          <Route path='/' element={<Home />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
          <Route element={<AdminLayout />}>
            <Route path='/admin' element={<AdminHome />} />
            <Route path='/addbook' element={<AddBook />} />
            <Route path='/preview/:id' element={<Preview />} />
            <Route path='/editbook/:id' element={<EditBook />} />
          </Route>
        </Route>

        {/* User Routes */}
        <Route element={<ProtectedRoute allowedRoles={['USER', 'ADMIN']} />}>
          <Route element={<UserLayout />}>
            <Route path='/book/:id' element={<Book />} />
            <Route path='/author/:id' element={<Author />} />
            <Route path='/category' element={<Category />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/success/:days' element={<Success />} />
          </Route>
        </Route>

        {/* Other Routes */}
        <Route path='*' element={<Navigate to='/login' replace />} />
      </Routes>
      <Toaster richColors position='top-right' />
    </BrowserRouter>
  );
}

export default App;
