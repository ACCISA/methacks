import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import axios from "axios"

export default function RegisterPage() {
    const { username, setUsername } = useContext(UserContext)
    const [usernameState, setUsernameState] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [validPass, setValidPass] = useState(true)
    const [dupeUsername, setDupeUsername] = useState(false)
    console.log(username)
    function handleRegister(ev) {
        setValidPass(true)
        setDupeUsername(false)
        ev.preventDefault()
        if (password !== confirmPass) {
            setValidPass(false)
            return;
        }
        axios.post("/register", {
            username: usernameState,
            password: password
        })
            .catch(function (err) {
                if (err.response) {
                    console.log(err.response.status)
                }
            })
    }
    return (
        <form className="register" onSubmit={handleRegister}>
            <input value={usernameState} onChange={(ev) => { setUsernameState(usernameState) }} type="text" placeholder="username" />
            <input value={password} onChange={(ev) => { setPassword(ev.target.value) }} type="password" placeholder="password" />
            <input value={confirmPass} onChange={(ev) => { setConfirmPass(ev.target.value) }} type="password" />
            {validPass && <div className="text-red-500">Passwords do not match</div>}
            {dupeUsername && <div className="text-red-500">This username is already taken</div>}
            <button>Register</button>
            {username ? username : 'Null'}
        </form>
    );
}