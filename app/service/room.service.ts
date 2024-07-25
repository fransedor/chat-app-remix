import { addRoom } from "~/repository/room/addRoom"
import { getRoomByUserIdPair } from "~/repository/room/getRoomByUserIdPair";

class RoomService {
  static async createNewRoom(currentUserId: string, chattedUserId: string) {
    try {
      const existingRoomId = await getRoomByUserIdPair(currentUserId, chattedUserId);
      if (existingRoomId !== 0) {
        return existingRoomId
      }
      const roomId = await addRoom(currentUserId, chattedUserId);
      return roomId
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }
}

export default RoomService