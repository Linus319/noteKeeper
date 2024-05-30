import CollectionList from "./CollectionList";
import axios from 'axios';
import React, { useState, useEffect } from 'react';



const Home = () => {
  console.log("loading Home, 1 axios call for collections");

  const [collections, setCollections] = useState([]);
  
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
  
  const handleDeleteCollection = (id) => {
    setCollections(collections.filter(collection => collection.id !== id));
  };

  return (
    <div className="home">
      <h2>Note Collections:</h2>
      { collections && <CollectionList collections={collections} onDeleteCollection={handleDeleteCollection}/> }
    </div>
  );     
}

export default Home;