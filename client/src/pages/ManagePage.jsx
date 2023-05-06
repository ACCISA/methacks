import { Link, Navigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';
import axios from "axios"

export default function ManagePage() {

    const { username, setUsername } = useContext(UserContext)
    const [families, setFamilies] = useState([])
    const [redirect, setRedirect] = useState(false)

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

    if (redirect) {
        return (<Navigate to={"/login"}></Navigate>)
    }

    return (
        <>

            <div className="text-xl text-center my-4 flex flex-col items-center">
                <h2 className=' font-bold flex justify-center text-xl'>Your Groups</h2>
                <div className="grid grid-cols-4 border">
                    {username && families.map((fam) => (
                        <Link to={"/manage/" + fam._id}>
                            <button className=' bg-white hover:underline underline-offset-4 text-black m-4 p-2 mt-4 w-auto' key={fam._id}> {fam.name} </button>

                        </Link>
                    ))}


                </div>
                <Link to={"/manage/new"}>
                    <button className='w-20 mt-4 text-sm'> Add Group </button>
                </Link>
            </div>


        </>
    );
}