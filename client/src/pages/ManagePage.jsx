import { Link, Navigate } from 'react-router-dom';
import AddMemberForm from '../AddMemberForm';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';
import axios from "axios"

export default function ManagePage() {

    const { username, setUsername } = useContext(UserContext)
    const [families, setFamilies] = useState([])

    useEffect(() => {
        if (username) {
            axios.get("data")
                .then(({ data }) => {
                    setFamilies(data)
                })
        } else {
            console.log("not logged in")
        }
    }, [])

    return (
        <>
            <div>
                will have already add memebers here in an rodered list

            </div>
            <div className="text-xl text-center my-4 flex flex-col items-center">
                Your Families
                <div className="border grid grid-cols-4">
                    {username && families.map((fam) => (
                        <button className='m-4 p-2 mt-4 w-auto' key={fam._id}> {fam.name} </button>
                    ))}


                </div>
                <Link to={"/manage/new"}>
                    <button className='w-8 rounded-full mt-4'> + </button>
                </Link>
            </div>
            <AddMemberForm />
        </>
    );
}