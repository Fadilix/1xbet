import { createContext, useState } from "react";

export const AuthContext = createContext();
const LoginContext = ({ children }) => {
    const [IsLoggedIn, setIsLoggedIn] = useState(false);
    // console.log(IsLoggedIn)
    return (
        <AuthContext.Provider value={[IsLoggedIn, setIsLoggedIn]}>
            {children}
        </AuthContext.Provider>
    )

}

export default LoginContext