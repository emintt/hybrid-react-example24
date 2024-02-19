import MediaRow from "../components/MediaRow";
import Counter from "../components/ReducerExample";
// import { useMedia } from "../hooks/apiHooks";
import { useMedia } from "../hooks/GraphQLHooks";

// import SingleView from "../components/SingleView";

const Home = () => {

  const {mediaArray} = useMedia();

  return (
    <>
      {/* {selectedItem && <SingleView item={selectedItem} setSelectedItem={setSelectedItem}/>} */}
      <Counter />
      <h2>My Media</h2>
      <table>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Description</th>
            <th>Created</th>
            <th>Size</th>
            <th>Type</th>
            <th>Owner</th>
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
