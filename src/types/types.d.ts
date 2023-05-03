import { z } from "zod";
import { postSchema, signInSchema, signUpSchema } from "./schemas";

export type SignUpFormData = z.infer<typeof signUpSchema>;
export type SignInFormData = z.infer<typeof signInSchema>;
export type PostData = z.infer<typeof postSchema>;

export type UserWebhook = {
  type: "user.created" | "user.deleted" | "user.updated";
  data: {
    id: string;
    username: string;
    email_addresses: {
      email_address: string;
    }[];
  };
};
