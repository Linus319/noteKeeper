import axios from 'axios';
import { useState } from 'react';

const CreateCollection = () => {
    console.log("loading createCollection");

    const [name, setName] = useState('');

    const handleAddCollection = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8080/addCollection", {
            collection_name: name
        }).then(() => {
            window.location.href='/';
        }).catch((error) => {
            console.log("Unable to add collection on server", error);
        });
    };


    return (
        <div className="create">
            <h2>Create Collection</h2>
            <form onSubmit={handleAddCollection}>
                <label>Collection Name:</label>
                <input type="text" required value={name} onChange={(e) => {setName(e.target.value)}}/>
                <button type="submit">Add Collection</button>
            </form>
        </div>
    );
}

export default CreateCollection;