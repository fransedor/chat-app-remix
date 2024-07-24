import { json } from "@remix-run/node";
import { getAllUsers } from "~/repository/user/getAllUsers";

export async function loader() {
  try {
    const users = await getAllUsers();
    return json({
      data: users,
      error: null,
      status: 200
    });
  } catch (err) {
    return json(
      {
        data: null,
        error: (err as Error).message,
        status: 500
      },
      { status: 500 }
    );
  }
}
