import React, { useState } from 'react';
import { BeatLoader } from 'react-spinners';
import CopyToClipboardButton from '../components/CopyToClipBoard';
import useFirebase from '../hooks/useFirebase';

const UserHistory = ({ collectionName }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const { data, loading } = useFirebase(collectionName);
    // Filter data based on search query
    const filteredData = data.filter(item =>
        item.clientName.toLowerCase().includes(searchQuery.toLowerCase())
    );

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

    return (
        <div className='bg-white p-[20px] w-[100vw] flex justify-end h-[750px] overflow-auto rounded-md mt-[20px]'>
            <div className="container p-4 w-[1200px] mr-[30px]">
                <div className='flex space-x-4 items-center justify-between'>
                    <h2 className="text-2xl font-bold mb-4">Historique des {collectionName}</h2>
                    {/* Search */}
                    <input
                        type="text"
                        placeholder="Rechercher un client"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border p-2 mb-4 rounded-xl transition duration-300"
                    />
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-[100vh]">
                        <BeatLoader color={'#36D7B7'} loading={loading} size={25} />
                    </div>
                ) : (
                    <table className="min-w-full">
                        <thead>
                            <tr>
                                <th className="p-2 text-center">Date</th>
                                <th className="p-2 text-center">Nom du client</th>
                                <th className="p-2 text-center">Numéro de compte</th>
                                <th className="p-2 text-center">Numéro de téléphone</th>
                                <th className="p-2 text-center">Montant</th>
                                <th className="p-2 text-center">Opérateur</th>
                                <th className="p-2 text-center">Validateur</th>
                                <th className='p-2 text-center'>Statut</th>
                                <th className='p-2 text-center'>Copier</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData
                                .filter((data) => data.etat === "1" || data.etat === "2" || data.etat === "4")
                                .reverse()
                                .map((item) => (
                                    <tr key={item.id} className='h-[70px] text-center'>
                                        <td className='text-center'>{item.timestamp ? (
                                            <p>{item.timestamp.toDate().toLocaleString()}</p>
                                        ) : (<p>Pas de date fourni</p>)}</td>
                                        <td className="p-2">
                                            {!item.clientName ? <p>pas de nom</p> : <p>{item.clientName}</p>}
                                        </td>

                                        <td>{item.compte}</td>
                                        <td>{item.numero}</td>
                                        <td>{item.montant}</td>
                                        <td>{item.operaName}</td>
                                        <td>{item.verifName}</td>
                                        <td className=''>
                                            <div className={`${getStatusColor(item.etat)} w-6 h-6 rounded-xl ml-6`}></div>
                                        </td>
                                        <td className=''>
                                            <CopyToClipboardButton
                                                accountNumber={item.compte}
                                                client={item.clientName}
                                                amount={item.montant}
                                                date={item.timestamp ? item.timestamp.toDate().toLocaleString() : "Pas de date fourni"}
                                                operator={item.operaName}
                                                validator={item.verifName}
                                            />
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default UserHistory;