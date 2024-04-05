import { Route, Routes } from 'react-router-dom';
import Home from '@/pages/Home/Home';
import Signin from '@/pages/Auth/Signin';
import Signup from '@/pages/Auth/Signup';

const Root = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth/signin" element={<Signin />} />
      <Route path="/auth/signup" element={<Signup />} />
    </Routes>
  );
};

export default Root;
