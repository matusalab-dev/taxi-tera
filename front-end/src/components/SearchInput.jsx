import { Search } from "lucide-react";
import Input from "./Input";
const SearchInput = () => {
  return (
    <div className="flex items-center w-full">
      <Input />
      <button className="flex items-center py-2 -ml-8 bg-purple">
        <Search color="#40b8a6" className="text-teal-500" />
      </button>
    </div>
  );
};

export default SearchInput;
