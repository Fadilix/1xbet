import React from 'react'
import UserHistory from '../components/UserHistory'
import { motion } from 'framer-motion'
import SideBar from '../components/SideBar'
import InfoBubble from '../components/InfoBubble'
import Notification from '../components/Notification'

const HistoriqueRetraits = () => {
    return (
        <motion.div
            className='flex flex-row justify-center space-x-2 ml-[100px] h-[100vh] bg-white'
        >
            <SideBar />
            <UserHistory collectionName="retraits" />
            <InfoBubble />
            <Notification />
        </motion.div>
    )
}

export default HistoriqueRetraits;