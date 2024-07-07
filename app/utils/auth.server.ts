// Create `utils/auth.server.ts`
import { redirect } from "@remix-run/node";
import { getSession } from "./session.server";

export async function requireUserId(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");

  if (!userId) {
    throw redirect("/login");
  }

  return userId;
}
