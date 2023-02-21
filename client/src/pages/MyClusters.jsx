import React, { useEffect } from 'react';
import MyClusterCard from '../components/MyClusterCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllLoginUserClusters, resetClusterHelpers } from '../reducers/cluster/cluster.slice';
import { GridLoader } from "react-spinners";

const MyClusters = () => {

    const { cluster } = useSelector(state => state.cluster);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            await dispatch(getAllLoginUserClusters());
            dispatch(resetClusterHelpers());
        })()
    }, [])

    return (
        <>
            <div
                className={`h-screen flex justify-center ${!cluster ? "pt-80" : "pt-10"}`}
            >
                {
                    !cluster ? (
                        <>
                            <GridLoader />
                        </>
                    ) : (
                        <>
                            {
                                cluster?.length === 0 ? (
                                    <>
                                        <text
                                            className='font-bold text-4xl text-gray-300'
                                        >
                                            There are no clusters to display!
                                        </text>
                                    </>
                                ) : (
                                    <>
                                        {cluster?.map(el => (
                                            <MyClusterCard cluster={el} />
                                        ))}
                                    </>
                                )
                            }
                        </>
                    )
                }
            </div>
        </>
    )
}

export default MyClusters