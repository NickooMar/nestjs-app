import type { Signup, Signin } from '@/types/auth.types';
import axios, { type AxiosInstance } from 'axios';
import { authApi } from '@/utils/axios';

class AuthService {
  private readonly axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
  }

  public async signin({ email, password }: Signin) {
    const { data } = await this.axiosInstance.post('/auth/signin', {
      email,
      password,
    });

    return data;
  }

  public async logout() {
    // logout logic
  }

  public async register({
    email,
    username,
    password,
    passwordConfirm,
  }: Signup) {
    const { data } = await this.axiosInstance.post('/auth/signup', {
      email,
      username,
      password,
      passwordConfirm,
    });

    return data;
  }

  public async profile() {
    const { data } = await authApi.get('/auth/profile');

    return data;
  }
}

const baseURL = import.meta.env.VITE_SERVICE_URL;
export const authService = new AuthService(baseURL);
