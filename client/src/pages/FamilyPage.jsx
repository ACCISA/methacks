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
                let entries = Object.entries(data.members)
                let dataFetch = entries.map(([key, val] = entry) => {

                })
                let dataArr = []
                for (const index in data.members) {
                    dataArr.push(data.members[index])
                }
                setMembers(dataArr)
            })

    }, [])


    return (
        <div>
            {name && (
                <div>
                    <div>{name}'s Members</div>
                    <div className="border">
                        {fam && (members.map((member) => (
                            <div>{member}</div>
                        )))}
                    </div>
                </div>
            )}
        </div>
    )
}