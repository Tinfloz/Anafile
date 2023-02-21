import React from 'react'

const HomeCard = ({ text, buttonText }) => {
    return (
        <>
            <div
                className='flex justify-center items-center w-1/2 h-80 bg-indigo-100 rounded-md border border-gray-200'
            >
                <div
                    className='w-full h-auto space-y-5'
                >
                    <div
                        className='flex items-center justify-center'
                    >
                        <text
                            className='font-semibold text-3xl'
                        >
                            {text}
                        </text>
                    </div>
                    <div
                        className='flex items-center justify-center'
                    >
                        <button
                            className='bg-red-300 w-40 h-10 font-bold text-white rounded-md transition hover:bg-red-200 focus:outline-none'
                        >
                            {buttonText}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeCard