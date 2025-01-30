import SearchInput from "../components/SearchInput";
import SearchAutocomplete from "../components/SearchAutocomplete";
import Button from "../components/Button";
import { useState } from "react";
import { useSearchLocation } from "../api/queries/location-queries";
const SearchStands = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: address = {} } = useSearchLocation(searchQuery);
  const { features } = address;
  // console.log("address", address);
  return (
    <div className="mt-6">
      <SearchInput
        searchQuery={searchQuery}
        setSearchQuery={(e) => setSearchQuery(e.target.value)}
      />
      {searchQuery && <SearchAutocomplete address={features} />}
      <div className="flex items-start gap-2 mt-6">
        <Button
          as="Link"
          to="/login"
          children="log in"
          color="outline"
          size="outline"
          className="py-0 text-teal-500 bg-white min-w-max"
        />
        <p className="text-sm font-light">
          and your search history and preferred routes will appear here.
        </p>
      </div>
    </div>
  );
};

export default SearchStands;
