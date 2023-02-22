import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { accessLoginUserCluster, resetClusterHelpers } from '../reducers/cluster/cluster.slice';
import { useNavigate } from 'react-router-dom';

const MyClusterCard = ({ cluster }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [password, setPassword] = useState({
        password: ""
    });


    return (
        <>
            <div
                className='flex w-1/2 h-80 rounded-xl'
            >
                <div
                    className='flex justify-center items-center w-1/2 bg-yellow-100 rounded-xl'
                >
                    <text
                        className='text-3xl font-semibold text-center'
                    >
                        {cluster?.name}
                    </text>
                </div>
                <div
                    className='flex justify-center items-center w-1/2 bg-green-100 rounded-xl'
                >
                    <div
                        className='w-full space-y-5'
                    >
                        <div
                            className='flex justify-center items-center'
                        >
                            <input
                                onChange={(e) => setPassword(prevState => ({
                                    ...prevState,
                                    password: e.target.value
                                }))}
                                placeholder="access code"
                                className='w-60 h-10 rounded-md focus:outline-none border border-gray-100 p-5'
                            />
                        </div>
                        <div
                            className='flex justify-center items-center'
                        >
                            <button
                                onClick={async () => {
                                    const clusterDetails = {
                                        id: cluster._id,
                                        password,
                                    };
                                    navigate("/cluster", { state: clusterDetails })
                                }}
                                className='w-40 h-10 bg-red-300 text-white font-bold rounded-md transition hover:bg-red-100 focus:outline-none'
                            >
                                Enter
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyClusterCard    