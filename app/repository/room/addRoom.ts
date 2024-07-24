import { query } from "../index";

export const addRoom = async (userId1: string, userId2: string) => {
  try {
    const roomIdResponse = await query(
      "INSERT INTO rooms (user_id_1, user_id_2) VALUES ($1, $2) RETURNING id",
      [userId1, userId2]
    )
    const id = roomIdResponse.rows[0].id as number;
    return id;
  } catch (err) {
    console.log(`Error addRoom: ${err}`);
    throw new Error("cannot create room");
  }
};
