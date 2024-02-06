import { MediaItem } from "../types/DBtypes";
import MediaRow from "../components/MediaRow";
import { useEffect, useState } from "react";
import { fetchData } from "../lib/functions";
// import SingleView from "../components/SingleView";

const Home = () => {
  const [mediaArray, setMediaArray] = useState<MediaItem[]>([]);
  // console.log(mediaArray);
  const getMedia = async () => {
    try {
      const data = await fetchData<MediaItem[]>('data.json');
      setMediaArray(data);
    } catch (error) {
      console.error('get media failed', error);
    }

  }
  // useEffect nay ko phu thuoc vao mediaArray (ko pass mediaArray vao no), no chi cahy 1 lan khi component dc tai. Khi media dc
  useEffect(() => {getMedia()}, []);
  return (
    <>
      {/* {selectedItem && <SingleView item={selectedItem} setSelectedItem={setSelectedItem}/>} */}
      <h2>My Media</h2>
      <table>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Description</th>
            <th>Created</th>
            <th>Size</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {mediaArray.map((item) => (
            <MediaRow
              key={item.media_id}
              item={item}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Home;
