import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  initialImages: {
    images: Array<any>;
    fetchUrl: {
      url: string;
      page: number;
    };
  };
};

interface OrderedImages {
  col1: Array<any>;
  col2: Array<any>;
  col3: Array<any>;
}

export default function ImageContainer({ initialImages }: Props) {
  const [fetchedImages, setFetchedImages] = useState(initialImages);
  const [orderedImages, setOrderedImages] = useState<OrderedImages | undefined>(
    undefined
  );

  const divideImages = (images: Array<any>) => {
    const col1: Array<any> = [];
    const col2: Array<any> = [];
    const col3: Array<any> = [];

    images.forEach((image: any, index: number) => {
      if (index % 3 === 0) {
        col1.push(image);
      } else if (index % 3 === 1) {
        col2.push(image);
      } else {
        col3.push(image);
      }
    });

    return {
      col1,
      col2,
      col3,
    };
  };

  const addNextPageImages = async () => {
    const newPage = fetchedImages.fetchUrl.page + 1;
    const newUrl = fetchedImages.fetchUrl.url + `&page=${newPage}`;

    const newFetchedImages = await fetch(newUrl);
    const newImages = await newFetchedImages.json();

    console.log("new images:", newImages);
    // divide newImages by 3 and add to orderedImages
    const { col1, col2, col3 } = divideImages(newImages);

    setOrderedImages({
      col1: [...orderedImages!.col1, ...col1],
      col2: [...orderedImages!.col2, ...col2],
      col3: [...orderedImages!.col3, ...col3],
    });

    setFetchedImages({
      images: [...fetchedImages.images, ...newImages],
      fetchUrl: {
        url: newUrl,
        page: newPage,
      },
    });
  };

  useEffect(() => {
    const { col1, col2, col3 } = divideImages(fetchedImages.images);

    setOrderedImages({
      col1,
      col2,
      col3,
    });
  }, [fetchedImages]);

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-10">
      <div className="flex flex-col gap-5">
        {orderedImages && <ImageCol images={orderedImages.col1} />}
      </div>
      <div className="flex flex-col gap-5">
        {orderedImages && <ImageCol images={orderedImages.col2} />}
      </div>
      <div className="flex flex-col gap-5">
        {orderedImages && <ImageCol images={orderedImages.col3} />}
      </div>
      <div>
        <button
          onClick={() => {
            addNextPageImages();
          }}
        >
          Search more
        </button>
      </div>
    </section>
  );
}

interface Image {
  key: string;
  src: string;
  width: number;
  height: number;
}

interface Images {
  images: Array<Image>;
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

const ImageCol = ({ images }: Images) => {
  return (
    <>
      {images.map((image: any, index: number) => {
        return (
          <img
            src={image.urls.regular}
            width={imageSizes.regular}
            height={getNewHeight(image.width, image.height, imageSizes.regular)}
          />
        );
      })}
    </>
  );
};
