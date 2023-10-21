import React, { useContext, useState } from 'react'
import { motion } from "framer-motion"
import Ronaldo from "../../assets/Ronaldo.jpg"
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { BeatLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import { AuthContext } from '../../contexts/LoginContext';
import { UsernameContext } from '../../contexts/UsernameContext';

const LoginPage = () => {
    const [isVisible, setIsVisible] = useState(false);
    const handleShowVisibility = () => {
        setIsVisible(!isVisible);
    }

    // checking the auth state
    const [IsLoggedIn, setIsLoggedIn] = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false);

    const [values, setValues] = useState({
        nom: "",
        password: ""
    });

    const [userName, setUserName] = useContext(UsernameContext)
    const navigate = useNavigate()
    const handleInputChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    const [errors, setErrors] = useState({})

    const handleLoginClick = async (e) => {
        if (!values.nom || !values.password) {
            toast.error("Veuillez remplir tous les champs")
            setErrors({ error: "Tous les champs sont obligatoires" })
        } else {
            setIsLoading(true)
            e.preventDefault();
            try {
                const response = await axios.post("https://apitest.eshapshop.com/api/admin/login", values)
                setIsLoading(false)
                setErrors(errors);
                if (response.data.connect === true) {
                    setUserName(values.nom)
                    setIsLoggedIn(true);
                    // console.log(IsLoggedIn)
                    navigate(`/home/${userName}/rechargements`);
                    toast.success("Bienvenue");
                } else {
                    setErrors({ error: response.data.error })

                }
            } catch (e) {
                setErrors({ error: "Vérifier votre connexion et réessayer" });
                setIsLoading(false)
                toast.error("Votre connexion n'est pas stable");
                console.log("Erreur lors de la recherche des données");
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] overflow-x-hidden transition duration-300'
        >
            <div className='bg-gray-200 flex flex-row rounded-xl p-2'>
                {/* the image */}
                <div className='left bg-cover w-[600px] rounded-xl mr-[30px] hidden lg:block' >
                    <img src={Ronaldo} alt="" className='w-full h-full object-cover rounded-xl ' />
                </div>

                {/* the form */}
                <div className="right bg-white rounded-xl md:p-[70px] p-[40px] ">
                    {/* For maybe the logo later */}
                    {/* <img src="" alt="" /> */}
                    <h1 className='text-4xl font-bold text-center mb-[10px]'>Bienvenue !</h1>
                    <p className='text-center mb-[30px]'>Veuillez remplir les champs ci-dessous</p>
                    <form action="" onSubmit={handleSubmit} className=''>
                        <div className='border-b border-black mb-[10px]'>
                            <label htmlFor="" className=''>Nom</label>
                            <div className='bg-transparent flex flex-row pr-[10px] items-center justify-between'>
                                <input
                                    type="text"
                                    className='bg-transparent focus:outline-none border-none'
                                    value={values.nom}
                                    onChange={handleInputChange}
                                    name='nom'
                                />
                            </div>
                        </div>

                        {/* Validation message */}

                        <div className='mt-[40px]'>
                            <label htmlFor="">Mot de passe</label>
                            <div className='bg-transparent flex flex-row pr-[10px] items-center justify-between border-b border-black'>
                                <input
                                    type={isVisible ? "text" : "password"}
                                    className='focus:outline-none bg-transparent'
                                    value={values.password}
                                    onChange={handleInputChange}
                                    name='password'
                                />

                                <button onClick={handleShowVisibility}>
                                    {isVisible &&
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                        </svg>
                                    }

                                    {!isVisible &&
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                                            <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                                            <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                                            <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                                        </svg>
                                    }
                                </button>
                            </div>
                        </div>


                        <div className='text-center mt-[30px] mb-[10px]'>
                            {isLoading ? (

                                <BeatLoader />
                            ) : (
                                <button
                                    type="submit"
                                    className='text-xl font-bold w-full text-center border border-black text-black bg-transparent rounded-md p-[8px] login transition duration-300'
                                    onClick={handleLoginClick}
                                >
                                    Login
                                </button>
                            )}
                        </div>


                        <div className='absolute w-full h-3'>
                            <p className='text-red-400'>{errors.error && <span>{errors.error}</span>}</p>
                        </div>
                    </form>
                </div>
            </div>

        </motion.div>
    )
}

export default LoginPage;