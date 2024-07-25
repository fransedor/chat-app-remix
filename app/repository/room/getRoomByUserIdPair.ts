import { query } from "../index";

export const getRoomByUserIdPair = async (userId1: string, userId2: string) => {
  try {
    const roomIdResponse = await query(
      "SELECT id FROM room WHERE user_id_1 = $1 AND user_id_2 = $2",
      [userId1, userId2]
    )
    // Room does not exist
    if (roomIdResponse.rowCount === 0) {
      return 0
    }
    return roomIdResponse.rows[0].id;
  } catch (err) {
    console.log(`Error getRoomByUserIdPair: ${err}`);
    throw new Error("cannot get room by user id pair");
  }
};
