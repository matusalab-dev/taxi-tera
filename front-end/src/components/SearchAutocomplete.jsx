import Button from "./Button";

const SearchAutocomplete = ({ address }) => {
  return (
    <div className="w-full px-5 py-3 text-base font-light text-black bg-gray-100">
      <ul className="flex flex-col w-full gap-2 space-y-3 overflow-y-scroll">
        {address?.map((address) => {
          const { properties } = address;
          const { id, name } = properties;
          const formattedId = id.replace("node/", "");
          console.log("id: " + id, formattedId);
          return (
            <li key={id}>
              <Button
                as="Link"
                to={`/search/${formattedId}`}
                color="outline"
                className="!text-black !w-full inline-block"
                children={name}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SearchAutocomplete;
