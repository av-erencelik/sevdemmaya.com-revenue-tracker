import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";
import { post } from "@/db/schema";
export const signUpSchema = z
  .object({
    username: z
      .string()
      .min(4, "Username must be at least 4 characters")
      .max(20, "Username must be at most 20 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  })
  .required();
export const signInSchema = z
  .object({
    identifier: z
      .string()
      .min(4, "Username must be at least 4 characters")
      .max(20, "Username must be at most 20 characters")
      .regex(/^[a-zA-Z0-9_]+$/, "Enter a valid username or email address")
      .or(z.string().email("Invalid email address")),
    password: z.string().min(6, "Password must be at least 6 characters"),
  })
  .required();
export const postSchema = z
  .object({
    text: z
      .string()
      .min(1, "Text is required")
      .max(191, "Max 191 characters")
      .regex(
        new RegExp!(
          /^(?:(?!\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]|\uD83E[\uDD10-\uDDFF]|[\u2600-\u27BF]|\uD83E[\uDDF0-\uDDFF]).)*$/
        ),
        "No emojis allowed"
      ),
  })
  .required();

export const insertPostSchema = createInsertSchema(post, {
  text: z
    .string()
    .max(191, "Max 191 characters")
    .regex(
      new RegExp!(
        /^(?:(?!\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]|\uD83E[\uDD10-\uDDFF]|[\u2600-\u27BF]|\uD83E[\uDDF0-\uDDFF]).)*$/
      ),
      "No emojis allowed"
    ),
});
