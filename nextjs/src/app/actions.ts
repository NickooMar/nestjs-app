"use server"

import { signIn } from "@/auth"

export async function signinProvidersAction(provider: string) {
  await signIn(provider)
}
