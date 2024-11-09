import z from "zod";

export const signinSchema = z.object({
  email: z.string().email({ message: "Required" }).min(2, {
    message: "Required",
  }),
  password: z
    .string()
    .min(2, {
      message: "Required",
    })
    .max(50),
});
