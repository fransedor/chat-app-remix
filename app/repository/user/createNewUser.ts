import { query } from "../index";

export const createNewUser = async (username: string, hashedPassword: string) => {
  try {
    const res = await query(
      "INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING id",
      [username, hashedPassword, "public"]
    );
    const id = res.rows[0].id as number;
    return id;
  } catch (err) {
    console.log(`Error createNewUser: ${err}`);
    throw new Error("cannot create user");
  }
};
