import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

export default function FamilyPage() {
    const { id } = useParams()
    const [fam, setFam] = useState({})
    const [name, setName] = useState('')
    const [members, setMembers] = useState([])
    useEffect(() => {
        if (!id) return;
        axios.get("/manage/" + id)
            .then(({ data }) => {
                console.log("Asd")
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

    }, [])


    return (
        <div>
            {name && (
                <div>
                    <div>{name}'s Members</div>
                    <div className="border p-2">
                        {fam && (members.map((member) => (
                            <div className="flex border">
                                <div className="mx-2">Name: {member.member}</div>
                                <div>Restrictions: {member.restrictions}</div>

                            </div>
                        )))}
                    </div>
                </div>
            )}
        </div>
    )
}