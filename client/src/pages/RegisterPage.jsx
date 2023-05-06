import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import axios from "axios"
import { Navigate } from "react-router-dom";

export default function RegisterPage() {
    const { username, setUsername } = useContext(UserContext)
    const [usernameState, setUsernameState] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [validPass, setValidPass] = useState(true)
    const [dupeUsername, setDupeUsername] = useState(false)
    const [missingPass, setMissingPass] = useState(false)
    const [missingUsername, setMissingUsername] = useState(false)
    const [redirect, setRedirect] = useState(false)
    function handleRegister(ev) {
        setValidPass(true)
        setDupeUsername(false)
        ev.preventDefault()
        if (usernameState.length == 0) {
            setMissingUsername(true)
            return;
        }
        if (password.length == 0 || confirmPass.length == 0) {
            setMissingPass(true)
            return;
        }

        axios.post("/register", {
            username: usernameState,
            password: password
        })
            .catch(function (err) {
                if (err.response) {
                    if (err.response.status === 422) {
                        setDupeUsername(true)
                        return;
                    }
                    console.log(err.response.status)
                }
            })

        setUsername(usernameState)
        setRedirect(true)
    }
    function passOnChange(ev) {
        setPassword(ev.target.value)
        setMissingPass(false)
        if ((ev.target.value) !== confirmPass) {
            setValidPass(false)
            return;
        }

        setValidPass(true)
    }
    function confirmPassOnChange(ev) {
        setConfirmPass(ev.target.value)
        setMissingPass(false)
        if (password !== (ev.target.value)) {
            setValidPass(false)
            return;
        }
        setValidPass(true)
    }
    function usernameOnChange(ev) {
        setUsernameState(ev.target.value)
        setDupeUsername(false)
        setMissingUsername(false)
    }

    if (redirect) {
        return (<Navigate to={"/"}></Navigate>)
    }

    return (
        <form className="register" onSubmit={handleRegister}>
            <input value={usernameState} onChange={usernameOnChange} type="text" placeholder="username" />
            <input value={password} onChange={passOnChange} type="password" placeholder="password" />
            <input value={confirmPass} onChange={confirmPassOnChange} type="password" />
            {!validPass && <div className="text-red-500">Passwords do not match</div>}
            {dupeUsername && <div className="text-red-500">This username is already taken</div>}
            {missingUsername && <div className="text-red-500">Missing username field</div>}
            {missingPass && <div className="text-red-500">Missing password field</div>}
            <button>Register</button>
        </form>
    );
}