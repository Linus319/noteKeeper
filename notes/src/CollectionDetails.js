import { useLocation } from "react-router-dom/";
import NoteList from './NoteList';

const CollectionDetails = () => {
  console.log("loading collection details");

  const location = useLocation();
  const { collection } = location.state;
  const notes = collection.notes;

  
  return (
    <div className="collection-details">
      {collection && (
        <div>
          <h2>{ collection.collection_name }</h2>
          <NoteList collection={collection}notes={notes} />
        </div>
      )}
    </div>
  );
}

export default CollectionDetails;  