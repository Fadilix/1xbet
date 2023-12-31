import React, { useContext, useState } from 'react'
import Admin from "../assets/admin.png"
import { Link } from 'react-router-dom';
import useFirebase from '../hooks/useFirebase';
import { UsernameContext } from '../contexts/UsernameContext';
import { useUserRole } from '../contexts/UserRoleContext';
import { useSideBarState } from '../contexts/SideBarContext';

const SideBar = () => {
    const [showSideBar, setShowSideBar] = useSideBarState();

    const handleShowSideBar = () => {
        setShowSideBar(!showSideBar);
    }

    const getDemandesData = () => {
        const { data } = useFirebase("demandes")
        return data
    }

    const getRetraitsData = () => {
        const { data } = useFirebase("retraits")
        return data
    }

    const getCount = (data, etatValue) => data.filter(item => item.etat === etatValue).length;
    const rechargeCount = getCount(getDemandesData(), "0");
    const retraitsCount = getCount(getRetraitsData(), "0");
    const operateurRecharge = getCount(getDemandesData(), "-1");
    const operateurRetraits = getCount(getRetraitsData(), "-1");
    // console.log(`
    //     rechargecount ${rechargeCount}
    //     retraitsCount ${retraitsCount}
    //     operateurRecharge ${operateurRecharge}
    //     operateurRetraits ${operateurRetraits}
    // `)

    // console.log(rechargeCount);

    const [userName, setUserName] = useContext(UsernameContext)
    const { userRole, setRole } = useUserRole();
    const handleOperationClick = () => { }
    return (
        <div className={`${showSideBar ? "w-64" : "w-20"} bg-gray-800 text-white transition-all duration-300 fixed left-0`} style={{ height: "120vh" }}>
            <div className={`flex items-center ${showSideBar ? "justify-between" : "justify-end"}`}>
                {showSideBar && <div className="p-4 text-xl font-bold">Dashboard</div>}
                <button className='mr-[10px] font-bold text-sm text-right' onClick={handleShowSideBar}>{showSideBar ?
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    :
                    <svg className='' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                }
                </button>
            </div>

            <div className='m-[10px] flex flex-row items-center justify-left space-x-4'>
                {/* image */}
                <img src={Admin} alt="Photo de profil" className='rounded-[50%] h-[50px] w-[50px]' />
                {showSideBar && <p className='font-bold'>{userName}</p>}
            </div>
            <ul className={`${!showSideBar && "flex flex-col items-center justify-center space-y-10 mt-10"}`}>
                {userRole === "1" && (
                    <>
                        <button onClick={handleOperationClick} className={`${showSideBar ? "w-full" : ""} object-cover`}>
                            <Link to={`/home/${userName}/rechargements`}>
                                {showSideBar ?
                                    <li className="p-4 hover:bg-gray-700 transition duration-200 cursor-pointer pr-[180px] flex space-x-4">
                                        <p>Rechargements</p>
                                        {rechargeCount > 0 &&
                                            <div className='bg-blue-400 absolute right-4 rounded-[50%] p-2 w-[25px] h-[25px] flex items-center'>
                                                <p>{rechargeCount}</p>
                                            </div>}
                                    </li>
                                    : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>

                                }
                            </Link>
                        </button>


                        <button onClick={handleOperationClick} className={`${showSideBar ? "w-full" : ""} object-cover`}>
                            <Link to={`/home/${userName}/retraits`}>
                                {showSideBar ?
                                    <li className="p-4 hover:bg-gray-700 transition duration-200 cursor-pointer pr-[180px] flex items-center">
                                        <p>Retraits</p>
                                        {retraitsCount > 0 &&
                                            <div className='bg-blue-400 absolute right-4 rounded-[50%] p-2 w-[25px] h-[25px] flex items-center'>
                                                {retraitsCount}
                                            </div>}
                                    </li>
                                    : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                                    </svg>
                                }
                            </Link>
                        </button>
                    </>
                )}

                {userRole === "2" && (
                    <>
                        <button onClick={handleOperationClick} className={`${showSideBar ? "w-full" : ""}`}>
                            <Link to={`/home/${userName}/operateur/rechargements`} className=''>
                                {showSideBar ?
                                    <li className="p-4 hover:bg-gray-700 transition duration-200 cursor-pointer pr-[180px] text-blue-400 flex items-center">
                                        <p>(O)Rechargements</p>
                                        {operateurRecharge > 0 &&
                                            <div className='bg-blue-400 absolute right-4 rounded-[50%] p-2 w-[25px] h-[25px] flex items-center text-white'>
                                                {operateurRecharge}
                                            </div>}
                                    </li>
                                    : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>

                                }
                            </Link>
                        </button>

                        <button onClick={handleOperationClick} className={`${showSideBar ? "w-full" : ""} object-cover`}>
                            <Link to={`/home/${userName}/operateur/retraits`}>
                                {showSideBar ?
                                    <li className="p-4 hover:bg-gray-700 transition duration-200 cursor-pointer pr-[180px] text-blue-400 flex items-center">
                                        <p>(O)Retraits</p>
                                        {operateurRetraits > 0 &&
                                            <div className='bg-blue-400 absolute right-4 rounded-[50%] p-2 w-[25px] h-[25px] flex items-center text-white'>
                                                {operateurRetraits}
                                            </div>}
                                    </li>
                                    : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                                    </svg>
                                }
                            </Link>
                        </button>
                    </>
                )}

                <button className={`${showSideBar ? "w-full" : ""} text-start `}>
                    <Link to={`/historique/${userName}/demandes`}>
                        {showSideBar ?
                            <li className="p-4 hover:bg-gray-700 transition duration-200 cursor-pointer">Historique des demandes</li>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 svg">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        }
                    </Link>
                </button>

                <button className={`${showSideBar ? "w-full" : ""} text-start `}>
                    <Link to={`/historique/${userName}/retraits`}>
                        {showSideBar ?
                            <li className="p-4 hover:bg-gray-700 transition duration-200 cursor-pointer">Historique des retraits</li>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 svg">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        }
                    </Link>
                </button>
            </ul>
        </div>
    )
}

export default SideBar