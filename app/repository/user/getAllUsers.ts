import { query } from ".."
import { UserInterface } from "../models/user";

type GetAllUsersResult = Pick<UserInterface, "id" | "username">[];
export const getAllUsers = async () => {
  try {
    const res = await query("SELECT id, username FROM USERS");
    return res.rows as GetAllUsersResult;
  }catch(err) {
    console.log("Error getting all user: ", err);
    throw new Error("cannot get all users");
  }
}