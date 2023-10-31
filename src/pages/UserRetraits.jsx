import React, { useContext } from 'react';
import { BeatLoader } from 'react-spinners';
import useFirebase from '../hooks/useFirebase';
import toast from 'react-hot-toast';
import clipboardCopy from 'clipboard-copy';
import SideBar from '../components/SideBar';
import InfoBubble from '../components/InfoBubble';
import Notification from '../components/Notification';
import { UsernameContext } from '../contexts/UsernameContext';
import useFirebaseVerif from '../hooks/useFirebaseVerif';

const UserRetraits = () => {
    const { data, loading, handleAction } = useFirebase("retraits");
    const { verifdata, handleVerif } = useFirebaseVerif("retraits")
    const [userName, setUserName] = useContext(UsernameContext);
    const handleCopyClick = async (item, property) => {
        await clipboardCopy(item[property]);
        toast.success("copié avec succès");
    };

    const getStatusColor = (etat) => {
        switch (etat) {
            case "1":
                return "bg-green-400"
                break;
            case "0":
                return "bg-blue-400"
                break;
            case "2":
                return "bg-red-400"
                break;
            case "4":
                return "bg-yellow-400"
                break;
            case "-1":
                return "bg-purple-400"
                break;
        }
    }

    return (
        <div className='flex h-[100vh] items-center justify-center bg-white w-[100vw]'>
            <Notification />
            <div className="container flex justify-end mx-auto p-9 bg-white w-[1400px] h-[700px] overflow-auto rounded-md overflow-x-hidden">
                <div className='absolute top-0'>
                    <SideBar />
                </div>
                <div className='w-[1100px]'>
                    <h2 className="text-4xl font-bold mb-[40px] text-center mt-[-10px]">Liste des retraits</h2>

                    {loading ? (
                        <div className="flex justify-center items-center h-[100vh]">
                            <BeatLoader color={'#36D7B7'} loading={loading} size={25} />
                        </div>
                    ) : (
                        <table className="min-w-full">
                            <thead>
                                <tr>
                                    <th className='p-2 text-center'>Date</th>
                                    <th className='p-2 text-center'>Numéro de compte</th>
                                    <th className='p-2 text-center'>Numéro de téléphone</th>
                                    <th className='p-2 text-center'>Montant</th>
                                    <th className='p-2 text-center'>Statut</th>
                                    <th className="p-2 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data
                                    .filter((item) => item.etat === "0")
                                    .map((item) => (
                                        <tr key={item.id} className={`${item.traitement === "-1" && "bg-gray-100"} text-center`}>
                                            <td className='pl-[10px]'>{item.timestamp.toDate().toLocaleString()}</td>
                                            <td className="p-2 m-2 text-center">
                                                <button
                                                    onClick={() => handleCopyClick(item, "compte")}
                                                    className='hover:text-gray-400 transition duration-300'
                                                >
                                                    {item.compte}
                                                </button>
                                            </td>

                                            <td className="p-2 m-2 text-center">
                                                <button
                                                    onClick={() => handleCopyClick(item, "numero")}
                                                    className='hover:text-gray-400 transition duration-300'
                                                >
                                                    {item.numero}
                                                </button>
                                            </td>
                                            <td className="p-2 m-2">
                                                <button
                                                    onClick={() => handleCopyClick(item, "montant")}
                                                    className='hover:text-gray-400 transition duration-300'
                                                >
                                                    {item.montant}
                                                </button>
                                            </td>
                                            <td className="p-2 m-2 text-center">
                                                <div className={`${getStatusColor(item.etat)} w-6 h-6 rounded-xl ml-[15px]`}></div>
                                            </td>
                                            <td className="p-2 flex m-2 items-center justify-center">
                                                <button
                                                    className='action green mr-2 rounded-md shadow-lg bg-green-100'
                                                    onClick={
                                                        () => {
                                                            handleAction(item.id, 'valider')
                                                            handleVerif(item.id, { verifName: userName })
                                                        }
                                                    }
                                                >
                                                    Accepter
                                                </button>
                                                <button
                                                    className='action red rounded-md shadow-lg bg-red-100'
                                                    onClick={() => {
                                                        handleAction(item.id, 'echouer')
                                                        handleVerif(item.id, { verifName: userName })
                                                    }
                                                    }
                                                >
                                                    Refuser
                                                </button>

                                                {item.traitement !== "-1" && (
                                                    <button
                                                        className='action bg-blue-100 green rounded-md font-bold shadow-lg hover:bg-blue-500 ml-[10px]'
                                                        onClick={() => handleVerif(item.id, { traitement: "-1" })}
                                                    >
                                                        Traiter
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    )}
                </div>

            </div>
            <InfoBubble />
        </div>
    );
};

export default UserRetraits;
