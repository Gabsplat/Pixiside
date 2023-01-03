import type { NextPage } from "next";
import { useRouter } from "next/router";

const Search: NextPage = () => {
  const router = useRouter();
  const { query } = router.query;

  return <h1 className="text-blue-500">{query}</h1>;
};

export default Search;
