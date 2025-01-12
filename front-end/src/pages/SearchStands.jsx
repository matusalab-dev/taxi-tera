import SearchInput from "../components/SearchInput";
import { useState } from "react";
import SearchAutocomplete from "../components/SearchAutocomplete";
import Button from "../components/Button";

const SearchStands = () => {
  const [searchStands, setSearchStands] = useState([]);
  return (
    <div className="mt-6 space-y-6">
      <SearchInput />
      <SearchAutocomplete />
      <div className="flex items-start gap-2">
        <Button
          as="Link"
          to="/login"
          children="log in"
          color="outline"
          size="outline"
          className="py-0 text-teal-500 bg-white min-w-max"
        />
        <p className="text-sm font-normal">
          and your search history and preferred routes will appear here.
        </p>
      </div>
    </div>
  );
};

export default SearchStands;
