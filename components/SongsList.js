import axios from "axios";
import { useState, useEffect } from "react";
import SongItem from "./SongItem";
const SongList = ({ search }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [songsList, setSongsList] = useState([]);
  useEffect(() => {
    (async () => {
      const songs = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&videoDuration=short&maxResults=9&order=relevance&q=${search}%songs%openings&type=video&key=AIzaSyAVMGaMqw5nb95CYgveNlVWaAVcveWnPIg`
      );
      setSongsList(songs.data.items);
      setIsLoading(true);
    })();
  }, []);
  if (!isLoading) return <div className="w-full h-full">Loading</div>;
  return (
    <>
      <div className="w-full grid grid-cols-3 gap-x-3 gap-y-0 mt-5">
        {songsList.map((song, i) => (
          <SongItem key={i} data={song} />
        ))}
      </div>
    </>
  );
};
export default SongList;
