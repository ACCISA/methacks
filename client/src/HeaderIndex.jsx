import { Link } from 'react-router-dom';
import './App.css';

export default function HeaderIndex(){
    return (
        <header className='mx-96 mt-8'>
        <Link to="/" className="logo">MyBlog</Link>

        <nav>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </nav>
      </header>
    );
}