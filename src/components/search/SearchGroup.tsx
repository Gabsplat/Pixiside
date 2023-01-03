import Link from "next/link";
import SearchBar from "./SearchBar";

type Props = {};

export default function SearchGroup({}: Props) {
  return (
    <>
      <SearchBar />
      <div className="py-3 px-4 rounded-bl-md rounded-br-md bg-gray-100">
        <span className="text-black font-500">
          O busca por alguna búsqueda popular:
        </span>
        <div className="flex flex-row gap-2 mt-2">
          <Link href="/">
            <span className="bg-slate-800 text-white rounded-md p-2">Casa</span>
          </Link>
          <Link href="/">
            <span className="bg-slate-800 text-white rounded-md p-2">Casa</span>
          </Link>
          <Link href="/">
            <span className="bg-slate-800 text-white rounded-md p-2">Casa</span>
          </Link>
        </div>
      </div>
    </>
  );
}
