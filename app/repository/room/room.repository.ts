import { query } from "..";

class RoomRepository {
  static async addRoom(userId1: string, userId2: string) {
    try {
      const roomIdResponse = await query(
        "INSERT INTO room (user_id_1, user_id_2) VALUES ($1, $2) RETURNING id",
        [userId1, userId2]
      );
      const id = roomIdResponse.rows[0].id as number;
      return id;
    } catch (err) {
      console.log(`Error addRoom: ${err}`);
      throw new Error("cannot create room");
    }
  }

  static async getRoomByUserIdPair(userId1: string, userId2: string) {
    try {
      const roomIdResponse = await query(
        "SELECT id FROM room WHERE (user_id_1 = $1 AND user_id_2 = $2) OR (user_id_2 = $1 AND user_id_1 = $2)",
        [userId1, userId2]
      );
      // Room does not exist
      if (roomIdResponse.rowCount === 0) {
        return 0;
      }
      return roomIdResponse.rows[0].id;
    } catch (err) {
      console.log(`Error getRoomByUserIdPair: ${err}`);
      throw new Error("cannot get room by user id pair");
    }
  }
}

export default RoomRepository;
