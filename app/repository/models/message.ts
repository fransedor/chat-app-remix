export interface Message {
  id: number;
  user_id: string;
  room_id: string;
  text: string;
  media_url: string | null;
  created_at: string;
  username: string;
}

export type AddNewMessageQueryArgs = Omit<Message, "id" | "created_at">;
