import Image from "next/image";
import Link from "next/link";
import React from "react";

const SongItem = ({ data }) => {
  console.log(data);
  return (
    <>
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://www.youtube.com/watch?v=${data.id.videoId}`}>
        <div className="w-full">
          <div className="thumbnail relative w-full h-52 [clip-path:inset(13%_0_13%_0)]">
            <Image
              layout="fill"
              src={data.snippet.thumbnails.high.url}
              alt={data.snippet.title}
            />
          </div>
        </div>
      </a>
    </>
  );
};

export default SongItem;
