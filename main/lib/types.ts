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
  role: z.union([z.enum(["viewer", "organizer"]), z.string()], {
    error: "Role must be selected",
  }),
});

export const UserSignInSchema = z.object({
  email: z.email({ error: "Invalid email" }),
  password: z
    .string()
    .min(8, { error: "Password should be at least 8 characters" }),
});

export const UserSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.email(),
  password: z.string().optional(),
  age: z.number(),
  gender: z.union([z.enum(["male", "female"]), z.string()]),
  role: z.union([z.enum(["viewer", "organizer"]), z.string()]),
  interests: z.array(z.string()),
  emailVerified: z.boolean().optional(),
  image: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const EventSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  date: z.date(),
  category: z.string(),
  tags: z.array(z.string()),
  rating: z.number(),
  availableSeats: z.number(),
  shortDescription: z.string(),
  description: z.string(),
  img: z.union([z.string(), z.object()]).optional(),
  s3Url: z.string().nullable(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// Recommendation (table: recommendation) - relation to user kept as userId only
export const RecommendationSchema = z.object({
  id: z.string(),
  userId: z.string(),
  createdAt: z.date(),
});

// RecommendationEvent (join table: recommendation_event)
export const RecommendationEventSchema = z.object({
  recommendationId: z.string(),
  eventId: z.string(),
});

export type UserSignUpType = z.infer<typeof UserSignUpSchema>;
export type UserSignInType = z.infer<typeof UserSignInSchema>;
export type UserType = z.infer<typeof UserSchema>;
export type EventType = z.infer<typeof EventSchema>;
export type RecommendationType = z.infer<typeof RecommendationSchema>;
export type RecommendationEventSchema = z.infer<
  typeof RecommendationEventSchema
>;
