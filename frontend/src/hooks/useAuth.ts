import { AxiosError } from 'axios';
import { authService } from '@/services/auth.service';
import { Signup, Signin } from '@/types/auth.types';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const useAuth = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSignup = async ({
    email,
    username,
    password,
    passwordConfirm,
  }: Signup) => {
    try {
      if (password !== passwordConfirm)
        return toast.error(t('signup.messages.erros.passwords_do_not_match'));

      await authService.register({
        email,
        username,
        password,
        passwordConfirm,
      });

      navigate('/auth/signin');

      return toast.success(t('signup.messages.success.account_created'));
    } catch (error) {
      const axiosError = error as AxiosError;
      const FOUND = 302;

      // Invalid credentials
      if (axiosError.response && axiosError.response.status === FOUND) {
        return toast.error(t('signup.messages.erros.user_already_exists'));
      }

      return toast.error(t('signup.messages.erros.internal_server_error'));
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
        return toast.error(t('signin.messages.errors.unathorized'));
      }

      return toast.error(t('signin.messages.errors.internal_server_error'));
    }
  };

  const profileRequest = async () => {
    try {
      const response = await authService.profile();
      console.log({ response });
    } catch (error) {
      const axiosError = error as AxiosError;

      console.error(axiosError);

      return toast.error('Error getting profile');
    }
  };

  return { handleSignin, handleSignup, profileRequest };
};

export default useAuth;
