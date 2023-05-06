import { Link } from 'react-router-dom';
import './App.css';
import { useContext } from 'react';
import { UserContext } from './UserContext';
import axios from "axios"

export default function Header() {
  const { username, setUsername } = useContext(UserContext);

  function handleLogout() {
    localStorage.removeItem('username');
    axios.post("/logout")
    setUsername(null);
  }

  function handleTest() {
    axios.get("/data", { username })
    // axios.post("/create", {
    //   name: "testing",
    //   restrictions: ["res1", "res2", "res3"],
    //   description: "this is a test",
    //   members: { "friend1": "halal", "friend2": "diabetes" }
    // })
  }
  return (
    <header className='mt-[50px] flex flex-row align-middle justify-between px-80'>
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
            <Link to="/register" className="">Register</Link>
          </div>
        )}
      </nav>
    </header>
  );
}
