import { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CollectionsContext from './CollectionsContext';

const EditCollection = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { collection } = location.state;
    const [name, setName] = useState(collection.collection_name);
    const { handleEditCollection } = useContext(CollectionsContext);

    const handleEditCollectionServer = async (e) => {
        e.preventDefault();
        console.log("edit collection handler");
        await axios.post("http://localhost:8080/editCollection", {
            name: name,
            id: collection.id
        }).then(() => {
            const newCollection = {id: collection.id, collection_name: name, notes: collection.notes};
            handleEditCollection(newCollection);
            navigate('/');
        }).catch((error) => {
            console.log("unable to edit collection", error);
        });
    };

    return (
        <div className="create">
            <h2>Edit Collection</h2>
            <form onSubmit={handleEditCollectionServer}>
                <label>Collection Name:</label>
                <input type="text" value={name} onChange={(e) => {setName(e.target.value)}}/>
                <button type="submit">Update Collection</button>
            </form>
        </div>
    )
};

export default EditCollection;