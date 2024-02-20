import { useUserContext } from "../hooks/contextHooks";
import { MediaItemWithOwner } from "../types/DBtypes";
import { Link } from "react-router-dom";

const MediaRow = (props: {
  item: MediaItemWithOwner,
}) => {
  const {item} = props;
  const {user} = useUserContext();
  // console.log(user);
  return (
    <tr className="media-row border-2">
      <td className="border-2 border-slate-600 h-48">
        <img src={item.thumbnail} alt={item.title} />
      </td>
      <td className="border-2 border-slate-600">{item.title}</td>
      <td className="border-2 border-slate-600 h-48">{item.description}</td>
      <td className="border-2 border-slate-600 h-48">{new Date(item.created_at).toLocaleString('fi-FI')}</td>
      <td className="border-2 border-slate-600 h-48">{item.filesize}</td>
      <td className="border-2 border-slate-600 h-48">{item.media_type}</td>
      <td className="border-2 border-slate-600 h-48">{item.username}</td>
      <td className="border-2 border-slate-600 h-48">
        <div className=" flex flex-col">
          <Link className=" bg-slate-600 p-2 hover:bg-slate-950 my-1"
            to='/single' state={item}>View</Link>
          {user &&
            (user.user_id === item.user_id || user.level_name === 'Admin') &&
              (<>
                <button className=" bg-slate-700 p-2 hover:bg-slate-950 my-1"
                  onClick={() => console.log("modify", item)}>Modify</button>
                <button className=" bg-slate-800 p-2 hover:bg-slate-950 my-1"
                  onClick={() => console.log("delete", item)}>Delete</button>
              </>
          )}
        </div>

      </td>
    </tr>
  );
}

export default MediaRow;
