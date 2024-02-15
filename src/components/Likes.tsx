import { useReducer } from "react";
import { Like, MediaItemWithOwner } from "../types/DBtypes";

type LikeState = {
  count: number;
  userLike: Like | null;
};

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

const Likes = ({item}: {item: MediaItemWithOwner}) => {
  const [LikeState, likeDispatch] = useReducer(LikeReducer, likeInitialState);
  return (
    <>
      Likes count: x
      <button
        className=" bg-slate-700 p-2 hover:bg-slate-950"
        onClick={() => {
          console.log('item liked');
          // post like
          likeDispatch({type: 'like', like: 'like result from api'});
        }}
      >
        Like
      </button>
    </>
  );
}

export default Likes;
