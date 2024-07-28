import { query } from "..";

class ChatRepository {
	static async getChatList(user_id_1: string) {
		try {
			// get room
			const res = await query(
				"SELECT r.user_id_1, u1.username AS username_1, r.user_id_2, u2.username AS username_2, m.text AS last_message, m.created_at AS last_message_timestamp FROM room r JOIN users u1 ON r.user_id_1 = u1.id JOIN users u2 ON r.user_id_2 = u2.id LEFT JOIN message m ON r.id = m.room_id WHERE (r.user_id_1 = $1 OR r.user_id_2 = $1) AND m.created_at = (SELECT MAX(created_at) FROM message WHERE room_id = r.id) ORDER BY m.created_at DESC;",
				[user_id_1]
			);
			
			return res.rows;
		} catch (err) {
			console.log(`Error getChatList: ${err}`);
			throw new Error("cannot get chat list");
		}
	}
}

export default ChatRepository