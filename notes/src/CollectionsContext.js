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

    const handleAddNote = (note) => {
        setCollections(prevCollections =>
            prevCollections.map(collection =>
                collection.id === note.collection_id
                ? { ...collection, notes: [...collection.notes, note] }
                : collection
            )
        );
    };

    const handleEditNote = (newNote) => {
        setCollections(prevCollections =>
            prevCollections.map(collection => ({
                ...collection,
                notes: collection.notes.map(note =>
                    note.id === newNote.id ? newNote: note
                )
            }))
        );
    };

    const handleEditCollection = (newCollection) => {
        setCollections(collections.map(collection => collection.id === newCollection.id ? newCollection : collection));
    }

    return (
        <CollectionsContext.Provider value={{ collections, handleDeleteNote, handleDeleteCollection, handleAddNote, handleEditNote, handleEditCollection }}>
            { children }
        </CollectionsContext.Provider>
    );
};

export default CollectionsContext;