import { Link, useLocation } from 'react-router-dom';

const NoteDetails = () => {
    console.log("loading note details");

    const location = useLocation();
    const {note, collection} = location.state;

    return (
        <>
            {note && (
                <div className="note-details">
                    <h2>Title: {note.title}</h2>
                    <p>Body: {note.text}</p>
                    <p>Date: {note.date}</p>
                    <p>Priority: {note.priority}</p>
                    <Link to={`/collection/${note.collection_id}`} state={{collection: collection}}>
                        To Collection
                    </Link>
                </div>
            )}
        </>
    );
}

export default NoteDetails;