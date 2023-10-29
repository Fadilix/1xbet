import { createContext, useContext, useState } from "react";

const InfoBubbleContext = createContext();

export const BubbleStateProvider = ({ children }) => {
    const [bubble, setBubble] = useState(false)
    return (
        <InfoBubbleContext.Provider value={[bubble, setBubble]}>
            {children}
        </InfoBubbleContext.Provider>
    )
}


export const useBubble = () => {
    const context = useContext(InfoBubbleContext)
    return context;
}