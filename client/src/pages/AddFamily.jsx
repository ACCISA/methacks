import { useContext } from "react";
import AddFamilyForm from "../AddFamilyForm";
import { UserContext } from "../UserContext";
import HeaderIndex from "../HeaderIndex";
import { Navigate } from "react-router-dom";
export default function AddFamily() {
    const { username, setUsername } = useContext(UserContext)

    const bgFam = {
        backgroundImage: 'url("/src/images/spoon.jpg")',
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

    if (!username) {
        return (<Navigate to={"/login"} />)
    }

    return (
        <>
        <div style={bgFam} id="bkng2" className="p-0">
        <HeaderIndex />
        <div className=" mt-14"></div>
        <AddFamilyForm />
        </div>
    
        </>



        


    );
}