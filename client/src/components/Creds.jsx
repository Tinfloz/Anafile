import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser, resetAuthHelpers } from '../reducers/auth/auth.slice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Creds = ({ register }) => {

    const dispatch = useDispatch();
    const { isSuccess, isError } = useSelector(state => state.auth);

    const [creds, setCreds] = useState({
        email: "",
        password: "",
        name: ""
    });

    const handleChange = (e) => {
        setCreds(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        register ? await dispatch(registerUser(creds)) : await dispatch(loginUser(creds));
        setCreds(prevState => ({
            ...prevState,
            email: "",
            password: "",
            name: ""
        }));
    };

    const successToast = () => {
        toast.success('Successful!', {
            position: toast.POSITION.BOTTOM_LEFT
        });
    };

    const errorToast = () => {
        toast.error("Error!", {
            position: toast.POSITION.BOTTOM_LEFT
        });
    };

    useEffect(() => {
        if (isSuccess && isError) {
            return
        };
        if (isSuccess) {
            successToast();
        } else if (isError) {
            errorToast();
        };
        dispatch(resetAuthHelpers());
    }, [isSuccess, isError, dispatch])

    return (
        <>
            <div
                className='w-96 h-auto border border-gray-300 rounded-md pb-10'
            >
                <div
                    className='space-y-5'
                >
                    <div
                        className='flex justify-center items-center p-4'
                    >
                        <text
                            className={`font-semibold ${register ? "text-3xl" : "text-2xl"}`}
                        >
                            {
                                register ? "Register" : "Login to your Anafile account"
                            }
                        </text>
                    </div>
                    <div
                        className='flex justify-center items-center'
                    >
                        <input
                            placeholder="email"
                            onChange={handleChange}
                            value={creds.email}
                            name="email"
                            type="email"
                            className='w-60 h-10 rounded-md border border-gray-200 focus:outline-none p-4'
                        />
                    </div>
                    <div
                        className='flex justify-center items-center'
                    >
                        <input
                            placeholder="password"
                            onChange={handleChange}
                            value={creds.password}
                            name="password"
                            type="password"
                            className='w-60 h-10 rounded-md border border-gray-200 focus:outline-none p-4'
                        />
                    </div>
                    {register && <div
                        className='flex justify-center items-center'
                    >
                        <input
                            placeholder="name"
                            onChange={handleChange}
                            value={creds.name}
                            name="name"
                            type="text"
                            className='w-60 h-10 rounded-md border border-gray-200 focus:outline-none p-4'
                        />
                    </div>}
                    <div
                        className='flex justify-center items-center'
                    >
                        <button
                            onClick={onSubmit}
                            className='bg-red-300 w-40 h-10 font-semibold transition hover:bg-red-200 rounded-md text-white'
                        >
                            {register ? "Register" : "Login"}
                        </button>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    )
}

export default Creds