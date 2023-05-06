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
                    setUsername(usernameState)
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

    }

    if (redirect) {
        return (<Navigate to={"/"}></Navigate>)
    }

    return (
        <form onSubmit={handleLogin} className="login w-[400px] flex flex-col justify-between align-middle">
            <div className="searchBar content-center mt-[48px] flex flex-col items-center justify-center">
                <input className="rounded-md mb-3 h-10 px-4 bg-white block w-full" value={usernameState} type="text" placeholder="Username" onChange={(ev) => { setUsernameState(ev.target.value) }} />
                <input className="rounded-md mb-3 h-10 px-4 bg-white block w-full" value={password} onChange={(ev) => { setPassword(ev.target.value) }} type="password" placeholder="Password" />
                {invalidLogin && <div className="text-red-500">Invalid Credentials</div>}
            </div>
            <div className="Buttons mt-25 pd-[20px] flex justify-center space-x-2 sm:space-x-4 md:space-x-6 lg:space-x-8 xl:space-x-12">
                <button className=" bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-md w-[125px] py-3 px-2 mt-10">Login</button>
            </div>
        </form>
    );
}