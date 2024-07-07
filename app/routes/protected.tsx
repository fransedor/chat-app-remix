// Example of a protected route, e.g., `routes/dashboard.tsx`
import { LoaderFunction } from "@remix-run/node";
import { requireUserId } from "../utils/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  await requireUserId(request);
  return null;
};

export default function Dashboard() {
  return <div>Welcome to the dashboard!</div>;
}
