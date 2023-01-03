import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

const SearchBar = () => {
  return (
    <form className="">
      <div className="relative">
        <input
          placeholder="Busca algo..."
          className="w-full rounded-tl-md rounded-tr-md h-10 p-4"
          type="text"
        />
        <MagnifyingGlassIcon className="absolute top-2.5 right-2 w-5 h-5" />
      </div>
    </form>
  );
};

export default SearchBar;
