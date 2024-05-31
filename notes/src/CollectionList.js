import { Link } from 'react-router-dom';
import axios from 'axios';

const CollectionList = ({ collections, onDeleteCollection }) => {

  const handleDeleteCollection = async (id) => {
    console.log("deleting id:", id);
    await axios.post("http://localhost:8080/deleteCollection", {
      id: id
    }).then(() => {
      onDeleteCollection(id);
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
            <button onClick={() => handleDeleteCollection(collection.id)} className="list-delete">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
 
export default CollectionList;