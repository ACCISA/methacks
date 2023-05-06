import { useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

export default function FamilyPage() {
    const { id } = useParams()
    const [members, setMembers] = useState([])
    useEffect(() => {
        if (!id) return;
        axios.get("/manage/" + id)
            .then((data) => {
                setMembers(data)
            })

    }, [])
    return (
        <div>
            <div>NAME's Members</div>
            <div className="border">

            </div>

        </div>
    )
}