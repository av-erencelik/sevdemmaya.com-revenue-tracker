import { Webhook } from "svix";
import { buffer } from "micro";
import db from "../../../db/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextApiRequest, NextApiResponse } from "next";
import { UserWebhook } from "@/types/types";

export const config = {
  api: {
    bodyParser: false,
  },
};

const secret = process.env.WEBHOOK_SECRET;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const payload = (await buffer(req)).toString();
  const headers = req.headers;

  const wh = new Webhook(secret!);
  let msg: UserWebhook;
  try {
    msg = wh.verify(payload, headers as any) as any;
  } catch (err) {
    res.status(400).json({});
    return;
  }
  if (msg.type === "user.created") {
    await db.insert(user).values({
      userId: msg.data.id,
      username: msg.data.username,
      email: msg.data.email_addresses[0].email_address,
    });
  } else if (msg.type === "user.deleted") {
    await db.delete(user).where(eq(user.userId, msg.data.id));
  } else {
    db.update(user).set({ username: msg.data.username }).where(eq(user.userId, msg.data.id));
  }

  res.json({});
}
