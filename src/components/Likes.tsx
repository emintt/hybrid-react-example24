import { useEffect, useReducer } from "react";
import { Like, MediaItemWithOwner } from "../types/DBtypes";
import { useLike } from "../hooks/apiHooks";

//  count: number of likes
// userLike: user's like, null if user hasn't liked
type LikeState = {
  count: number;
  userLike: Like | null;
};

// setLikeCount: set total likes on that media???
type LikeAction = {
  type: 'setLikeCount' | 'like';
  like?: Like | null;
  count?: number;
};

const likeInitialState: LikeState = {
  count: 0,
  userLike: null,
};
const LikeReducer = (state: LikeState, action: LikeAction): LikeState => {
  console.log('like reducer: ', state, action);
  switch (action.type) {
    case 'setLikeCount':
      return {...state, count: action.count ?? 0};
    case 'like':
      if (action.like !== undefined) {
        return {...state, userLike: action.like};
      }
      return state; // no change if action.like is undefined
    default:
      return state; // Return the unchanged state if the action type is not recognized
  }
}

const Likes = ({item}: {item: MediaItemWithOwner | null}) => {
  const [likeState, likeDispatch] = useReducer(LikeReducer, likeInitialState);
  const {postLike, deleteLike, getCountByMediaId, getUserLike} = useLike();
  // get user like
  const getLikes = async () => {
    const token = localStorage.getItem('token');
    if (!item || !token) {
      return;
    }
    try {
      const userLike = await getUserLike(item.media_id, token);
      console.log('get user like', userLike);
      likeDispatch({type: 'like', like: userLike});
    } catch (e) {
      likeDispatch({type: 'like', like: null});
      console.log('get user like error', (e as Error).message);
    }
  };

  // get like count
  const getLikeCount = async () => {
    // get like count and dispatch it to the state
    if (!item) {
      return;
    }
    try {
      const countResponse = await getCountByMediaId(item.media_id);
      likeDispatch({type: 'setLikeCount', count: countResponse.count});
    } catch (e) {
      likeDispatch({type: 'setLikeCount', count: 0});
      console.log('get user like error', (e as Error).message);
    }


  };

  // dung useEffect de render so luot likes ban dau
  useEffect(() => {
    getLikes();
    getLikeCount();
  }, [item]);

  const handleLike = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!item || !token) {
        return;
      }
      // If user has liked the media, delete the like. Otherwise, post the like.
      if (likeState.userLike) {
        // delete the like and dispatch the new like count to the state.
        await deleteLike(likeState.userLike.like_id, token);
        likeDispatch({type: 'setLikeCount', count: likeState.count - 1});
        likeDispatch({type: 'like', like: null});
      } else {
        // post the like and dispatch the new like count to the state. Dispatching is already done in the getLikes and getLikeCount functions.
        await postLike(item.media_id, token);
        getLikes();
        getLikeCount();
      }
    } catch (e) {
      console.log('like error', (e as Error).message);
    }

    console.log('like State', likeState);
  };

  return (
    <>
      Likes count: {likeState.count}
      <button
        className=" bg-slate-700 p-2 hover:bg-slate-950"
        onClick={handleLike}
      >
        {likeState.userLike ? 'Unlike' : 'Like'}
      </button>
    </>
  );
}

export default Likes;
