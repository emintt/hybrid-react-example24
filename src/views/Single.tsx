import { NavigateFunction, useLocation, useNavigate } from "react-router-dom";
import { MediaItemWithOwner } from "../types/DBtypes";
import Likes from "../components/Likes";
import Comments from "../components/Comments";

const Single = () => {
  const {state} = useLocation();
  // if (!user) {
  //   handleAutoLogin();
  // }
  const navigate: NavigateFunction = useNavigate();
  console.log('single state', state);
  const item: MediaItemWithOwner = state;
  return (
    <div className=" flex flex-col w-[32rem] p-4">
      <h3>{item.title}</h3>
      {item.media_type.includes('video') ? (
        <video controls src="{item.filename}"></video>
      ) : (
        <img src={item.filename} alt={item.title} />
      )}
      <Likes item={item} />
      <p>{item.description}</p>
      <p>
        Uploaded at: {new Date(item.created_at).toLocaleString('fi-FI')}, by:{' '}
        {item.username}{' '}
      </p>
      <p>{item.filesize}</p>
      <p>{item.media_type}</p>
      <button
        className="m-3 rounded-md bg-slate-700 p-3 self-center"
        onClick={() => {navigate(-1);}}
      >
        go back
      </button>
      <Comments item={item}/>
    </div>
  );
}

export default Single;
