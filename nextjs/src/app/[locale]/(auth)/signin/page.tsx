"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { signinFormSchema } from "@/lib/zodSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { BackgroundBeams } from "@/components/ui/BackgroundBeams"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import GoogleIcon from "@mui/icons-material/Google"
import { useTranslations } from "next-intl"

type formData = z.infer<typeof signinFormSchema>

const SigninPage = () => {
  const router = useRouter()
  const t = useTranslations("signin")

  const [showPassword, setShowPassword] = useState<boolean>(false)

  const form = useForm<formData>({
    resolver: zodResolver(signinFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: formData) {
    console.log({ data })
  }

  return (
    <div className="h-screen bg-rose-900 dark:bg-gray-900 flex flex-col items-center justify-center antialiased">
      <BackgroundBeams />
      <section className="w-full max-w-xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 z-10 relative">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <h3 className="text-center scroll-m-20 text-2xl font-semibold tracking-tight">
              {t("title")}
            </h3>
            <div className="flex flex-col justify-center items-center">
              <p className="text-center text-sm text-muted-foreground">
                {t("description")}
              </p>
              <Button type="button" variant="outline" className=" mt-4 pa-4">
                <GoogleIcon className="mx-2" />
                {t("google_auth")}
              </Button>
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
                    <Input placeholder={t("email.placeholder")} {...field} />
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
                    <Input type="password" placeholder="*********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="bg-gray-950 w-full">
              {t("login")}
            </Button>
          </form>
        </Form>
      </section>
    </div>
  )
}

export default SigninPage
