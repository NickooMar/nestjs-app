import { AxiosError } from "axios";
import { authService } from "../Services/auth.service";
import { Signup, Signin } from "Types/auth.types";
import { toast } from "sonner";

const useAuth = () => {
  const handleSignup = async ({ email, password, passwordConfirm }: Signup) => {
    try {
      if (password !== passwordConfirm)
        return toast.error("Passwords do not match");

      await authService.register({ email, password, passwordConfirm });

      return toast.success("Account created successfully");
    } catch (error) {
      const axiosError = error as AxiosError;
      const FOUND = 302;

      // Invalid credentials
      if (axiosError.response && axiosError.response.status === FOUND) {
        return toast.error("User already exists");
      }

      return toast.error("Internal server error");
    }
  };

  const handleSignin = async ({ email, password }: Signin) => {
    try {
      const { access_token } = await authService.signin({ email, password });

      return access_token;
    } catch (error) {
      const axiosError = error as AxiosError;
      const UNAUTHORIZED = 401;

      // Invalid credentials
      if (axiosError.response && axiosError.response.status === UNAUTHORIZED) {
        return toast.error("Invalid credentials");
      }

      return toast.error("Internal server error");
    }
  };

  return { handleSignin, handleSignup };
};

export default useAuth;
