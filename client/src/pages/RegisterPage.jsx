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
    const bg3 = {
        backgroundImage: 'url("src/images/plain.jpg")',

        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        color: "white",
        position: 'absolute',
        top: '0',
        left: '0',
        width: "100%",
        height: '100%'
    }
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
        <div style={bg3} id="bkng3" className="p-0 h-full  flex-col justify-center align-middle">
        <form className="register" onSubmit={handleRegister}>
            <div className="searchBar backdrop-blur-sm rounded-full content-center mt-[190px] flex flex-col items-center justify-center">
                <input className="rounded-md h-10 px-4 bg-white mb-3 block w-full" value={usernameState} onChange={usernameOnChange} type="text" placeholder="Username" />
                <input className="rounded-md h-10 px-4 bg-white mb-3 block w-full" value={password} onChange={passOnChange} type="password" placeholder="Password" />
                <input className="rounded-md h-10 px-4 bg-white mb-3 block w-full" value={confirmPass} onChange={confirmPassOnChange} type="Password" placeholder="Confirm Password" />
                {!validPass && <div className="text-red-500">Passwords do not match</div>}
                {dupeUsername && <div className="text-red-500">This username is already taken</div>}
                {missingUsername && <div className="text-red-500">Missing username field</div>}
                {missingPass && <div className="text-red-500">Missing password field</div>}
            </div>
            <div className="Buttons mt-25 pd-[20px] flex justify-center space-x-2 sm:space-x-4 md:space-x-6 lg:space-x-8 xl:space-x-12">
                <button className=" bg-green-600 hover:bg-green-700 active:bg-green-800 rounded-md w-[125px] py-3 px-2 mt-10">Register</button>
            </div>
        </form>
        </div>
    );
}