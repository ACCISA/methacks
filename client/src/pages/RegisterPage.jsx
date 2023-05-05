import { useContext } from "react";
import { UserContext } from "../UserContext";

export default function RegisterPage() {
    const { username, setUsername } = useContext(UserContext)
    console.log(username)
    return (
        <form className="register">
            <input type="text" placeholder="username" />
            <input type="password" placeholder="password" />
            <button>Register</button>
            {username ? username : 'Null'}
        </form>
    );
}