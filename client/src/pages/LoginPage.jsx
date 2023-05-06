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
    const bg2 = {
        backgroundImage: 'url("src/images/webImg.webp")',

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
        <div style={bg2} id="bkng" className="p-0 h-full  flex-col justify-center align-middle">
        <form onSubmit={handleLogin} className="login w-[400px] flex flex-col justify-between align-middle">
            <div className="searchBar content-center mt-[48px] flex flex-col items-center justify-center">
                <input className="w-1/2 mr-[1000px] mt-48 rounded-md mb-3 h-10 px-4 text-white  placeholder:text-white border-white bg-transparent" value={usernameState} type="text" placeholder="Username" onChange={(ev) => { setUsernameState(ev.target.value) }} />
                <input className="w-1/2 mr-[1000px] rounded-md mb-3 h-10 px-4 text-white block placeholder:text-white border-white bg-transparent" value={password} onChange={(ev) => { setPassword(ev.target.value) }} type="password" placeholder="Password" />
                {invalidLogin && <div className="text-red-500">Invalid Credentials</div>}
            </div>
            <div className="Buttons mt-25 pd-[20px] flex justify-center space-x-2 sm:space-x-4 md:space-x-6 lg:space-x-8 xl:space-x-12">
                <button className=" bg-green-600 hover:bg-green-700 active:bg-green-800 rounded-md mr-[1000px] w-[125px] py-2 px-5 mt-10">Login</button>
            </div>
        </form>
        </div>
    );
}