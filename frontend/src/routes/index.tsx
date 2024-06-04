import { Route, Routes } from 'react-router-dom';
import Home from '@/pages/Home/Home';
import Signin from '@/pages/Auth/Signin';
import Signup from '@/pages/Auth/Signup';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useAuthStore } from '@/store/auth.store';

const Root = () => {
  const { isAuth } = useAuthStore(state => state);

  const isAuthenticated = !!isAuth;

  return (
    <Routes>
      <Route path="/auth/signin" element={<Signin />} />
      <Route path="/auth/signup" element={<Signup />} />

      <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default Root;
