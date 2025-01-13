const SearchAutocomplete = ({ address }) => {
  return (
    <div className="w-full px-5 py-3 text-base font-light text-black bg-gray-300">
      <ul className="flex flex-col w-full gap-2 space-y-3">
        {address?.map((address) => {
          const { properties } = address;
          return <li>{properties.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default SearchAutocomplete;
