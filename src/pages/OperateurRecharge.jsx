import React, { useContext } from 'react'
import InfoBubble from '../components/InfoBubble';
import { motion } from 'framer-motion';
import { BeatLoader } from 'react-spinners';
import useFirebase from '../hooks/useFirebase';
import SideBar from '../components/SideBar';
import toast from 'react-hot-toast';
import clipboardCopy from 'clipboard-copy';
import Notification from '../components/Notification';
import { UsernameContext } from '../contexts/UsernameContext';
import useFirebaseVerif from '../hooks/useFirebaseVerif';
const OperateurRecharge = () => {
    const { data, loading, handleAction } = useFirebase("demandes")
    const { verifdata, handleVerif } = useFirebaseVerif("demandes")
    const [userName, setUserName] = useContext(UsernameContext);
    const getStatusColor = (etat) => {
        switch (etat) {
            case "1":
                return "bg-green-400";
            case "0":
                return "bg-blue-400";
            case "2":
                return "bg-red-400";
            case "4":
                return "bg-yellow-400";
            case "-1":
                return "bg-purple-400";
        }
    }

    const handleCopyClick = async (item, property) => {
        await clipboardCopy(item[property]);
        toast.success("copié avec succès");
    };


    // const name = window.location.pathname.split("/")[2]

    return (

        <div className='flex h-[100vh] items-center justify-end pr-[50px] bg-white' >
            <Notification />
            <motion.div className="flex ">
                <div className='mt-[-20px]'>
                    <SideBar />
                </div>
                <div className='bg-white p-[20px] w-[1200px] overflow-auto rounded-md h-[750px]'>
                    <div className="container mx-auto p-4">
                        <h2 className="text-4xl font-bold mb-10 text-center">Liste des demandes</h2>

                        {loading ? (
                            <div className="flex justify-center items-center h-[100vh]">
                                <BeatLoader color={'#36D7B7'} loading={loading} size={25} />
                            </div>
                        ) : (
                            <table className="min-w-full">
                                <thead>
                                    <tr>
                                        <th className="p-2 text-center">Date</th>
                                        <th className="p-2 text-center">Numéro de compte</th>
                                        <th className="p-2 text-center">Numéro de téléphone</th>
                                        <th className="p-2 text-center">Action</th>
                                        <th className="p-2 text-center">Montant</th>
                                        <th className='p-2'>Statut</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.filter(item => item.etat === "-1")
                                        .map((item) => (
                                            <tr key={item.id} className={`${item.traitement === "-1" && "bg-gray-100"}`}>
                                                <td className="p-2 text-center">
                                                    {item.timestamp ? item.timestamp.toDate().toLocaleString() : (
                                                        <p>No date</p>
                                                    )}
                                                </td>
                                                <td className="p-2 text-center">
                                                    <button
                                                        onClick={() => handleCopyClick(item, "compte")}
                                                        className='hover:text-gray-400 transition duration-300'
                                                    >
                                                        {!item.compte ? <p>Pas de compte</p> : <p>{item.compte}</p>}
                                                    </button>
                                                </td>

                                                <td className=" p-2 text-center">
                                                    <button
                                                        className='hover:text-gray-400 transition duration-300'
                                                        onClick={() => handleCopyClick(item, "numero")}>
                                                        {!item.numero ? <p>Pas de numero</p> : <p>{item.numero}</p>}
                                                    </button>
                                                </td>
                                                <td className="p-2 text-center flex justify-center space-x-2">
                                                    <button
                                                        className='action green rounded-md bg-purple-100 font-bold shadow-lg'
                                                        onClick={
                                                            () => {
                                                                handleAction(item.id, 'accepter')
                                                                handleVerif(item.id, { operaName: userName })
                                                            }
                                                        }
                                                    >
                                                        Accepter
                                                    </button>

                                                    <button
                                                        className='action bg-red-100 green rounded-md font-bold shadow-lg hover:bg-red-500'
                                                        onClick={
                                                            () => {
                                                                handleAction(item.id, 'refuser')
                                                                handleVerif(item.id, { operaName: userName })
                                                            }
                                                        }
                                                    >
                                                        Refuser
                                                    </button>

                                                    <button
                                                        className='action bg-blue-100 green rounded-md font-bold shadow-lg hover:bg-blue-500'
                                                        onClick={() => handleVerif(item.id, { traitement: "-1" })}
                                                    >
                                                        Traiter
                                                    </button>


                                                </td>


                                                <td>
                                                    <button
                                                        className='hover:text-gray-400 transition duration-300 text-center ml-[25px]'
                                                        onClick={() => handleCopyClick(item, "montant")}
                                                    >
                                                        {item.montant}

                                                    </button>
                                                </td>
                                                <td className=''>
                                                    <div className={`${getStatusColor(item.etat)} w-6 h-6 rounded-xl ml-6`}></div>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
                <InfoBubble />
            </motion.div>
        </div>

    );
};


export default OperateurRecharge;