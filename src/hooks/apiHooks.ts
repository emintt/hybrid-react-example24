import { useEffect, useState } from "react";
import { fetchData } from "../lib/functions";
import { MediaItem, MediaItemWithOwner, User } from "../types/DBtypes";
import { Credentials } from "../types/Localtypes";
import { LoginResponse, MediaResponse, UploadResponse, UserResponse } from "../types/MessageTypes";

// const useMedia = (): MediaItemWithOwner[] => {  -> type comes automatically
const useMedia = () => {
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

  const postMedia = async (
    file: UploadResponse,
    inputs: Record<string, string>,
    token: string) => {
    // - Create a suitable object for Media API, the type is MediaItem
    //  without media_id, user_id, thumbnail and created_at. All those are generated by
    // the API. (Remember to add app_id from .env.local)
    // - Post the data to Media API and get the data as MediaResponse
    // -Return the data

    const media: Omit<MediaItem, 'media_id' | 'user_id' | 'thumbnail' | 'created_at'> = {
      title: inputs.title,
      description: inputs.description,
      filename: file.data.filename,
      filesize: file.data.filesize,
      media_type: file.data.media_type,
    };

    const options = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(media),
    }

    return await fetchData<MediaResponse>(
      import.meta.env.VITE_MEDIA_API + '/media',
      options
    );
  };

  // palauta valmis objekttina
  return {mediaArray, postMedia};
}

const useUser = () => {
  // implement network connections for auth/user server
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

  const getUsernameAvailable = async (username: string) => {
    const result = await fetchData<{available: boolean}>(
      import.meta.env.VITE_AUTH_API + '/users/username/' + username
    );
    return result;
  };

  const getEmailAvailable = async (email: string) => {
    const result = await fetchData<{available: boolean}>(
      import.meta.env.VITE_AUTH_API + '/users/email/' + email
    );
    return result;
  };

  return {getUserByToken, postUser, getUsernameAvailable, getEmailAvailable};
}

const useAuthentication = () => {
  const postLogin = async (creds: Credentials) => {
    // fetch login response from auth server
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
  }

  return {postLogin};
}

const useFile = () => {
  const postFile = async (file: File, token: string) => {
    // create FormData object
    // add file to FormData
    // upload the file to file server and get the file data
    // return the file data. The type is UploadResponse

    const formData = new FormData();
    formData.append('file', file);
    const options = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: formData,
    }
    return await fetchData<UploadResponse>(import.meta.env.VITE_UPLOAD_SERVER + '/upload', options);
  };

  return {postFile};
};



export {useMedia, useUser, useAuthentication, useFile};
