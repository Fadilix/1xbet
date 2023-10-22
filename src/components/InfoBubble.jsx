import React, { useState } from 'react'

const InfoBubble = () => {
    const [isVisible, setIsVisible] = useState(false);
    return (
        <div className='fixed right-[1%] bottom-[4%] '>
            <button onClick={() => setIsVisible(!isVisible)} className='hover:scale-[1.5] transition-all duration-300 text-blue-400'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                </svg>
            </button>

            {isVisible &&
                <div className='absolute bottom-[150%] right-[20%] w-[300px] bg-gray-100 p-4 rounded-xl transition-all duration-300 border border-black'>
                    <p className='text-2xl mb-[10px] font-bold'>Statut</p>
                    <div className='flex items-center space-x-4' >
                        <div className='bg-blue-400 w-4 h-4 rounded-xl'></div>
                        <p>Prêt pour validation</p>
                    </div>

                    <div className='flex items-center space-x-4' >
                        <div className='bg-purple-400 w-4 h-4 rounded-xl'></div>
                        <p>En attente de traitement</p>
                    </div>

                    <div className='flex items-center space-x-4'>
                        <div className='bg-green-400 w-4 h-4 rounded-xl'></div>
                        <p>Accepté</p>
                    </div>

                    <div className='flex items-center space-x-4' >
                        <div className='bg-red-400 w-4 h-4 rounded-xl'></div>
                        <p>Opération Refusée</p>
                    </div>

                    <div className='flex items-center space-x-4' >
                        <div className='bg-yellow-400 w-4 h-4 rounded-xl'></div>
                        <p>Payement échoué</p>
                    </div>

                </div>
            }
        </div>
    )
}

export default InfoBubble;