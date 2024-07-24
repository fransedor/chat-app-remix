import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { UserInterface } from "~/repository/models/user";

interface UserOptionProps {
  user: Pick<UserInterface, "id" | "username">;
}
const UserOption = ({ user }: UserOptionProps) => {
  return (
    <div className="grid grid-cols-[auto_1fr] items-center gap-4" key={user.id}>
      <Avatar>
        <AvatarImage src="/placeholder-user.jpg" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <div className="grid gap-1">
        <div className="font-medium">{user.username}</div>
      </div>
    </div>
  );
};

export default UserOption;
