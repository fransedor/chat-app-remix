import { query } from "..";
import { AddNewMessageQueryArgs, Message } from "../models/message";

class MessageRepository {
  static async getMessageByRoomId(roomId: string) {
    try {
      // get room
      const res = await query("SELECT * FROM message WHERE room_id = $1", [roomId]);

      return res.rows as Message[];
    } catch (err) {
      console.log(`Error getMessageByRoomId: ${err}`);
      throw new Error("cannot message in chat");
    }
  }

  static async AddNewMessage({
    user_id,
    room_id,
    text,
    media_url,
    username,
  }: AddNewMessageQueryArgs) {
    try {
      await query(
        "INSERT INTO message (user_id, room_id, text, media_url, username) VALUES ($1, $2, $3, $4, $5)",
        [user_id, room_id, text, media_url || "", username]
      );
      return "success";
    } catch (err) {
      console.log("Error AddNewMessage: ", err);
      throw new Error("cannot send message");
    }
  }
}

export default MessageRepository;
