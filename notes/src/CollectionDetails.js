import { useParams } from 'react-router-dom';
import NoteList from './NoteList';
import { useContext, useState, useEffect } from 'react';
import CollectionsContext from "./CollectionsContext";

const CollectionDetails = () => {
  console.log("loading collection details");

  const { id } = useParams();
  const { collections } = useContext(CollectionsContext);
  const [collection, setCollection] = useState(null);

  useEffect(() => {
    const foundCollection = collections.find(col => col.id === parseInt(id));
    setCollection(foundCollection);
  }, [collections, id]);
  
  return (
    <div className="collection-details">
      {collection && (
        <div>
          <h2>{ collection.collection_name }</h2>
          <NoteList collection={collection} notes={collection.notes} />
        </div>
      )}
    </div>
  );
}

export default CollectionDetails;  