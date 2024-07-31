import MessageRepository from "~/repository/message/message.repository";

class MessageService {
  static async getMessageOfRoom (roomId: string) {
    try {
      const messageList = await MessageRepository.getMessageByRoomId(roomId);
      return messageList;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }
}
export default MessageService