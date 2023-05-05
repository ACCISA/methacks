import { useContext, useState } from "react";
import { UserContext } from "../UserContext";

export default function LoginPage() {
    const { username, setUsername } = useContext(UserContext)
    const [usernameState, setUsernameState] = useState('')
    const [password, setPassword] = useState('')
    const [loggedIn, setLoggedIn] = useState(true)
    function handleLogin(ev) {
        ev.preventDefault()
        //api call to login
        setUsername(usernameState)
    }
    return (
        <form onSubmit={handleLogin} className="login">
            <input value={usernameState} type="text" placeholder="username" onChange={(ev) => { setUsernameState(ev.target.value) }} />
            <input value={password} onChange={(ev) => { setPassword(ev.target.value) }} type="password" placeholder="password" />
            <button> Login</button>
            {usernameState}
        </form>
    );
}