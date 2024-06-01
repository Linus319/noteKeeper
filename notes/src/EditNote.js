import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import axios from 'axios';
import CollectionsContext from './CollectionsContext';

const EditNote = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { note } = location.state;
    const [text, setText] = useState(note.text);
    const [title, setTitle] = useState(note.title);
    const [priority, setPriority] = useState(note.priority);
    const { collections, handleEditNote } = useContext(CollectionsContext);

    // calculate current date
    const today = new Date();
    const month = today.getMonth()+1;
    const year = today.getFullYear();
    const day = today.getDate();
    const currentDate = month + "/" + day + "/" + year;

    const handleEditNoteServer = async (e) => {
        e.preventDefault();

        await axios.post('http://localhost:8080/editNote', {
            id: note.id,
            title: title,
            text: text,
            priority: priority,
            date: currentDate
        }).then(() => {
            const newNote = {id: note.id, title: title, text: text, priority: priority, date: currentDate, collection_id: note.collection_id};
            handleEditNote(newNote);
            navigate(`/note/${note.id}`, { state: { note: newNote, collection: collections.find(collection => collection.id === note.collection_id)}});
        }).catch((error) => {
            console.log("unable to edit note on server", error);
        })
    };

    return (
        <div className="note-details container create">
            <form onSubmit={handleEditNoteServer}>
                <div className='note-header'>
                    <input type='text' className='note-title' value={title} onChange={(e) => setTitle(e.target.value)}></input>
                </div>
                
                <div className="note-body">
                    <label>Body:</label>
                    <input type='text' value={text} onChange={(e) => setText(e.target.value)}></input>
                    <label>Priority:</label>
                    <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                        <option value='normal'>normal</option>
                        <option value='high-priority'>high-priority</option>
                    </select>
                </div>
                <button type='submit' className='edit-button'>
                    Update Note
                </button>
            </form>
            
        </div>
    );
}

export default EditNote;