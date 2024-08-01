export interface Message {
  id: number;
  user_id: number | bigint;
  room_id: number;
  text: string;
  media_url: string | null;
  created_at: string;
  username: string;
}
