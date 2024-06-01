import React, { useContext } from 'react';
import CollectionList from "./CollectionList";
import CollectionsContext from './CollectionsContext';

const Home = () => {
  console.log("loading Home");

  const { collections } = useContext(CollectionsContext);

  return (
    <div className="home">
      <h2>Note Collections:</h2>
      { collections && <CollectionList /> }
    </div>
  );     
}

export default Home;