import { createContext, useContext, useState } from "react";

const SideBarContext = createContext();



export const SideBarStateProvider = ({ children }) => {
    const [showSideBar, setShowSideBar] = useState(true);
    return (
        <SideBarContext.Provider value={[showSideBar, setShowSideBar]}>
            {children}
        </SideBarContext.Provider>
    )
}


export const useSideBarState = () => {
    const context = useContext(SideBarContext);
    return context;
}