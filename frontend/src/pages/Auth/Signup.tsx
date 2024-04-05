import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
/* Hooks */
import { SubmitHandler, useForm } from 'react-hook-form';
import useAuth from '@/hooks/useAuth';
/* Icons */
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
/* Components */
import { BackgroundBeams } from '@/components/BackgroundBeams/BackgroundBeams';
/* Translation */
import { useTranslation } from 'react-i18next';

type Inputs = {
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
};

const Signup = () => {
  const { handleSignup } = useAuth();

  const { t } = useTranslation();

  const {
    register,
    watch,
    handleSubmit,
    trigger,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<Inputs>();

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const password = watch('password');
  const passwordConfirm = watch('passwordConfirm');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async data => {
    setIsLoading(true);
    await handleSignup(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isSubmitSuccessful) reset();
  }, [isSubmitSuccessful, reset]);

  return (
    <div className="h-screen bg-rose-900 dark:bg-gray-900 flex flex-col items-center justify-center antialiased z-0">
      <BackgroundBeams />
      <div className="w-full max-w-xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 z-10 relative">
        <Link to="/auth/signin">
          <ArrowBackIcon className="absolute dark:text-white text-rose-600" />
        </Link>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <img
            src="https://static-00.iconduck.com/assets.00/nestjs-icon-2048x2040-3rrvcej8.png"
            alt="img"
            className="mx-auto h-40 w-auto"
          />
          <h5 className="text-xl text-center font-medium text-gray-900 dark:text-white">
            {t('signup.title')}
          </h5>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              {t('signup.email.title')}
            </label>
            <input
              {...register('email', {
                required: t('signup.email.required'),
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: t('signup.email.invalid'),
                },
              })}
              id="email"
              type="email"
              name="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder={t('signup.email.placeholder')}
              required={true}
              onError={errors.email ? () => {} : undefined}
              onKeyUp={() => {
                trigger('email');
              }}
            />
            {errors.email && (
              <small className="text-red-500">{errors.email.message}</small>
            )}
          </div>
          <div>
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              {t('signup.username.title')}
            </label>
            <input
              {...register('username', {
                required: t('signup.username.required'),
                minLength: {
                  value: 4,
                  message: t('signup.username.min_length'),
                },
                maxLength: {
                  value: 20,
                  message: t('signup.username.max_length'),
                },
                pattern: {
                  value:
                    /^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/,
                  message: t('signup.username.invalid'),
                },
              })}
              id="username"
              type="username"
              name="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder={t('signup.username.placeholder')}
              required={true}
              onError={errors.username ? () => {} : undefined}
              onKeyUp={() => {
                trigger('username');
              }}
            />
            {errors.username && (
              <small className="text-red-500">{errors.username.message}</small>
            )}
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              {t('signup.password.title')}
            </label>
            <input
              {...register('password', {
                required: t('signup.password.required'),
                minLength: {
                  value: 8,
                  message: t('signup.password.min_length'),
                },
                maxLength: {
                  value: 20,
                  message: t('signup.password.max_length'),
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
                  message: t('signup.password.pattern'),
                },
              })}
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
              placeholder="••••••••"
              autoComplete="off"
              maxLength={20}
              required={true}
              onError={errors.password ? () => {} : undefined}
              onKeyUp={() => {
                trigger('password');
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            />
            {errors.password && (
              <small className="text-red-500">{errors.password.message}</small>
            )}
            {password && password.length && (
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-8 right-0 pr-3 pt-1 flex items-center text-sm leading-5"
              >
                {showPassword ? (
                  <VisibilityOffIcon className="h-5 w-5 text-gray-900 dark:text-white cursor-pointer" />
                ) : (
                  <VisibilityIcon className="h-5 w-5 text-gray-900 dark:text-white cursor-pointer" />
                )}
              </div>
            )}
          </div>
          <div className="relative">
            <label
              htmlFor="passwordConfirm"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              {t('signup.confirm_password.title')}
            </label>
            <input
              {...register('passwordConfirm', {
                required: t('signup.confirm_password.required'),
                validate: passwordConfirm =>
                  passwordConfirm === password ||
                  t('signup.confirm_password.not_match'),
              })}
              type={showPasswordConfirm ? 'text' : 'password'}
              name="passwordConfirm"
              id="passwordConfirm"
              placeholder="••••••••"
              autoComplete="off"
              maxLength={20}
              required={true}
              onError={errors.passwordConfirm ? () => {} : undefined}
              onKeyUp={() => {
                trigger('passwordConfirm');
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            />
            {errors.passwordConfirm && (
              <small className="text-red-500">
                {errors.passwordConfirm.message}
              </small>
            )}
            {passwordConfirm && passwordConfirm.length && (
              <div
                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                className="absolute top-8 right-0 pr-3 pt-1 flex items-center text-sm leading-5"
              >
                {showPasswordConfirm ? (
                  <VisibilityOffIcon className="h-5 w-5 text-gray-900 dark:text-white cursor-pointer" />
                ) : (
                  <VisibilityIcon className="h-5 w-5 text-gray-900 dark:text-white cursor-pointer" />
                )}
              </div>
            )}
          </div>
          {!isLoading ? (
            <button
              type="submit"
              className="w-full text-white bg-rose-600 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {t('signup.create')}
            </button>
          ) : (
            <button
              disabled
              type="button"
              className="w-full flex justify-center items-center py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="#1C64F2"
                />
              </svg>
              {t('general.loading')}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Signup;
