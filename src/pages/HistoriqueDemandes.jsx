import React from 'react'
import UserHistory from '../components/UserHistory'
import { motion } from 'framer-motion'
import SideBar from '../components/SideBar'
import InfoBubble from '../components/InfoBubble'
import Notification from '../components/Notification'

const HistoriqueDemandes = () => {
    return (
        <motion.div
            className='flex flex-row justify-center space-x-2 h-[100vh] ml-[100px] bg-white'
        >
            <SideBar />
            <UserHistory collectionName="demandes" />
            <InfoBubble />
            <Notification />
        </motion.div>
    )
}

export default HistoriqueDemandes