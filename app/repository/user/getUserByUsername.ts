import { QueryResult } from "pg";
import { query } from "../index";
import { UserInterface } from "../models/user";

export const getUserByUsername = async (username: string) => {
  try {
    const res = (await query("SELECT password, role FROM users WHERE username=$1", [
      username,
    ])) as QueryResult<Omit<UserInterface, "created_at">>;

    return res.rows;
  } catch (err) {
    console.log(`Error getUserByUsername: ${err}`);
    return [];
  }
};
