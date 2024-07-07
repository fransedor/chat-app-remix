import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { getSession, commitSession } from "../../utils/session.server";
import { createNewUser } from "~/repository/user/createNewUser";
import { getUserByUsername } from "~/repository/user/getUserByUsername";
import bcrypt from "bcrypt";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const session = await getSession(url.searchParams.get("session") || "");
  if (session.has("userId")) {
    return redirect("/");
  }
  return json({});
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");

  if (!password) {
    return json({ error: "Invalid password" }, { status: 400 });
  }

  const hashedPassword = bcrypt.hashSync(password as string, 10);

  if (typeof username !== "string" || typeof password !== "string") {
    return json({ error: "Invalid form data" }, { status: 400 });
  }

  const users = await getUserByUsername(username);

  if (users.length) {
    return json({ error: "Username already exists" }, { status: 400 });
  }

  const userId = await createNewUser(username, hashedPassword);
  const session = await getSession();
  session.set("userId", userId);

  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

export default function Register() {
  const actionData = useActionData<typeof action>();

  return (
    <div>
      <h1>Register</h1>
      <Form method="post">
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" required />
        </div>
        {actionData?.error && <p style={{ color: "red" }}>{actionData.error}</p>}
        <button type="submit">Register</button>
      </Form>
    </div>
  );
}
