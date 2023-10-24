import { createContext, useState } from "react";

export const UsernameContext = createContext("");
export const UserNameContext = ({ children }) => {
    const [userName, setUserName] = useState(null)

    return (
        <UsernameContext.Provider value={[userName, setUserName]}>
            {children}
        </UsernameContext.Provider>
    )
}   