import { promises as fs } from "fs";
import path from "path";

const USERS_FILE = path.resolve("data/auth.json");

export default defineEventHandler(async (event) => {
  const body = await readBody<{ email: string; password: string }>(event);

  try {
    await fs.access(USERS_FILE);
  } catch {
    await fs.writeFile(USERS_FILE, "[]");
  }

  const users: any[] = JSON.parse(await fs.readFile(USERS_FILE, "utf-8"));

  const user = users.find(
    (u) => u.email === body.email && u.password === body.password
  );

  if (!user) {
    throw createError({ statusCode: 401, message: "Invalid credentials" });
  }

  return { id: user.id, name: user.name, email: user.email };
});
