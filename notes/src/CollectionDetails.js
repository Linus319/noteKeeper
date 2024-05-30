import { useParams, Link } from "react-router-dom/";
import axios from 'axios';
import { useState, useEffect } from 'react';

const CollectionDetails = () => {
  console.log("loading collection details, 1 axios call for collections");


  const { id } = useParams();
  const [collection, setCollection] = useState(null);
  
  useEffect(() => {
    const getCollection = async () => {
      try {
        const result = await axios.get(`http://localhost:8080/collection/${id}`);
        setCollection(result.data.collection);
      } catch (error) {
        console.log("Unable to retrieve data from the server", error);
      }
    };
    getCollection();
  }, [id]);

  const handleDeleteNote = (e) => {
    const noteID = parseInt(e.target.id);
    axios.post("http://localhost:8080/deleteNote", {
      id: noteID
    }).then(() => {
      // FIXME: should probably just update the state rather than redirect
      window.location.href = `/collection/${collection.id}`
    }).catch((error) => {
      console.log("Unable to delete note from server", error);
    });
  };

  
  return (
    <div className="collection-details">
      {collection && (
        <article>
          <h2>{ collection.collection_name }</h2>
          <div className="list-group">
            {collection.notes && (collection.notes.map(note => (
              <div key={note.id} className="list-row">
                <Link className="list-link" to={`/note/${note.id}`}>
                  <h2>{note.title}</h2>
                </Link>
                <button id={note.id} onClick={handleDeleteNote} className="list-delete">Delete</button>
              </div>
            )))}
          </div>
        </article>
      )}
    </div>
  );
}

export default CollectionDetails;  