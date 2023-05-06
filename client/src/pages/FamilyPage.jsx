import { useContext, useEffect, useState } from "react"
import { Navigate, useParams } from "react-router-dom"
import axios from "axios"
import AddMemberForm from "../AddMemberForm"
import { UserContext } from '../UserContext';

export default function FamilyPage() {
    const { id } = useParams()
    const [fam, setFam] = useState({})
    const [name, setName] = useState('')
    const [members, setMembers] = useState([])
    const { username, setUsername } = useContext(UserContext)
    const [redirect, setRedirect] = useState(false)
    const [parent, setParent] = useState(false)
    const bgFam = {
        backgroundImage: 'url("src/images/spoon.jpg")',
    
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
    function handleRemoveGroup() {
        alert("This group has been removed")
        axios.delete("/manage/" + id)
        setRedirect(true)
    }

    function handleRemoveMember(ev) {
        // for (let i = 0; i < members.length; i++) {
        //     if (members[i].member === ev.target.value) {
        //         // console.log(members[i].member)
        //         members.splice(i, 1)
        //     }
        // }
        const userRemoved = ev.target.value
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
        <div>
            {name && (
                <div>
                    <div className="flex justify-between">
                        <div className="capitalize">{name}'s Members</div>
                        <div className="text-sm">
                            <button onClick={handleRemoveGroup} className="text-sm px-2 hover:bg-red-500 m-2">Remove Group</button>
                        </div>
                    </div>
                    <div className="border p-2">
                        {fam && (members.map((member) => (
                            <div className="flex border justify-between">
                                <div className="mx-2">Name: {member.member}</div>
                                <div>Restrictions: {member.restrictions}</div>
                                <button value={member.member} onClick={handleRemoveMember} className="w-6 rounded-full hover:bg-red-500">X</button>
                            </div>
                        )))}
                        <AddMemberForm setParent={setParent} />
                    </div>
                </div>
            )}
        </div>
    )
}