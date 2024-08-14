import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { getSession, commitSession } from "../../utils/session.server";
import { createNewUser } from "~/repository/user/createNewUser";
import { getUserByUsername } from "~/repository/user/getUserByUsername";
import bcrypt from "bcrypt";
import { LoginForm } from "@/components/component/login-form";

export const loader: LoaderFunction = async () => {
  return null
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
  session.set("username", username);

  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

export default function Register() {
  const actionData = useActionData<typeof action>();
  const error = actionData?.error;
  return (
    <Form method="post">
      <LoginForm error={error} type="Register" />
    </Form>
  );
}
