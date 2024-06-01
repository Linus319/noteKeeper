import { useParams } from 'react-router-dom';
import NoteList from './NoteList';
import { useContext } from 'react';
import CollectionsContext from "./CollectionsContext";

const CollectionDetails = () => {
  console.log("loading collection details");

  const { id } = useParams();
  const { collections, handleDeleteNote } = useContext(CollectionsContext);

  const currentCollection = collections.find(collection => collection.id === parseInt(id));
  
  return (
    <div className="collection-details">
      {currentCollection && (
        <div>
          <h2>{ currentCollection.collection_name }</h2>
          <NoteList collection={currentCollection} notes={currentCollection.notes} onDeleteNote={handleDeleteNote} />
        </div>
      )}
    </div>
  );
}

export default CollectionDetails;  