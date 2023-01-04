import Link from "next/link";
import SearchBar from "./SearchBar";

type Props = {};

export default function SearchGroup({}: Props) {
  return (
    <>
      <SearchBar />
      <div className="mt-2">
        <span className="font-regular">Búsquedas populares:</span>
        <div className="flex flex-row gap-2 mt-1">
          <Link href="/">
            <span className="cursor-pointer hover:font-semibold bg-slate-800 text-white rounded-md p-2">
              Arquitectura
            </span>
          </Link>
          <Link href="/">
            <span className="cursor-pointer bg-slate-800 text-white rounded-md p-2">
              Cowork
            </span>
          </Link>
          <Link href="/">
            <span className="cursor-pointer bg-slate-800 text-white rounded-md p-2">
              House
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}
