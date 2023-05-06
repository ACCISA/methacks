export default function LoginPage(){
    document.getElementById("root").style.backgroundColor = "white"
   
    document.getElementById("root").style.backgroundImage = "white"
    return (
        <form className="login">
            <input type="text" placeholder="username"/>
            <input type="password" placeholder="password"/>
            <button>Login</button>
        </form>
    );
}