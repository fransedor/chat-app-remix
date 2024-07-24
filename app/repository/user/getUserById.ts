import { QueryResult } from "pg";
import { query } from "../index";
import { UserInterface } from "../models/user";

export const getUserById = async (userId: string) => {
  try {
    const res = (await query("SELECT id, username FROM users WHERE id=$1", [
      userId,
    ])) as QueryResult<Omit<UserInterface, "created_at">>;

    return res.rows;
  } catch (err) {
    console.log(`Error getUserById: ${err}`);
    return [];
  }
};
