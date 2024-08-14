import { getSession } from "./session.server";

export const getUserFromSession = async (request: Request) => {
  const session = await getSession(request.headers.get("cookie"));
  if (session.has("userId")) {
    return {
      userId: session.get("userId"),
      username: session.get("username"),
    };
  }
  return {
    userId: 0,
    username: "",
  };
};
