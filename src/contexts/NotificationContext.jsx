import { createContext, useContext, useState } from "react";

export const NotificationContext = createContext(false);

export const NotificationProvider = ({ children }) => {
    const [isActiveNotif, setIsActiveNotif] = useState(false);
    return (
        <NotificationContext.Provider value={[isActiveNotif, setIsActiveNotif]}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotif = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error("useNotif must be used within a NotificationProvider");
    }
    return context;
};