import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import CreateNote from './CreateNote';
import CollectionDetails from './CollectionDetails';
import NoteDetails from './NoteDetails';
import CreateCollection from './CreateCollection';
import { CollectionsProvider } from './CollectionsContext';


const App = () => {
  console.log("loading app");
  
  return (
    <CollectionsProvider>
      <Router>
        <div className="App">
          <Navbar />
          <div className="content">
            <Routes>
              <Route exact path="/" element={<Home />}/>
              <Route path="/createNote" element={<CreateNote />}/>
              <Route path="/createCollection" element={<CreateCollection/>}/>
              <Route path="/collection/:id" element={<CollectionDetails />}/>
              <Route path="/note/:id" element={<NoteDetails />}/>
            </Routes>
          </div>
        </div>
      </Router>
    </CollectionsProvider>
  );
}

export default App;
