import type { GetServerSideProps, NextComponentType } from "next";
import { useEffect, useState } from "react";

const UNSPLASH_API_KEY = "t286ROUJRazXZ82f5i5jVBhBZE8GErofk1Mp50Ydl7o";

interface Props {
  photos: {
    col1: Array<any>;
    col2: Array<any>;
    col3: Array<any>;
  };
}

const SearchImage: React.FunctionComponent<Props> = ({
  photos,
}): JSX.Element => {
  const [searchValue, setSearchValue] = useState("");
  const [images, setImages] = useState<{ col1: any; col2: any; col3: any }>(
    photos
  );
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(2);

  useEffect(() => {
    console.log("Server side Editorial Photos: ", photos);
  }, []);

  const fetchImagesByName = async (): Promise<void> => {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?client_id=${UNSPLASH_API_KEY}&query=${searchValue}&per_page=30`
    );
    const result = await response.json();
    // CAMBIAR DE LOS RANGOS A:
    //  DESDE 0 A 1/3 DEL TOTAL DEL ARREGLO
    //  DESDE 1/3 A 2/3 DEL TOTAL DEL ARREGLO
    //  DESDE 2/3 A FINAL DEL ARREGLO
    setImages({
      col1: result.results.slice(0, 10),
      col2: result.results.slice(10, 20),
      col3: result.results.slice(20, 30),
    });
  };

  const fetchPopularImagesByPage = async (pageNumber: number): Promise<any> => {
    const response = await fetch(
      `https://api.unsplash.com/photos?page=${pageNumber}&order_by=popular&per_page=30&client_id=${UNSPLASH_API_KEY}`
    );
    const result = await response.json();
    return result;
  };

  const pushPopularImages = (): void => {
    fetchPopularImagesByPage(currentPageNumber).then((data) => {
      console.log("DATA: ", data);
      const newPhotos = {
        col1: [...images.col1, ...data.slice(0, 10)],
        col2: [...images.col2, ...data.slice(10, 20)],
        col3: [...images.col3, ...data.slice(20, 30)],
      };
      setImages(newPhotos);
    });
    setCurrentPageNumber(currentPageNumber + 1);
  };

  const changeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearchValue(inputValue);
  };

  const buttonClick = (e: React.FormEvent) => {
    e.preventDefault();
    fetchImagesByName();
  };

  return (
    <section className="max-w-[80%] m-auto">
      <form onSubmit={buttonClick}>
        <label>
          Image name:
          <input type="text" value={searchValue} onChange={changeSearchValue} />
        </label>
        <button>Search</button>
      </form>
      <section className="grid grid-cols-3 gap-10">
        <div className="flex flex-col gap-5">
          {images.col1.map((image: any) => (
            <img className="w-full" src={image.urls?.regular} />
          ))}
        </div>
        <div className="flex flex-col gap-5">
          {images.col2.map((image: any) => (
            <img className="w-full" src={image.urls?.regular} />
          ))}
        </div>
        <div className="flex flex-col gap-5">
          {images.col3.map((image: any) => (
            <img className="w-full" src={image.urls?.regular} />
          ))}
        </div>
      </section>
      <button
        onClick={() => {
          pushPopularImages();
        }}
      >
        Search more
      </button>
    </section>
  );
};

export default SearchImage;
