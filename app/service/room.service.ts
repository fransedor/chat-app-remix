import RoomRepository from "~/repository/room/room.repository";

class RoomService {
  static async createNewRoom(currentUserId: string, chattedUserId: string) {
    try {
      const existingRoomId = await RoomRepository.getRoomByUserIdPair(currentUserId, chattedUserId);
      if (existingRoomId !== 0) {
        return existingRoomId
      }
      const roomId = await RoomRepository.addRoom(currentUserId, chattedUserId);
      return roomId
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }
}

export default RoomService