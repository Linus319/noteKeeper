import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
          <Switch>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route path="/createNote">
              <CreateNote collections={collections}/>
            </Route>
            <Route path="/createCollection">
              <CreateCollection/>
            </Route>
            <Route path="/collection/:id">
              <CollectionDetails/>
            </Route>
            <Route path="/note/:id">
              <NoteDetails/>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
