import MediaRow from "../components/MediaRow";
import { useMedia } from "../hooks/apiHooks";
// import SingleView from "../components/SingleView";

const Home = () => {

  const {mediaArray} = useMedia();

  return (
    <>
      {/* {selectedItem && <SingleView item={selectedItem} setSelectedItem={setSelectedItem}/>} */}
      <h2>My Media</h2>
      <table className=" border-2 border-collapse">
        <thead>
          <tr>
            <th className=" border-2 border-slate-600 text-left py-2 w-3/12">Thumbnail</th>
            <th className=" border-2 border-slate-600 text-left py-2 w-3/12">Title</th>
            <th className=" border-2 border-slate-600 text-left py-2 w-3/12">Description</th>
            <th className=" border-2 border-slate-600 text-left py-2 w-3/12">Created</th>
            <th className=" border-2 border-slate-600 text-left py-2 w-3/12">Size</th>
            <th className=" border-2 border-slate-600 text-left py-2 w-3/12">Type</th>
            <th className=" border-2 border-slate-600 text-left py-2 w-3/12">Owner</th>
          </tr>
        </thead>
        <tbody>
          {mediaArray.map((item) => (
            <MediaRow
              key={item.media_id}
              item={item}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Home;
