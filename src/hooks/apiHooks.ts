import { useEffect, useState } from "react";
import { fetchData } from "../lib/functions";
import { MediaItem, MediaItemWithOwner, User } from "../types/DBtypes";

const useMedia = (): MediaItemWithOwner[] => {
  // palauta mediaArray, missä on media tietoa + kukin itemin username
  const [mediaArray, setMediaArray] = useState<MediaItemWithOwner[]>([]);
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

      console.log('mediaArray', itemsWithOwner);
    } catch (error) {
      console.error('get media failed', error);
    }
  }

  // useEffect nay ko phu thuoc vao mediaArray (ko pass mediaArray vao no), no chi cahy 1 lan khi component dc tai. Khi media dc
  useEffect(() => {
    getMedia()
  }, []);

  // palauta valmis objekttina
  return mediaArray;
}

const useUser = () => {
  // TODO: implement network connections for auth/user server
}

export {useMedia, useUser};
