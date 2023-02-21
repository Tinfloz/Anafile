import React from 'react'
import HomeCard from '../components/HomeCard'

const Home = () => {
    return (
        <>
            <div
                className='h-screen flex justify-center pt-20'
            >
                <div
                    className='w-full space-y-5'
                >
                    <div
                        className='flex justify-center items-center'
                    >
                        <HomeCard text={"Create a new cluster"} buttonText={"Create"} />
                    </div>
                    <div
                        className='flex justify-center items-center'
                    >
                        <HomeCard text={"View your clusters here!"} buttonText={"View Clusters"} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home