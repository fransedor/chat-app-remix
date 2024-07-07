import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { getSession, destroySession } from "../../utils/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  return redirect("/login", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};

export default function Logout() {
  return (
    <div>
      <h1>Logging out...</h1>
    </div>
  );
}
