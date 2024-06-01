import { Link } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import CollectionsContext from './CollectionsContext';

const CollectionList = () => {
  console.log("loading collectionList");

  const { collections, handleDeleteCollection } = useContext(CollectionsContext);

  const handleDeleteCollectionServer = async (id) => {
    await axios.post("http://localhost:8080/deleteCollection", {
      id: id
    }).then(() => {
      handleDeleteCollection(id);
    }).catch((error) => {
      console.log("Unable to delete collection on server", error);
    });
  };

  return (
    <div className="collection-list">
      {collections.map(collection => (
        <div className="list-group" key={collection.id} >
          <div className="list-group-item list-row">
            <Link className="list-link" state={{collection: collection}} to={`/collection/${collection.id}`}>
              <h2>{ collection.collection_name }</h2>
            </Link>
            <Link to={`/editCollection/${collection.id}`} state={{ collection: collection}}>
              <button className='list-button'>Edit</button>
            </Link>
            <button onClick={() => handleDeleteCollectionServer(collection.id)} className="list-button">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
 
export default CollectionList;