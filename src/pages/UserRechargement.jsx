import React from 'react';
import { BeatLoader } from 'react-spinners';
import clipboardCopy from 'clipboard-copy';
import toast from 'react-hot-toast';
import useFirebase from '../hooks/useFirebase';
import SideBar from '../components/SideBar';
import InfoBubble from '../components/InfoBubble';

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

const ActionButton = ({ onClick, className, text }) => (
  <button className={className} onClick={onClick}>
    {text}
  </button>
);

// const name = window.location.pathname.split("/")[2]
const UserRechargement = () => {
  const { data, loading, handleAction } = useFirebase("demandes");
  const handleCopyClick = async (item, property) => {
    await clipboardCopy(item[property]);
    toast.success("copié avec succès");
  };

  return (
    <div className='flex h-[100vh] items-center justify-center bg-white'>
      <div className='bg-white p-[20px] w-[1000px] h-[90vh] overflow-auto rounded-md scrollbar'>
        <div className='mt-[-60px]'>
          <SideBar/>
        </div>
        <div className="container mx-auto p-4 mt-[60px]">
          <h2 className="text-2xl font-bold mb-4">Liste des demandes</h2>

          {loading ? (
            <div className="flex justify-center items-center h-[100vh]">
              <BeatLoader color={'#36D7B7'} loading={loading} size={25} />
            </div>
          ) : (
            <table className="min-w-full">
              <thead>
                <tr className='text-center'>
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
                  .filter(item => item.etat === "0")
                  .map((item) => (
                    <tr key={item.id}>
                      <td className='text-center'>
                        {item.timestamp ? (
                          item.timestamp.toDate().toLocaleString()
                        ) : (
                          "N/A"
                        )}
                      </td>
                      <td className='text-center'>
                        <button
                          onClick={() => handleCopyClick(item, "compte")}
                          className='hover:text-gray-400 transition duration-300 ml-[40px]'
                        >
                          {item.compte}
                        </button>
                      </td>

                      <td className='text-center'>
                        <button
                          onClick={() => handleCopyClick(item, "numero")}
                          className='hover:text-gray-400 transition duration-300 ml-[40px]'
                        >
                          {item.numero}
                        </button>
                      </td>

                      <td className='text-center'>
                        <button
                          onClick={() => handleCopyClick(item, "montant")}
                          className='hover:text-gray-400 transition duration-300 ml-[20px]'
                        >
                          {item.montant}
                        </button>
                      </td>
                      <td className='text-center' >
                        <div className={`${getStatusColor(item.etat)} w-6 h-6 rounded-xl ml-6`}></div>
                      </td>
                      <td className="p-2 flex justify-center items-center">
                        <ActionButton
                          className='action green mr-2 rounded-md bg-green-100 font-bold shadow-lg'
                          onClick={() => { handleAction(item.id, 'valider') }}
                          text="Accepter"
                        />
                        <ActionButton
                          className='action red rounded-md bg-red-100 font-bold shadow-lg'
                          onClick={() => { handleAction(item.id, 'echouer') }}
                          text="Refuser"
                        />
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

export default UserRechargement;
