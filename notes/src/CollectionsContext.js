import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const CollectionsContext = createContext();

export const CollectionsProvider = ({ children }) => {
    const [collections, setCollections] = useState([]);

    useEffect(() => {
        const getCollections = async () => {
            try {
                const result = await axios.get('http://localhost:8080/data');
                setCollections(result.data.collection_data);
            } catch (error) {
                console.log("Unable to retrieve collections data from server", error);
            }
        };
        getCollections();
    }, []);

    const handleDeleteNote = (id) => {
        setCollections(prevCollections =>
            prevCollections.map(collection => ({
                ...collection,
                notes: collection.notes.filter(note => note.id !== id)
            }))
        );
    };

    const handleDeleteCollection = (id) => {
        setCollections(prevCollections => prevCollections.filter(collection => collection.id !== id));
    };

    return (
        <CollectionsContext.Provider value={{ collections, handleDeleteNote, handleDeleteCollection }}>
            { children }
        </CollectionsContext.Provider>
    );
};

export default CollectionsContext;