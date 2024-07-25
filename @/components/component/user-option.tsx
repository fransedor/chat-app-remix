import { useFetcher } from "@remix-run/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { UserInterface } from "~/repository/models/user";

interface UserOptionProps {
  user: Pick<UserInterface, "id" | "username">;
}

const UserOption = ({ user }: UserOptionProps) => {
  const fetcher = useFetcher();

  const handleCreateRoomWithUser = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("chattedId", user.id);
    fetcher.submit(formData, { method: "post", action: "/room/add" });
  };


  
  return (
    <button className="flex items-center gap-4" key={user.id} onClick={handleCreateRoomWithUser}>
      <Avatar>
        <AvatarImage src="/placeholder-user.jpg" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <div className="grid gap-1">
        <div className="font-medium">{user.username}</div>
      </div>
    </button>
  );
};

export default UserOption;
