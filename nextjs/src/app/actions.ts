"use server"

import { signIn } from "@/auth"
import { AuthProviders } from "@/types/auth/auth.types"

export async function signinProvidersAction(provider: AuthProviders) {
  if (!provider || ![AuthProviders.Google].includes(provider)) return

  await signIn(provider)
}

export async function credentialsSigninAction(email: string, password: string) {
  if (!email || !password) return

  console.log({ email, password })

  // await signIn("credentials", { email, password })
}
