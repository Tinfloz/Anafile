import React from 'react'

const IndividualFileCard = ({ file }) => {
    return (
        <>
            <div
                className='rounded-lg w-1/2 h-80 bg-yellow-200 overflow-hidden flex'
            >
                <div
                    className='flex justify-center items-center w-1/2 border-r border-gray-200'
                >
                    <text
                        className='text-4xl font-bold text-center text-white'
                    >
                        {file?.fileName}
                    </text>
                </div>
                <div
                    className='flex justify-center items-center w-1/2 border-r border-gray-200'
                >
                    <div
                        className='space-y-4'
                    >
                        <div
                            className='w-full  flex justify-center'
                        >
                            <input
                                placeholder='access code'
                                className='w-72 h-10 rounded-md focus:outline-none p-4 border border-gray-100'
                            />
                        </div>
                        <div
                            className='w-full flex justify-center'
                        >
                            <button
                                className='bg-white rounded-md w-40 h-10 border-2 border-green-200 text-green-400 font-bold transition hover:bg-gray-200'
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

export default IndividualFileCard