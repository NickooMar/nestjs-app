import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Signin from "../Pages/Auth/Signin";
import Signup from "../Pages/Auth/Signup";

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
