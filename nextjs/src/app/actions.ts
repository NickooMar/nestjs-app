"use server"

import { signIn } from "@/auth"

export async function signinProvidersAction(provider: string) {
  if (!provider || provider !== "Google") throw new Error("Invalid provider")

  await signIn(provider)
}
