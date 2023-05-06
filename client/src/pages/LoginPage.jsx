import { useContext, useState, useEffect } from "react";
import { UserContext } from "../UserContext";
import axios from "axios"
import { Navigate } from "react-router-dom";
import HeaderIndex from "../HeaderIndex";

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
        setInvalidLogin(false);
        ev.preventDefault();
        axios
            .post("/login", {
                username: usernameState,
                password: password,
            })
            .then(function (res) {
                if (res.status == 200) {
                    setUsername(usernameState);
                    localStorage.setItem("isLoggedIn", "true"); // add this line
                    setRedirect(true);
                }
            })
            .catch(function (err) {
                if (err.response) {
                    if (err.response.status === 422) {
                        setInvalidLogin(true);
                        return;
                    }

                    console.log(err.response.status);
                }
                console.log("no errors");
            });
    }

    useEffect(() => {
        if (username) {
            setRedirect(true)
        }
    }, [username])

    if (redirect) {
        return (<Navigate to={"/"}></Navigate>)
    }

    return (

        <div style={bg2} id="bkng2" className="p-0">
            <HeaderIndex />
            <form onSubmit={handleLogin} className="login w-auto items-center bg-blue-500 m-20 flex flex-row">
                <div className="w-full">
                    <div className="searchBar fixed left-28 content-center align-middle mt-[48px] flex flex-col items-center justify-center">
                        <input className=" mt-48 rounded-md mb-3 px-4 text-white placeholder:text-white border-white bg-transparent" value={usernameState} type="text" placeholder="Username" onChange={(ev) => { setUsernameState(ev.target.value) }} />
                        <input className=" rounded-md mb-3 px-4 text-white block placeholder:text-white border-white bg-transparent" value={password} onChange={(ev) => { setPassword(ev.target.value) }} type="password" placeholder="Password" />
                        {invalidLogin && <div className="text-red-500 w-auto rounded-md mb-3 px-4">Invalid Credentials</div>}
                        <div className="Buttons mt-25 pd-[20px] flex justify-center space-x-2 sm:space-x-4 ">
                            <button className=" bg-orange-600 hover:bg-green-700 active:bg-green-800 rounded-md w-[125px] py-1 px-5 mt-4">Login</button>
                        </div>
                    </div>

                </div>

            </form>
        </div>

    );
}
