import { Signup, Signin } from "Types/auth.types";
import axios, { AxiosInstance } from "axios";

class AuthService {
  private readonly axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  }

  public async signin({ email, password }: Signin) {
    const { data } = await this.axiosInstance.post("/auth/signin", {
      email,
      password,
    });

    return data;
  }

  public async logout() {
    // logout logic
  }

  public async register({ email, password, passwordConfirm }: Signup) {
    console.log({ email, password, passwordConfirm });
  }
}

const baseURL = import.meta.env.VITE_SERVICE_URL;
export const authService = new AuthService(baseURL);
