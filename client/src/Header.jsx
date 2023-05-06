import { Link } from 'react-router-dom';
import './App.css';

export default function Header(){
    return (
        <header className=''>
        <Link to="/" className="logo">MyBlog</Link>

        <nav>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </nav>
      </header>
    );
}