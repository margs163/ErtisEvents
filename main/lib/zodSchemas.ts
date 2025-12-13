import { z } from "zod";

// User (table: user) - relations omitted (sessions, accounts, recommendations, likedEvents)
export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().nullable().optional(),
  emailVerified: z.boolean(),
  image: z.string().nullable().optional(),
  age: z.number().int(),
  gender: z.string(),
  role: z.string(),
  interests: z.array(z.string()),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Session (table: session)
export const SessionSchema = z.object({
  id: z.string(),
  expiresAt: z.date(),
  token: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  ipAddress: z.string().nullable().optional(),
  userAgent: z.string().nullable().optional(),
  userId: z.string(),
});

// Account (table: account)
export const AccountSchema = z.object({
  id: z.string(),
  accountId: z.string(),
  providerId: z.string(),
  userId: z.string(),
  accessToken: z.string().nullable().optional(),
  refreshToken: z.string().nullable().optional(),
  idToken: z.string().nullable().optional(),
  accessTokenExpiresAt: z.date().nullable().optional(),
  refreshTokenExpiresAt: z.date().nullable().optional(),
  scope: z.string().nullable().optional(),
  password: z.string().nullable().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Verification (table: verification)
export const VerificationSchema = z.object({
  id: z.string(),
  identifier: z.string(),
  value: z.string(),
  expiresAt: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Event (table: event) - relations omitted (recommendationEvents, likedBy)
export const EventSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.string(),
  tags: z.array(z.string()),
  rating: z.number(),
  availableSeats: z.number().int(),
  shortDescription: z.string(),
  description: z.string(),
  img: z.string(),
  date: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
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

// --- Relations / composed schemas ---
// RecommendationEvent with included Event (useful when Prisma include: { event: true })
export const RecommendationEventWithEventSchema =
  RecommendationEventSchema.extend({
    event: EventSchema.optional(),
  });

// Recommendation with its RecommendationEvents (which may include Event)
export const RecommendationWithEventsSchema = RecommendationSchema.extend({
  recommendationEvents: z.array(RecommendationEventWithEventSchema).optional(),
});

// User with relations: sessions, accounts, recommendations (with events), likedEvents
export const UserWithRelationsSchema = UserSchema.extend({
  sessions: z.array(SessionSchema).optional(),
  accounts: z.array(AccountSchema).optional(),
  recommendations: z.array(RecommendationWithEventsSchema).optional(),
  likedEvents: z.array(EventSchema).optional(),
});

// Export TS types
export type User = z.infer<typeof UserSchema>;
export type Session = z.infer<typeof SessionSchema>;
export type Account = z.infer<typeof AccountSchema>;
export type Verification = z.infer<typeof VerificationSchema>;
export type Event = z.infer<typeof EventSchema>;
export type Recommendation = z.infer<typeof RecommendationSchema>;
export type RecommendationEvent = z.infer<typeof RecommendationEventSchema>;
export type RecommendationWithEvents = z.infer<
  typeof RecommendationWithEventsSchema
>;
export type UserWithRelations = z.infer<typeof UserWithRelationsSchema>;

export default {
  UserSchema,
  SessionSchema,
  AccountSchema,
  VerificationSchema,
  EventSchema,
  RecommendationSchema,
  RecommendationEventSchema,
  RecommendationWithEventsSchema,
  UserWithRelationsSchema,
};
