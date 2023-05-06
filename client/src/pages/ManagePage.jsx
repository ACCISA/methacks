import { Link, Navigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';
import axios from "axios"
import HeaderIndex from "../HeaderIndex";

export default function ManagePage() {

    const { username, setUsername } = useContext(UserContext)
    const [families, setFamilies] = useState([])
    const [redirect, setRedirect] = useState(false)
    const bgManage = {
        backgroundImage: 'url("src/images/pic.jpg")',

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
    useEffect(() => {
        if (username) {
            axios.get("/data")
                .then(({ data }) => {
                    setFamilies(data)
                })
        } else {
            setRedirect(true)
        }
    }, [])

    if (redirect || !username) {
        return (<Navigate to={"/login"}></Navigate>)
    }


    return (
        <>
            <div style={bgManage} id="bkng" className="p-0 h-full  flex-col justify-center align-middle">
                <div><HeaderIndex /></div>

                <div className=" mt-36 text-xl text-center my-4 flex flex-col items-center">
                    <h2 className=' font-bold font-sans flex justify-center text-xl'>Your Groups</h2>
                    {families.length > 0 && (<div className="grid grid-cols-4 place-items-center border w-auto">
                        {username && families.length == 0 && (<div className='text-center flex flex-col justify-center bg-blue-200'>You do not have any groups yet. </div>)}

                        {username && families.map((fam) => (
                            <Link to={"/manage/" + fam._id}>

                                <button className='flex bg-white hover:underline underline-offset-4 text-black m-4 p-2 mt-4 w-auto' key={fam._id}> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                                </svg>
                                    {fam.name} </button>

                            </Link>
                        ))}
                        {console.log(families.length)}


                    </div>
                    )}
                    {families.length == 0 && (
                        <div className='flex border w-auto p-4 font-sans'>You do not have any groups yet. Add one &nbsp;<Link to={"/manage/new"}><span className='text-blue-300'>here.</span></Link> </div>
                    )}
                    <Link to={"/manage/new"}>
                        <button className='w-20 mt-4 text-sm'> Add Group </button>
                    </Link>
                </div>
            </div>

        </>
    );
}