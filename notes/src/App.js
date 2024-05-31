import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import CreateNote from './CreateNote';
import axios from 'axios';
import { useState, useEffect } from 'react';
import CollectionDetails from './CollectionDetails';
import NoteDetails from './NoteDetails';
import CreateCollection from './CreateCollection';


const App = () => {
  console.log("loading app, 1 server axios call for collections");

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

  
  return (
    <Router>
      <div className="App">
        <Navbar collections={collections}/>
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route path="/createNote" element={<CreateNote collections={collections}/>}/>
            <Route path="/createCollection" element={<CreateCollection/>}/>
            <Route path="/collection/:id" element={<CollectionDetails/>}/>
            <Route path="/note/:id" element={<NoteDetails/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
