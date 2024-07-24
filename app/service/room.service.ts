import { addRoom } from "~/repository/room/addRoom"

class RoomService {
  static async createNewRoom(currentUserId: string, chattedUserId: string) {
    try {
      const roomId = await addRoom(currentUserId, chattedUserId);
      return roomId
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }
}

export default RoomService