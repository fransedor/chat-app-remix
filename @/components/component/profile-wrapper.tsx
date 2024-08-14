import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import LogoutIcon from "../icons/Logout";
import { Link } from "@remix-run/react";

interface ProfileWrapperProps {
  username: string;
}
const ProfileWrapper = ({ username }: ProfileWrapperProps) => {
  return (
    <div className="py-2 px-4 border-t flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <Avatar className="h-10 w-10 border">
          <AvatarImage src="/placeholder-user.jpg" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>{username}</div>
      </div>
      <Link to={"/logout"}>
        <LogoutIcon height="24px" width="24px" />
      </Link>
    </div>
  );
};

export default ProfileWrapper;
