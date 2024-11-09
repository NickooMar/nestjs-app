"use client";

import { z } from "zod";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Link } from "@/i18n/routing";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import { AuthProviders } from "@/types/auth/auth.types";
import { signinSchema } from "@/types/auth/auth.schemas";
import { PasswordInput } from "@/components/Auth/PasswordInput";
import { BackgroundBeams } from "@/components/Aceternity/BackgroundBeams";

type formData = z.infer<typeof signinSchema>;

const SigninPage = () => {
  const t = useTranslations("signin");

  const form = useForm<formData>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: formData) {
    // await credentialsSigninAction(data.email, data.password);
  }

  async function handleSigninProviders(provider: any) {
    // await signinProvidersAction(provider);
  }

  return (
    <div className="h-screen bg-rose-900 dark:bg-gray-900 flex flex-col items-center justify-center antialiased -z-20">
      <BackgroundBeams />
      <section className="w-full max-w-xl p-4 z-0 bg-white border border-gray-200 rounded-xl shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <h3 className="text-center scroll-m-20 text-2xl font-semibold tracking-tight">
              {t("title")}
            </h3>
            <div className="flex flex-col justify-center items-center">
              <p className="text-center text-sm text-muted-foreground">
                {t("description")}
              </p>
              <div className="w-full grid grid-auto-fit-sm gap-4 place-content-center mt-5">
                <Button
                  type="button"
                  className="rounded-xl p-4"
                  onClick={async () =>
                    await handleSigninProviders(AuthProviders.Google)
                  }
                >
                  <GoogleIcon className="mx-2" />
                  {t("google_auth")}
                </Button>
                <Button
                  type="button"
                  className="rounded-xl p-4"
                  onClick={async () =>
                    await handleSigninProviders(AuthProviders.Github)
                  }
                >
                  <GitHubIcon className="mx-2" />
                  {t("github_auth")}
                </Button>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <Separator className="w-[35%]" />
              <p className="text-sm text-muted-foreground mx-4 whitespace-nowrap">
                {t("continue_with")}
              </p>
              <Separator className="w-[35%]" />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("email.title")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={t("email.placeholder")}
                      className={`rounded-xl border border-slate-100 border-opacity-50 ${
                        form.formState.errors.email ? "animate-shake" : ""
                      }`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      {...field}
                      className={`rounded-xl border border-slate-100 border-opacity-50 ${
                        form.formState.errors.password ? "animate-shake" : ""
                      }`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Link
                href="/forgot"
                className="text-sm text-rose-600 hover:underline dark:text-white"
              >
                {t("forgot_password")}
              </Link>
            </div>
            <Button
              type="submit"
              className="text-white w-full rounded-xl mt-4 p-4 dark:text-black dark:hover:bg-slate-200"
            >
              {t("login")}
            </Button>
            <div className="flex justify-center items-center gap-2">
              <p className="text-sm">{t("not_registered")}</p>
              <Link
                href="/signup"
                className="text-sm text-rose-600 hover:underline dark:text-white"
              >
                {t("create_account")}
              </Link>
            </div>
          </form>
        </Form>
      </section>
    </div>
  );
};

export default SigninPage;
