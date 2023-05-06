import { Link } from 'react-router-dom';
import './App.css';
import { useContext } from 'react';
import { UserContext } from './UserContext';
import axios from "axios"


export default function Header() {
  const { username, setUsername } = useContext(UserContext);

  function handleLogout() {
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
    <header>
      <Link to="/" className="logo">
        MyBlog
      </Link>

      <nav>
        <Link onClick={handleTest}>Test</Link>
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
