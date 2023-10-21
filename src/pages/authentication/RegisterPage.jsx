import React, { useState } from 'react'
import { motion } from "framer-motion"
import Messi from "../../assets/Messi.avif"
import Validate from '../../utils/validate';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';
const RegisterPage = () => {

    const [isVisible, setIsVisible] = useState(false);
    const [errors, setErrors] = useState({})
    const handleShowVisibility = () => {
        setIsVisible(!isVisible);
    }

    const users = [
        {}
    ]


    const [values, setValues] = useState({
        nom: "",
        password: "",
        contact: "",
    });

    const handleInputChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }


    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = Validate(values);
        setErrors(validationErrors);
        setIsLoading(true)
        axios.post('https://4dfe-102-64-162-218.ngrok-free.app/api/admin/create', values)
            .then(response => {
                setIsLoading(false)
                console.log(response);
                toast.success('Inscription réussie!');
                navigate("/")
            })
            .catch(error => {
                console.error("Error during registration:", error);
                toast.error("une erreur s'est produite, réessayer !");
                setIsLoading(false)
            });
    }
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] overflow-x-hidden mt-[60px] md:mt-[10px]'
        >

            <div className='bg-gray-200 flex flex-row rounded-xl p-2  mb-[10px]'>
                {/* the image */}
                <div className='left bg-cover w-[600px] rounded-xl mr-[30px] hidden lg:block' >
                    <img src={Messi} alt="" className='w-full h-full object-cover rounded-xl ' />
                </div>


                {/* the form */}
                <div className="right bg-white rounded-xl md:p-[70px] p-[40px] ">
                    {/* For maybe the logo later */}
                    {/* <img src="" alt="" /> */}
                    <h1 className='text-4xl font-bold text-center mb-[10px] mt-[-40px]'>Inscription</h1>
                    <p className='text-center mb-[30px]'>Veuillez remplir les champs ci-dessous</p>
                    <form action="" onSubmit={handleSubmit} className=''>
                        <div className='border-b border-black mb-[10px] mt-[-20px]'>
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

                        <div className='absolute w-full h-3'>
                            <p className='text-red-400'>{errors.nom && <span>{errors.nom}</span>}</p>
                        </div>



                        <div className='border-b border-black mb-[10px] mt-[40px]'>
                            <label htmlFor="" className=''>Numéro de téléphone</label>
                            <div className='bg-transparent flex flex-row pr-[10px] items-center justify-between'>
                                <input
                                    type="text"
                                    className='bg-transparent focus:outline-none border-none'
                                    value={values.contact}
                                    onChange={handleInputChange}
                                    name='contact'
                                />
                            </div>
                        </div>

                        {/* Validation message */}

                        <div className='absolute w-full h-3'>
                            <p className='text-red-400'>{errors.contact && <span>{errors.contact}</span>}</p>
                        </div>



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
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                        </svg>
                                    }

                                    {!isVisible &&
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
                                            <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                                            <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                                            <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                                        </svg>
                                    }
                                </button>
                            </div>
                        </div>
                        {/* Validation message */}

                        <div className='absolute z-0 h-3'>
                            <p className='text-red-400'>{errors.password && <span>{errors.password}</span>}</p>
                        </div>

                        <div className='text-center mt-[60px] mb-[10px]'>
                            {isLoading ? (
                                <BeatLoader loading={isLoading} />
                            ) : (

                                <button
                                    type="submit"
                                    className='w-full text-center bg-black text-white rounded-md p-[8px] font-bold text-xl hover:translate-x-1 transition duration-300'
                                >
                                    Sign up
                                </button>
                            )}
                        </div>

                        <div className='flex flex-row items-center justify-between mt-[2Opx]'>
                            <p className='text-[16px]'>Déjà inscrit ?</p>
                            <button className='text-blue-500 font-bold hover:text-blue-700 transition duration-300'><Link to="/">Se connecter</Link></button>
                        </div>
                    </form>
                </div>
            </div>

        </motion.div>
    )
}

export default RegisterPage;