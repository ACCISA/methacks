import { createContext, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [username, setUsername] = useState(null);
    return (
        <UserContext.Provider value={{ username, setUsername }}>
            {children}
        </UserContext.Provider>
    );
}