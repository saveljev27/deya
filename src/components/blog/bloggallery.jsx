import { useState, useEffect } from 'react';
import getConfig from 'next/config';

import PhotoAlbum from 'react-photo-album';
import Lightbox from 'yet-another-react-lightbox';

const { publicRuntimeConfig } = getConfig();
const { baseApiUrl } = publicRuntimeConfig?.api;

export default function BlogGallery({ data }) {
  const [index, setIndex] = useState(-1);
  const [othersPhotos, setOthersPhotos] = useState([]);
  const mainPhoto = [
    {
      src: `${baseApiUrl}/assets/${data?.img?.id}`,
      width: data?.img?.width,
      height: data?.img?.height,
    },
  ];

  useEffect(() => {
    const fetchedPhotos = data.imgs
      .filter((img) => img?.directus_files_id?.id)
      .map((img) => {
        console.log(img?.directus_files_id?.width, img?.directus_files_id?.height);
        
        return ({
          src: `${baseApiUrl}/assets/${img?.directus_files_id?.id}`,
          width: img?.directus_files_id?.width,
          height: img?.directus_files_id?.height,
        })
      });
    setOthersPhotos(fetchedPhotos);

  }, [data?.id]);

  const photos = [...mainPhoto, ...othersPhotos]
    .filter((img) => (img?.height && img?.width));

  return (
    <>
      <PhotoAlbum
        layout="columns"
        photos={photos}
        targetRowHeight={150}
        onClick={({ index: current }) => setIndex(current)}
      />

      <Lightbox
        index={index}
        slides={photos}
        open={index >= 0}
        close={() => setIndex(-1)}
      />
    </>
  );
}
