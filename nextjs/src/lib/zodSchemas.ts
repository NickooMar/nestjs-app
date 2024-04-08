import z from "zod"

export const signinFormSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(2)
    .max(50)
    .refine((value) => /[a-zA-Z]/.test(value), {
      message: "Password must contain at least one letter",
    })
    .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
      message: "Password must contain at least one special character",
    }),
})
