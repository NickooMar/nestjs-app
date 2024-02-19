import { AxiosError } from "axios";
import { authService } from "../Services/auth.service";
import { Signup, Signin } from "Types/auth.types";
import { toast } from "sonner";

const useAuth = () => {
  const handleSignup = ({ email, password, passwordConfirm }: Signup) => {
    console.log({ email, password, passwordConfirm });
  };

  const handleSigning = async ({ email, password }: Signin) => {
    try {
      const { access_token } = await authService.login({ email, password });

      return access_token;
    } catch (error) {
      const axiosError = error as AxiosError;

      // Invalid credentials
      if (axiosError.response && axiosError.response.status === 401) {
        return toast.error("Invalid credentials");
      }

      return toast.error("Internal server error");
    }
  };

  return { handleSigning, handleSignup };
};

export default useAuth;
