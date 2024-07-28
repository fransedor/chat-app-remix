import ChatRepository from "~/repository/chat/chat.repository";

class ChatService {
	static async getChatList(currentUserId: number) {
		try {
      const chatList = await ChatRepository.getChatList(currentUserId.toString());
      return chatList;
    } catch (err) {
      throw new Error((err as Error).message);
    }
	}
}
export default ChatService