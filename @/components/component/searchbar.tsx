import { Input } from "../ui/input";
import { Button } from "../ui/button";
import SearchIcon from "../icons/Search";

const Searchbar = () => {
  return (
    <div className="flex items-center gap-2 p-4 h-[77px] w-full">
      <Input
        type="search"
        placeholder="Search users..."
        className="w-full rounded-lg bg-muted px-4 py-2 text-sm"
      />
      <Button variant="ghost" size="icon" className="rounded-full">
        <SearchIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Searchbar;
