import { type AxiosError, HttpStatusCode } from 'axios';
import { authService } from '@/services/auth.service';
import type { Signup, Signin } from '@/types/auth.types';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/store/auth.store';

const useAuth = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { logout } = useAuthStore(state => state);

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

      if (axiosError?.response?.status === HttpStatusCode.Found) {
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

      if (axiosError?.response?.status === HttpStatusCode.Unauthorized) {
        return toast.error(t('signin.messages.errors.unathorized'));
      }

      return toast.error(t('signin.messages.errors.internal_server_error'));
    }
  };

  const profileRequest = async () => {
    try {
      return await authService.profile();
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(axiosError);
      return toast.error('Error getting profile');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/auth/signin');
  };

  return { handleSignin, handleSignup, profileRequest, handleLogout };
};

export default useAuth;
