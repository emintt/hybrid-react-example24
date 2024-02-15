import { NavigateFunction, useLocation, useNavigate } from "react-router-dom";
import { MediaItemWithOwner } from "../types/DBtypes";
import Likes from "../components/Likes";
import Comments from "../components/Comments";
import { useUserContext } from "../hooks/contextHooks";

const Single = () => {
  const {user, handleAutoLogin} = useUserContext();
  if (!user) {
    handleAutoLogin();
  }
  const {state} = useLocation();
  const navigate: NavigateFunction = useNavigate();
  console.log('single state', state);
  const item: MediaItemWithOwner = state;
  return (
    <>
      <h3>{item.title}</h3>
      {item.media_type.includes('video') ? (
        <video controls src="{item.filename}"></video>
      ) : (
        <img src={item.thumbnail} alt={item.title} />
      )}
      <Likes item={item} />
      <p>{item.description}</p>
      <p>{new Date(item.created_at).toLocaleString('fi-FI')}</p>
      <p>{item.filesize}</p>
      <p>{item.media_type}</p>
      {user && <Comments item={item}/>}
      <button onClick={() => {
        navigate(-1);
      }}>
        go back
      </button>
    </>
  );
}

export default Single;
