import { useEffect, useState } from "react";
import { fetchData } from "../lib/functions";
import { MediaItem, MediaItemWithOwner, User } from "../types/DBtypes";
import { Credentials } from "../types/Localtypes";
import { LoginResponse, UserResponse } from "../types/MessageTypes";

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
  // tee state user, hae user tietoa
  const getUserByToken = async (token: string) => {
    const options = {
      headers: {
        Authorization: 'Bearer ' + token,
      }
    };
    return await fetchData<UserResponse>(
      import.meta.env.VITE_AUTH_API + '/users/token',
      options
    );
  }

  const postUser = async (user: Record<string, string>) => {
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    };

    await fetchData<UserResponse>(
      import.meta.env.VITE_AUTH_API + '/users',
      options,
    );
  };

  return {getUserByToken, postUser};
}

const useAuthentication = () => {
  const postLogin = async (creds: Credentials) => {
    try {
      // TODO: fetch login response from auth server
      return await fetchData<LoginResponse>(
        import.meta.env.VITE_AUTH_API + '/auth/login',
        {
          method: 'POST',
          body: JSON.stringify(creds),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  }

  return {postLogin};
}

export {useMedia, useUser, useAuthentication};
