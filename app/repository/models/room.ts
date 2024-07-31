export interface Room {
  id: number;
  user_id_1: number;
  user_id_2: number;
}

export interface RoomWithUsernamesQueryResponse {
  id: number;
  user_id_1: number;
  user_id_2: number;
  username_1: string;
  username_2: string;
}
export interface RoomWithUsers {
  id: number;
  users: {
    id: number;
    username: string;
  }[]
}