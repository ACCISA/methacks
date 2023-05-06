import { createContext, useEffect, useState } from "react";
import axios from "axios"
export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [username, setUsername] = useState(null);

    useEffect(() => {
        if (!username) {
            axios.get('/profile').then(({ data }) => {
                setUsername(data.username)
            })
        }
    }, [])

    return (
        <UserContext.Provider value={{ username, setUsername }}>
            {children}
        </UserContext.Provider>
    );
}