import { useState } from 'react';
import axios from 'axios';



const CreateNote = ({ collections }) => {
  console.log("loading createNote");
  
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [priority, setPriority] = useState('normal');
  const [collectionID, setCollectionID] = useState(-1);

  // calculate current date
  const today = new Date();
  const month = today.getMonth()+1;
  const year = today.getFullYear();
  const day = today.getDate();
  const currentDate = month + "/" + day + "/" + year;

  const handleAddNote = async (e) => {
    e.preventDefault();

    if (collectionID === -1) {
      alert("Please select a collection.");
      return;
    }

    try {
      await axios.post('http://localhost:8080/addNote', {
        title: title,
        text: body,
        date: currentDate,
        collection_id: collectionID,
        priority: priority
      });
      window.location.href = `/collection/${collectionID}`;
    } catch (error) {
      console.log("Unable to add new note on server", error);
    }
  }

  return (
    <div className="create">
      <h2>Add a New Note</h2>
      <form onSubmit={handleAddNote}>
        <label>Note Title:</label>
        <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)}/>

        <label>Note Body:</label>
        <textarea required value={body} onChange={(e) => setBody(e.target.value)}></textarea>

        <label>Priority:</label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="high-priority">high priority</option>
          <option value="normal">normal</option>
        </select>

        <label>Collection:</label>
        <select value={collectionID} onChange={(e) => setCollectionID(parseInt(e.target.value))}>
          <option value={-1} disabled>Select a collection</option>
          {collections.map(collection => (
            <option key={collection.id} value={collection.id}>{collection.collection_name}</option>
          ))}
        </select>

        <button type="submit">Add Note</button>
        
      </form>
    </div>
  );
}
   
export default CreateNote;