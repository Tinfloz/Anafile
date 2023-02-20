import React from 'react'
import Creds from '../components/Creds'

const RegisterPage = () => {
    return (
        <>
            <div
                className='flex justify-center items-center h-screen'
            >
                <Creds register={true} />
            </div>
        </>
    )
}

export default RegisterPage