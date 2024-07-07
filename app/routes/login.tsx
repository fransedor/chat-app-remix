import { ActionFunctionArgs, json, LoaderFunction, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { commitSession, getSession } from "~/utils/session.server";

// Mock user data
const mockUser = {
  username: "admin",
  password: "password",
};

// Loader function to redirect authenticated users
export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const session = await getSession(url.searchParams.get("session") || "");
  if (session.has("userId")) {
    return redirect("/");
  }
  return json({});
};

// Action function to handle form submission
export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");

  if (typeof username !== "string" || typeof password !== "string") {
    return json({ error: "Invalid form data" }, { status: 400 });
  }

  if (username === mockUser.username && password === mockUser.password) {
    const session = await getSession();
    session.set("userId", username);
    return redirect("/", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } else {
    return json({ error: "Invalid username or password" }, { status: 401 });
  }
};

// Login component
export default function Login() {
  const actionData = useActionData<typeof action>();

  return (
    <div>
      <h1>Login</h1>
      <Form method="post">
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>
        {actionData?.error && <p style={{ color: "red" }}>{actionData.error}</p>}
        <button type="submit">Login</button>
      </Form>
    </div>
  );
}
