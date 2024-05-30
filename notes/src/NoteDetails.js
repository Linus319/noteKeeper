import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const NoteDetails = () => {
    console.log("loading note details, 1 server call for note");

    const { id } = useParams();
    const [note, setNote] = useState(null);

    useEffect(() => {
        const getNote = async () => {
            try {
                const result = await axios.get(`http://localhost:8080/note/${id}`);
                setNote(result.data.note);
            } catch (error) {
                console.log("Unable to retrieve data from the server", error);
            }
        };
        getNote();
    }, [id]);

    return (
        <>
            {note && (
                <div className="note-details">
                    <h2>Title: {note.title}</h2>
                    <p>Body: {note.text}</p>
                    <p>Date: {note.date}</p>
                    <p>Priority: {note.priority}</p>
                    <Link to={`/collection/${note.collection_id}`}>Back to collection</Link>
                </div>
            )}
        </>
    );
}

export default NoteDetails;