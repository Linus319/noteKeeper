import CollectionList from "./CollectionList";
import NoteList from "./NoteList";
import axios from 'axios';
import React, { useState, useEffect } from 'react';



const Home = () => {
  console.log("loading Home, 2 axios call for collections, notes");

  const [collections, setCollections] = useState([]);
  const [notes, setNotes] = useState([]);
  
  // get collection data with notes inside
  useEffect(() => {
    const getCollections = async () => {
      try {
        const result = await axios.get('http://localhost:8080/data');
        setCollections(result.data.collection_data);
      } catch (error) {
        console.log("Unable to retrieve data from the server", error);
      }
    };
    getCollections();
  }, []);

  // get note data in chronological order
  useEffect(() => {
    const getNotes = async () => {
      try {
        const result = await axios.get('http://localhost:8080/notes');
        setNotes(result.data.notes);
      } catch (error) {
        console.log("Unable to get notes data from server", error);
      }
    };
    getNotes();
  }, []);
  
  const handleDeleteCollection = (id) => {
    setCollections(collections.filter(collection => collection.id !== id));
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
    // FIXME: NEED TO UPDATE THE NOTES IN collections and setCollections ### MAYBE... THINGS HAVE CHANGED
  }

  return (
    <div className="home">
      <h2>Note Collections:</h2>
      { collections && <CollectionList collections={collections} onDeleteCollection={handleDeleteCollection}/> }

      <br></br>

      <h2>Note List:</h2>
      { collections.map(collection => (
        <NoteList key={collection.id} notes={collection.notes} collection={collection} onDeleteNote={handleDeleteNote}/>
      ))}
    </div>
  );     
}

export default Home;