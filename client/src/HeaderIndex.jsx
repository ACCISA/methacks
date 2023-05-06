import { Link } from 'react-router-dom';
import './App.css';
import { useContext } from 'react';
import { UserContext } from './UserContext';

export default function HeaderIndex(){
    const {username, setUsername} = useContext(UserContext)
    function handleLogout() {
      setUsername(null);
    }
    
    return (
        <header className='mx-96 mt-8'>
        <Link to="/" className="logo">
        MyBlog
      </Link>

      <nav>
        {username && (
          <div>
            <Link to="/manage" className="mr-2">
              Manage
            </Link>
            <Link onClick={handleLogout} to="/">
              Logout
            </Link>
          </div>
        )}

        {!username && (
          <div>
            <Link to="/login" className="mr-2">
              Login
            </Link>
            <Link to="/register">Register</Link>
          </div>
        )}
      </nav>
      </header>
    );
}