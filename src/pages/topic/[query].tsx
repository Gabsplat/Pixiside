import type { NextPage } from "next";
import { useRouter } from "next/router";

const Topic: NextPage = () => {
  const router = useRouter();
  const { query } = router.query;

  return <h1>{query}</h1>;
};

export default Topic;
