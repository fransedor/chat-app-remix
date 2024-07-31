import { RoomWithUsers } from "~/repository/models/room";
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

  static async getUsernamesByRoomId(roomId: string) {
    try {
      const usernames = await RoomRepository.getUsernamesByRoomId(roomId.toString());
      const roomWithUsernames = usernames[0];
      return {
        id: roomWithUsernames.id,
        users: [
          {
            id: roomWithUsernames.user_id_1,
            username: roomWithUsernames.username_1
          },
          {
            id: roomWithUsernames.user_id_2,
            username: roomWithUsernames.username_2
          },
        ]
      } as RoomWithUsers;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }
}

export default RoomService