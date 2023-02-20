import React from 'react';
import { useNavigate } from 'react-router-dom';

const Splash = () => {

    const navigate = useNavigate();

    return (
        <>
            <div
                className='flex justify-center items-center h-screen bg-red-100 space-x-[-40vh]'
            >
                <div
                    className='flex justify-center items-center w-screen bg-red-100 space-x-[10vh]'
                >
                    <div
                        className='flex justify-center items-center w-80 h-80 bg-blue-100 rotate-45'
                    >
                        <div
                            className='flex justify-center items-center w-72 h-72 bg-indigo-300 -rotate-[45deg]'
                        >
                            <div
                                className='w-full space-y-4'
                            >
                                <div
                                    className='flex justify-center items-center'
                                >
                                    <text
                                        className='font-semibold'
                                    >
                                        Login to your Anafile account!
                                    </text>
                                </div>
                                <div
                                    className='flex justify-center items-center'
                                >
                                    <button
                                        onClick={() => navigate("/login")}
                                        className='bg-white w-20 h-10 font-semibold rounded-md transition hover:bg-gray-200'
                                    >
                                        Login
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className='flex justify-center items-center w-80 h-80 bg-blue-100 rotate-45'
                    >
                        <div
                            className='flex justify-center items-center w-72 h-72 bg-indigo-300 -rotate-[45deg]'
                        >
                            <div
                                className='w-full space-y-4'
                            >
                                <div
                                    className='flex justify-center items-center'
                                >
                                    <text
                                        className='font-semibold'
                                    >
                                        Register to use Anafile!
                                    </text>
                                </div>
                                <div
                                    className='flex justify-center items-center'
                                >
                                    <button
                                        onClick={() => navigate("/register")}
                                        className='bg-white w-24 h-10 font-semibold rounded-md transition hover:bg-gray-200'
                                    >
                                        Register
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Splash