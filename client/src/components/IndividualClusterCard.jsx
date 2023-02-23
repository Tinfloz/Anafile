import React, { useState } from 'react'
import { getDate } from '../helpers/get.date'

const IndividualClusterCard = ({ cluster }) => {

    const [hover, setHover] = useState(false)

    return (
        <>
            <div
                className='w-2/3 h-80 border border-gray-200 rounded-lg flex'
            >
                <div
                    className='w-1/2 border-r border-gray-200 flex justify-center items-center'
                >
                    <text
                        className='text-4xl text-center text-gray-500 font-semibold'
                    >
                        {cluster?.name}
                    </text>
                </div>
                <div
                    className={`w-1/2 flex justify-center ${!hover ? "items-center" : "pt-10"}`}
                    onMouseOver={() => setHover(true)}
                    onMouseOut={() => setHover(false)}
                >
                    {!hover ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-36 h-36 fill-green-200 stroke-[0.5px] stroke-green-200">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
                    </svg> :
                        <div
                            className='w-full space-y-[-1vh]'
                        >
                            <div
                                className='flex justify-center'
                            >
                                <text
                                    className='text-3xl font-semibold text-center text-gray-400'
                                >
                                    Cluster stats:
                                </text>
                            </div>
                            <div
                                className='flex justify-start p-5 space-x-4'
                            >
                                <div className='w-1/2'>
                                    <text
                                        className='text-lg font-semibold text-center text-gray-700'
                                    >
                                        Total members:
                                    </text>
                                </div>
                                <div className='w-1/2'>
                                    <text
                                        className='text-lg font-semibold text-center text-gray-700'
                                    >
                                        {cluster?.members?.length}
                                    </text>
                                </div>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 stroke-green-300 fill-green-200">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                                    </svg>
                                </div>
                            </div>
                            <div
                                className='flex justify-start p-5 space-x-4'
                            >
                                <div className='w-1/2'>
                                    <text
                                        className='text-lg font-semibold text-center text-gray-700'
                                    >
                                        Total admins:
                                    </text>
                                </div>
                                <div className='w-1/2'>
                                    <text
                                        className='text-lg font-semibold text-center text-gray-700'
                                    >
                                        {cluster?.admin?.length}
                                    </text>
                                </div>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-indigo-400 fill-indigo-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                    </svg>
                                </div>
                            </div>
                            <div
                                className='flex justify-start p-5 space-x-4'
                            >
                                <div className='w-1/2'>
                                    <text
                                        className='text-lg font-semibold text-center text-gray-700'
                                    >
                                        Created on:
                                    </text>
                                </div>
                                <div className='w-1/2'>
                                    <text
                                        className='text-lg font-semibold text-center text-gray-700'
                                    >
                                        {getDate(cluster?.createdAt)}
                                    </text>
                                </div>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 stroke-red-200 fill-red-300">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default IndividualClusterCard