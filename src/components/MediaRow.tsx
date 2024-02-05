import { MediaItem } from "../types/DBtypes";
import { Link } from "react-router-dom";

const MediaRow = (props: {
  item: MediaItem,
}) => {
  const {item} = props;
  return (
    <tr className="media-row">
      <td>
        <img src={item.thumbnail} alt={item.title} />
      </td>
      <td>{item.title}</td>
      <td>{item.description}</td>
      <td>{new Date(item.created_at).toLocaleString('fi-FI')}</td>
      <td>{item.filesize}</td>
      <td>{item.media_type}</td>
      <td>
        <Link to="/single" state={item}>View</Link>
      </td>
    </tr>
  );
}

export default MediaRow;
