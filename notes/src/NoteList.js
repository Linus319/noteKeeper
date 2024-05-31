import { Link } from 'react-router-dom';
import axios from 'axios';

const NoteList = ({ notes, collection, onDeleteNote }) => {
    console.log("loading notelist");

    const handleDeleteNote = (noteID) => {
        axios.post("http://localhost:8080/deleteNote", {
            id: noteID
        }).then(() => {
            onDeleteNote(noteID);
        }).catch((error) => {
            console.log("Unable to delete note from server", error);
        });
    };
    

    return (
        <div className="note-list list-group">
            {notes && (notes.map(note => (
              <div key={note.id} className="list-row list-group-item">
                <Link className="list-link" to={`/note/${note.id}`} state={{note: note, collection: collection}}>
                    <h2>{note.title}</h2>
                </Link>
                <button onClick={() => handleDeleteNote(note.id)} className="list-delete">Delete</button>
              </div>
            )))}
        </div>
    )
}

export default NoteList;