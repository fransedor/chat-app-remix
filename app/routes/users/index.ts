import { json } from "@remix-run/node";
import { getAllUsers } from "~/repository/user/getAllUsers";

export async function loader() {
  try {
    throw new Error("error");
    const users = await getAllUsers();
    return json({
      data: users,
    });
  } catch(err) {
    return json({
      data: null
    })
    throw new Error("error");
  }
}
