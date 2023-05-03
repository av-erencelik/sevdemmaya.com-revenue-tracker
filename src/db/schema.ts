import { mysqlTable, varchar, uniqueIndex, timestamp, index, serial } from "drizzle-orm/mysql-core";

export const user = mysqlTable(
  "user",
  {
    id: serial("id").primaryKey().notNull(),
    userId: varchar("user_id", { length: 36 }).notNull(),
    username: varchar("username", { length: 191 }).notNull(),
    email: varchar("email", { length: 191 }).notNull(),
  },
  (user) => ({
    emailIndex: uniqueIndex("users__email__idx").on(user.email),
  })
);
export const post = mysqlTable(
  "post",
  {
    id: serial("id").primaryKey().notNull(),
    userId: varchar("user_id", { length: 36 }).notNull(),
    slug: varchar("slug", { length: 191 }).notNull(),
    text: varchar("title", { length: 191 }).notNull(),
    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
  },
  (post) => ({
    userIdIndex: index("posts__user_id__idx").on(post.userId),
    postSlugIndex: uniqueIndex("posts__slug__idx").on(post.slug, post.userId),
  })
);
