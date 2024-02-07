import { MediaItem, MediaItemWithOwner, User } from "../types/DBtypes";
import MediaRow from "../components/MediaRow";
import { useEffect, useState } from "react";
import { fetchData } from "../lib/functions";
// import SingleView from "../components/SingleView";

const Home = () => {
  const [mediaArray, setMediaArray] = useState<MediaItem[]>([]);
  // console.log(mediaArray);
  const getMedia = async () => {
    try {
      const MediaIems = await fetchData<MediaItem[]>(import.meta.env.VITE_MEDIA_API + '/media');

      const itemsWithOwner: MediaItemWithOwner[] = await Promise.all(MediaIems.map( async (item) => {
        const owner = await fetchData<User>(import.meta.env.VITE_AUTH_API + '/users/' + item.user_id);
        const itemWithOwner: MediaItemWithOwner = {...item, username: owner.username};
        return itemWithOwner;
      }));
      setMediaArray(itemsWithOwner);

      console.log('mediaArry', itemsWithOwner);
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
            <th>Owner</th>
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
