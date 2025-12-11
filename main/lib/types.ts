import * as z from "zod";

export const UserSignUpSchema = z.object({
  name: z
    .string({ error: "First name is required" })
    .max(50, "Invalid first name"),
  email: z.email({ error: "Invalid email" }),
  password: z
    .string()
    .min(8, { error: "Password should be at least 8 characters" }),
  age: z.number({ error: "Age must be entered" }).min(10).max(120),
  gender: z.enum(["male", "female"], { error: "Gender must be selected" }),
});

export const UserSignInSchema = z.object({
  email: z.email({ error: "Invalid email" }),
  password: z
    .string()
    .min(8, { error: "Password should be at least 8 characters" }),
});

export const UserSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
  age: z.number(),
  gender: z.enum(["male", "female"]),
  interests: z.array(z.string()),
  emailVerified: z.boolean().nullable(),
  image: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type UserSignUpType = z.infer<typeof UserSignUpSchema>;
export type UserSignInType = z.infer<typeof UserSignInSchema>;
export type UserType = z.infer<typeof UserSchema>;
