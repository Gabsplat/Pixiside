import type { GetServerSideProps, NextComponentType, NextPage } from "next";
import Head from "next/head";
import Navbar from "../components/Navbar";
import ImageContainer from "../components/images/ImageContainer";
import PopoverBar from "../components/search/PopoverBar";
import SearchBar from "../components/search/SearchBar";
import SearchGroup from "../components/search/SearchGroup";
import Container from "../components/utility/Container";
import SearchImage from "../page-components/SearchImage";
import styles from "../styles/Home.module.css";

interface props {
  fetchedImages: {
    images: Array<any>;
    fetchUrl: {
      url: string;
      page: number;
    };
  };
}

const Home: NextPage<props> = ({ fetchedImages }) => {
  return (
    <>
      <Head>
        <title>Pixiside</title>
        <meta name="description" content="Next Image!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="">
        <Container>
          <Navbar />
        </Container>
        <div className="bg-blue-200 py-10">
          <Container>
            <SearchGroup />
            {/* <PopoverBar /> */}
          </Container>
        </div>
        <Container>
          <ImageContainer initialImages={fetchedImages} />
        </Container>
        {/* <SearchImage photos={editorialPhotos} /> */}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const response = await fetch(
    `https://api.unsplash.com/photos?order_by=popular&per_page=15&client_id=${process.env.UNSPLASH_API_KEY}&page=1`
  );
  const fetchedImages = await response.json();

  return {
    props: {
      fetchedImages: {
        images: fetchedImages,
        fetchUrl: {
          url: `https://api.unsplash.com/photos?order_by=popular&per_page=15&client_id=${process.env.UNSPLASH_API_KEY}`,
          page: 1,
        },
      },
    },
  };
};

export default Home;
