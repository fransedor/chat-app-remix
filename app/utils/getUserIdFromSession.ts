import { getSession } from "./session.server";

export const getUserIdFromSession = async (request: Request) => {
  const session = await getSession(request.headers.get("cookie"));
  if (session.has("userId")) {
    return session.get("userId");
  }
  return 0
}