import React from 'react';
import { BeatLoader } from 'react-spinners';
import useFirebase from '../hooks/useFirebase';
import toast from 'react-hot-toast';
import clipboardCopy from 'clipboard-copy';
import SideBar from '../components/SideBar';
import InfoBubble from '../components/InfoBubble';

const UserRetraits = () => {
    const { data, loading, handleAction } = useFirebase("retraits");
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
        <div className='flex h-[100vh] items-center justify-center bg-white'>
            <div className="container mx-auto p-9 bg-white w-[1000px] h-[700px] overflow-auto rounded-md overflow-x-hidden">
                <div className='mt-[-80px]'>
                    <SideBar />
                </div>
                <div className=' mt-[70px]'>

                    <h2 className="text-2xl font-bold mb-4">Liste des retraits</h2>

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
                                        <tr key={item.id} className='text-center'>
                                            <td>{item.timestamp.toDate().toLocaleString()}</td>
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
                                                    onClick={() => handleAction(item.id, 'valider')}
                                                >
                                                    Accepter
                                                </button>
                                                <button
                                                    className='action red rounded-md shadow-lg bg-red-100'
                                                    onClick={() => handleAction(item.id, 'echouer')}
                                                >
                                                    Refuser
                                                </button>
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
