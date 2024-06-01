import { Link, useLocation } from 'react-router-dom';

const NoteDetails = () => {
    console.log("loading note details");

    const location = useLocation();
    const {note, collection} = location.state;

    return (
        <>
            {note && (
                <div className="note-details container">
                    <div className='note-header'>
                        <h2 className='note-title'>{note.title}</h2>
                        <button className='edit-button'>Edit</button>
                    </div>
                    
                    <div className="note-body">
                        <p><strong>Body:</strong> {note.text}</p>
                        <p><strong>Date:</strong> {note.date}</p>
                        <p><strong>Priority:</strong> {note.priority}</p>
                    </div>
                    <Link className='back-to-collection' to={`/collection/${note.collection_id}`} state={{collection: collection}}>
                        To Collection
                    </Link>
                </div>
            )}
        </>
    );
}

export default NoteDetails;