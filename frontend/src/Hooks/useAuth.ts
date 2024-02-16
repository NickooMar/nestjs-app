import { authService } from "../Services/auth.service";
import { Signup, Signin } from "Types/auth.types";

const useAuth = () => {
  const handleSignup = ({ email, password, passwordConfirm }: Signup) => {
    console.log({ email, password, passwordConfirm });
  };

  const handleSigning = async ({ email, password }: Signin) => {
    try {
    const { access_token } = await authService.login({ email, password });
      
    } catch (error) {
      console.log(error)
    }
  };

  return { handleSigning, handleSignup };
};

export default useAuth;
