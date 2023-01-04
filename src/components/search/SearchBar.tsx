import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

const SearchBar = () => {
  return (
    <form className="">
      <div className="relative">
        <input
          placeholder="Busca fotos gratis"
          className="w-full rounded-md h-10 p-4 outline-none bg-light-gray text-white"
          type="text"
        />
        <MagnifyingGlassIcon className="absolute top-2.5 right-3 w-5 h-5" />
      </div>
    </form>
  );
};

export default SearchBar;
