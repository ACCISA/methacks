import { useContext, useEffect, useState } from "react"
import { Navigate, useParams } from "react-router-dom"
import axios from "axios"
import AddMemberForm from "../AddMemberForm"
import { UserContext } from '../UserContext';
import { Avatar } from "flowbite-react";
import HeaderIndex from "../HeaderIndex";

export default function FamilyPage() {
    const { id } = useParams()
    const [fam, setFam] = useState({})
    const [name, setName] = useState('')
    const [members, setMembers] = useState([])
    const { username, setUsername } = useContext(UserContext)
    const [redirect, setRedirect] = useState(false)
    const [parent, setParent] = useState(false)

    const bgFam = {
        backgroundImage: 'url("/src/images/plainb.webp")',
        backgroundSize: "cover",
        backgroundRepeat: "repeat-y",
        backgroundPosition: "center",
        color: "white",
        position: 'absolute',
        top: '0',
        left: '0',
        width: "100%",
        height: '100%'
    }
    function handleRemoveGroup() {
        alert("This group has been removed")
        axios.delete("/manage/" + id)
        setRedirect(true)
    }

    function handleRemoveMember(ev) {

        console.log("removed: " + ev.target.id)
        const userRemoved = ev.target.id
        axios.post("/manage/" + id, { members, removed: userRemoved }).then(({ data }) => {
            setParent(true)
        })

    }

    useEffect(() => {
        if (!id) return;
        if (!username) return;
        axios.get("/manage/" + id)
            .then(({ data }) => {
                setName(data.name)
                setFam(data)
                let dataArr = []
                let entries = Object.entries(data.members)
                entries.map(([key, val] = entry) => {
                    let arrEntry = {
                        member: key,
                        restrictions: val
                    }
                    dataArr.push(arrEntry)
                })
                setMembers(dataArr)
            })
        setParent(false)
    }, [parent])

    if (!username) {
        return (<Navigate to={"/login"} />)
    }

    if (redirect) {
        return (<Navigate to={"/manage"} />)
    }

    return (
       <>
        <div style={bgFam} id="bkng" className="bg-repeat-y p-0 h-full  flex-col justify-center align-middle">

        <HeaderIndex />

        <div>
            {name && (
                <div>
                    <div className="bg-repeat-y flex justify-between">
                        <div className="capitalize">{name}'s Members</div>
                        <div className="text-sm">
                            <button onClick={handleRemoveGroup} className="text-sm px-2 hover:bg-red-500 m-2">Remove Group</button>
                        </div>
                    </div>
                    <div className="border p-2 bg-repeat-y">
                        {fam && (members.map((member) => (
                            <div className="flex border justify-between">
                                <Avatar
                                    img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                    rounded={true}
                                    bordered={true}
                                    color="gray"
                                />
                                <div className="mx-2 bg-repeat-y">Name: {member.member}</div>
                                <div>Restrictions: {member.restrictions}</div>
                                <button id={member.member} value={member.member} onClick={handleRemoveMember} className="mb-2 w-8 text-center items-center align-items rounded-full hover:bg-red-500"><svg id={member.member} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                                </button>
                            </div>
                        )))}
                        <AddMemberForm setParent={setParent} />
                    </div>
                </div>
            )}
        </div>
        </div>
        </>
        
    )
}