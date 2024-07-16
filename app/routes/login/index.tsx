import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { getSession, commitSession } from "../../utils/session.server";
import { getUserByUsername } from "~/repository/user/getUserByUsername";
import bcrypt from "bcrypt";
import { LoginForm } from "@/components/component/login-form";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("cookie"));
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

  if (typeof username !== "string" || typeof password !== "string") {
    return json({ error: "Invalid form data" }, { status: 400 });
  }

  const users = await getUserByUsername(username);

  if (!users.length) {
    return json({ error: "User does not exists" }, { status: 404 });
  }

  const userPassword = users[0].password;

  if (bcrypt.compareSync(password, userPassword)) {
    const session = await getSession();
    session.set("userId", users[0].id);

    return redirect("/", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } else {
    return json({ error: "Invalid user" }, { status: 400 });
  }
};

export default function Login() {
  const actionData = useActionData<typeof action>();
  const error = actionData?.error;
  return (
    <Form method="post">
      <LoginForm error={error} type="Login" />
    </Form>
  );
}
