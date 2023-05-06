import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import axios from "axios"
import { Navigate } from "react-router-dom";

export default function LoginPage() {
    const { username, setUsername } = useContext(UserContext)
    const [usernameState, setUsernameState] = useState('')
    const [password, setPassword] = useState('')
    const [loggedIn, setLoggedIn] = useState(true)
    const [invalidLogin, setInvalidLogin] = useState(false)
    const [redirect, setRedirect] = useState(false)
    function handleLogin(ev) {
        setInvalidLogin(false)
        ev.preventDefault()
        axios.post("/login", {
            username: usernameState,
            password: password
        })
            .then(function (res) {
                if (res.status == 200) {
                    setRedirect(true)
                }
            })
            .catch(function (err) {
                if (err.response) {
                    if (err.response.status === 422) {
                        setInvalidLogin(true)
                        return;
                    }

                    console.log(err.response.status)
                }
                console.log('no errors')
            })

        setUsername(usernameState)
    }

    if (redirect) {
        return (<Navigate to={"/"}></Navigate>)
    }

    return (
        <form onSubmit={handleLogin} className="login">
            <input value={usernameState} type="text" placeholder="username" onChange={(ev) => { setUsernameState(ev.target.value) }} />
            <input value={password} onChange={(ev) => { setPassword(ev.target.value) }} type="password" placeholder="password" />
            {invalidLogin && <div className="text-red-500">Invalid Credentials</div>}
            <button> Login</button>
        </form>
    );
}