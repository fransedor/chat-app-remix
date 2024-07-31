import { query } from "..";
import { Message } from "../models/message";

class MessageRepository {
	static async getMessageByRoomId(roomId: string) {
		try {
			// get room
			const res = await query(
				"SELECT * FROM message WHERE room_id = $1",
				[roomId]
			);
			
			return res.rows as Message[];
		} catch (err) {
			console.log(`Error getMessageByRoomId: ${err}`);
			throw new Error("cannot message in chat");
		}
	}

  
}

export default MessageRepository