import type { GetServerSideProps, NextComponentType } from "next";
import Image from "next/image";
import { FC, useEffect, useState } from "react";

const UNSPLASH_API_KEY = "t286ROUJRazXZ82f5i5jVBhBZE8GErofk1Mp50Ydl7o";

interface Props {
  photos: {
    col1: Array<any>;
    col2: Array<any>;
    col3: Array<any>;
  };
}

const imageSizes = {
  regular: 1080,
  small: 400,
  thumb: 200,
};

// Function that takes images width and height and returns the ratio of the image
const getRatio = (width: number, height: number) => {
  return width / height;
};

const getNewHeight = (width: number, height: number, newWidth: number) => {
  let ratio = getRatio(width, height);
  return newWidth / ratio;
};

const SearchImage: React.FunctionComponent<Props> = ({
  photos,
}): JSX.Element => {
  const [searchValue, setSearchValue] = useState("");
  const [images, setImages] = useState<{ col1: any; col2: any; col3: any }>(
    photos
  );
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(2);

  const fetchImagesByName = async (): Promise<void> => {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?client_id=${UNSPLASH_API_KEY}&query=${searchValue}&per_page=30`
    );
    const result = await response.json();
    let arrayLen = result.results.length;
    let imagePositions = {
      col1: {
        start: 0,
        end: Math.floor(arrayLen / 3),
      },
      col2: {
        start: Math.floor(arrayLen / 3),
        end: Math.floor((arrayLen / 3) * 2),
      },
      col3: {
        start: Math.floor((arrayLen / 3) * 2),
        end: arrayLen,
      },
    };
    setImages({
      col1: result.results.slice(
        imagePositions.col1.start,
        imagePositions.col1.end
      ),
      col2: result.results.slice(
        imagePositions.col2.start,
        imagePositions.col2.end
      ),
      col3: result.results.slice(
        imagePositions.col3.start,
        imagePositions.col3.end
      ),
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
      let arrayLen = data.length;
      let imagePositions = {
        col1: {
          start: 0,
          end: Math.floor(arrayLen / 3),
        },
        col2: {
          start: Math.floor(arrayLen / 3),
          end: Math.floor((arrayLen / 3) * 2),
        },
        col3: {
          start: Math.floor((arrayLen / 3) * 2),
          end: arrayLen,
        },
      };
      setImages({
        col1: data.slice(imagePositions.col1.start, imagePositions.col1.end),
        col2: data.slice(imagePositions.col2.start, imagePositions.col2.end),
        col3: data.slice(imagePositions.col3.start, imagePositions.col3.end),
      });
      const newPhotos = {
        col1: [
          ...images.col1,
          ...data.slice(imagePositions.col1.start, imagePositions.col1.end),
        ],
        col2: [
          ...images.col2,
          ...data.slice(imagePositions.col2.start, imagePositions.col2.end),
        ],
        col3: [
          ...images.col3,
          ...data.slice(imagePositions.col3.start, imagePositions.col3.end),
        ],
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
          {images.col1.map((image: any) => {
            console.log(image);
            return (
              <Image
                key={image.id}
                src={image.urls.regular}
                width={imageSizes.regular}
                height={getNewHeight(
                  image.width,
                  image.height,
                  imageSizes.regular
                )}
              />
            );
          })}
        </div>
        <div className="flex flex-col gap-5">
          {images.col2.map((image: any) => (
            <Image
              key={image.id}
              src={image.urls.regular}
              width={imageSizes.regular}
              height={getNewHeight(
                image.width,
                image.height,
                imageSizes.regular
              )}
            />
          ))}
        </div>
        <div className="flex flex-col gap-5">
          <ImageCol images={images.col3} />
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

interface Image {
  key: string;
  src: string;
  width: number;
  height: number;
}

interface Images {
  images: Array<Image>;
}

const ImageCol: FC<Images> = ({ images }) => {
  return (
    <>
      {images.map((image: any) => (
        <Image
          key={image.id}
          src={image.urls.regular}
          width={imageSizes.regular}
          height={getNewHeight(image.width, image.height, imageSizes.regular)}
        />
      ))}
    </>
  );
};

export default SearchImage;
