import { useEffect, useState } from "react";
import { fetchData, makeQuery } from "../lib/functions";
import { MediaItemWithOwner } from "../types/DBtypes";
import { LoginResponse } from "../types/MessageTypes";
import { GraphQLResponse } from "../types/Localtypes";
import { useUpdateContext } from "./contextHooks";

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState<MediaItemWithOwner[]>([]);
  const {update} = useUpdateContext()
  // console.log(mediaArray);
  const getMedia = async () => {
    try {
      const query = `
    query MediaItems {
      mediaItems {
        media_id
        user_id
        owner {
          username
          user_id
        }
        filename
        thumbnail
        filesize
        media_type
        title
        description
        created_at
        comments_count
        average_rating
      }
    }
  `;

    const result =
      await makeQuery<GraphQLResponse<{mediaItems: MediaItemWithOwner[]}>, undefined>(
        query,
    );
    setMediaArray(result.data.mediaItems);
    } catch (error) {
      console.error('getMedia', (error as Error).message);
    }
  }
  useEffect(() => {
    getMedia();
  }, [update]);

  // palauta valmis objekttina
  return {mediaArray};
}

const useUser = () => {
  // TODO: implement network functions for auth server user endpoints
  const getUserByToken = async (token: string) => {
    const options = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return await fetchData<UserResponse>(
      import.meta.env.VITE_AUTH_API + '/users/token/',
      options,
    );
  };

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
    return await fetchData<{available: boolean}>(
      import.meta.env.VITE_AUTH_API + '/users/username/' + username,
    );
  };

  const getEmailAvailable = async (email: string) => {
    return await fetchData<{available: boolean}>(
      import.meta.env.VITE_AUTH_API + '/users/email/' + email,
    );
  };

  const getUserById = async (user_id: number) => {
    return await fetchData<User>(
      import.meta.env.VITE_AUTH_API + '/users/' + user_id,
    );
  };

  return {
    getUserByToken,
    postUser,
    getUsernameAvailable,
    getEmailAvailable,
    getUserById,
  };
};

const useAuthentication = () => {
  const postLogin = async (creds: Record<string, string>) => {
    const query = `
        mutation Login($username: String!, $password: String!) {
          login(username: $username, password: $password) {
            token
            message
            user {
              user_id
              username
              email
              level_name
              created_at
            }
          }
        }
      `;
    const loginResult =  await makeQuery<GraphQLResponse<{login: LoginResponse}>, Credential>(query, creds);
    return loginResult.data.login;
  };

  return {postLogin};
}

const useFile = () => {
  const postFile = async (file: File, token: string) => {
    const formData = new FormData();
    formData.append('file', file);
    const options = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: formData,
    };
    return await fetchData<UploadResponse>(
      import.meta.env.VITE_UPLOAD_SERVER + '/upload',
      options,
    );
  };

  return {postFile};
};

const useLike = () => {
  const postLike = async (media_id: number, token: string) => {
    // Send a POST request to /likes with object { media_id } and the token in the Authorization header.
    const options: RequestInit = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({media_id}),
    };

    return await fetchData<MessageResponse>(
      import.meta.env.VITE_MEDIA_API + '/likes',
      options,
    );
  };

  const deleteLike = async (like_id: number, token: string) => {
    // Send a DELETE request to /likes/:like_id with the token in the Authorization header.
    const options: RequestInit = {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return await fetchData<MessageResponse>(
      import.meta.env.VITE_MEDIA_API + '/likes/' + like_id,
      options,
    );
  };

  const getCountByMediaId = async (media_id: number) => {
    // Send a GET request to /likes/:media_id to get the number of likes.
    return await fetchData<{count: number}>(
      import.meta.env.VITE_MEDIA_API + '/likes/count/' + media_id,
    );
  };

  const getUserLike = async (media_id: number, token: string) => {
    // Send a GET request to /likes/bymedia/user/:media_id to get the user's like on the media.
    const options: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return await fetchData<Like>(
      import.meta.env.VITE_MEDIA_API + '/likes/bymedia/user/' + media_id,
      options,
    );
  };

  return {postLike, deleteLike, getCountByMediaId, getUserLike};
};

const useComment = () => {
  const postComment = async (
    comment_text: string,
    media_id: number,
    token: string,
  ) => {
    // TODO: Send a POST request to /comments with the comment object and the token in the Authorization header.
    const options: RequestInit = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({comment_text, media_id}),
    };

    return await fetchData<MessageResponse>(
      import.meta.env.VITE_MEDIA_API + '/comments',
      options,
    );
  };

  const {getUserById} = useUser();

  const getCommentsByMediaId = async (media_id: number) => {
    // TODO: Send a GET request to /comments/:media_id to get the comments.
    const comments = await fetchData<Comment[]>(
      import.meta.env.VITE_MEDIA_API + '/comments/bymedia/' + media_id,
    );
    // Get usernames for all comments from auth api
    const commentsWithUsername = await Promise.all<
      Comment & {username: string}
    >(
      comments.map(async (comment) => {
        const user = await getUserById(comment.user_id);
        return {...comment, username: user.username};
      }),
    );
    return commentsWithUsername;
  };

  return {postComment, getCommentsByMediaId};
};

export {useMedia, useAuthentication, useUser, useFile, useLike, useComment};
