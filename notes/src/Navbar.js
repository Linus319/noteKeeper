import { Link } from "react-router-dom";
import { useContext } from 'react';
import CollectionsContext from "./CollectionsContext";

const Navbar = () => {

    const { collections } = useContext(CollectionsContext);

    return (
        <nav className="navbar">
            <h1>NoteKeeper</h1>
            <div className="links">
                <Link to='/'>Home</Link>
                <Link to='/CreateNote' state={{ collections }} style={{ 
                    color: 'white', 
                    backgroundColor: '#f1356d',
                    borderRadius: '8px' 
                }}>New Note</Link>
                <Link to='/createCollection' style={{
                    color: 'white',
                    backgroundColor: '#f1356d',
                    borderRadius: '8px'
                }}>New Collection</Link>
            </div>
        </nav>
    );
}

export default Navbar;