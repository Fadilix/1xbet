import React from 'react'
import UserHistory from '../components/UserHistory'
import { motion } from 'framer-motion'
import SideBar from '../components/SideBar'
import InfoBubble from '../components/InfoBubble'
import Notification from '../components/Notification'

const Historique = () => {
    return (
        <motion.div
            className='flex flex-row justify-center space-x-2 ml-[100px]'
        >
            <SideBar />
            <UserHistory collectionName="demandes" />
            <UserHistory collectionName="retraits" />
            <InfoBubble />
            <Notification />
        </motion.div>
    )
}

export default Historique