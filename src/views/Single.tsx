import { NavigateFunction, useLocation, useNavigate } from "react-router-dom";
import { MediaItem } from "../types/DBtypes";

const Single = () => {
  const {state} = useLocation();
  const navigate: NavigateFunction = useNavigate();
  const item: MediaItem = state.item;
  return (
    <>
      <h3>{item.title}</h3>
      {item.media_type.includes('video') ? (
        <video controls src="{item.filename}"></video>
      ) : (
        <img src={item.thumbnail} alt={item.title} />
      )}

      <p>{item.description}</p>
      <p>{new Date(item.created_at).toLocaleString('fi-FI')}</p>
      <p>{item.filesize}</p>
      <p>{item.media_type}</p>
      <button onClick={() => {
        navigate(-1);
      }}>
        close
      </button>
    </>
  );
}

export default Single;
