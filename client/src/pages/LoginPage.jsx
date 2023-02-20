import React from 'react'
import Creds from '../components/Creds'

const LoginPage = () => {
    return (
        <>
            <div
                className='flex justify-center items-center h-screen'
            >
                <Creds register={false} />
            </div>
        </>
    )
}

export default LoginPage