import { Link } from 'react-router-dom';
import './App.css';
import { useContext } from 'react';
import { UserContext } from './UserContext';

export default function HeaderIndex() {
  const { username, setUsername } = useContext(UserContext)
  function handleLogout() {
    setUsername(null);
  }

  return (
    <header className='mt-[50px] mb-[10px] flex flex-row align-middle justify-between px-80'>
      <Link to="/" className="logo text-3xl font-bold">
        NutriScan
      </Link>

      <nav>
        {username && (
          <div className='align-middle justify-center ml-16'>
            <Link to="/manage" className="mr-2">
              Manage
            </Link>
            <Link onClick={handleLogout} to="/">
              Logout
            </Link>
          </div>
        )}

        {!username && (
          <div className='align-middle justify-center ml-16'>
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