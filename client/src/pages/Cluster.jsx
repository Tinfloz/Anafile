import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { accessLoginUserCluster, resetCluster } from '../reducers/cluster/cluster.slice';
import { GridLoader } from 'react-spinners';
import IndividualClusterCard from '../components/IndividualClusterCard';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cluster = () => {

    const { state } = useLocation();
    const navigate = useNavigate();
    const { isError, cluster } = useSelector(state => state.cluster)
    const dispatch = useDispatch();

    const errorToast = () => {
        toast.error("Incorrect password", {
            position: toast.POSITION.BOTTOM_LEFT
        });
    };

    useEffect(() => {
        (async () => {
            await dispatch(accessLoginUserCluster(state))
        })()
    }, [])

    useEffect(() => {
        if (!isError) {
            return
        };
        if (isError) {
            errorToast();
            setTimeout(() => { navigate("/my/clusters") }, 3000)
        }
    }, [isError, navigate])

    useEffect(() => {
        return () => {
            dispatch(resetCluster())
        }
    }, [dispatch])

    return (
        <>
            <div
                className={`flex justify-center ${!cluster ? "items-center" : "pt-20"} h-screen`}
            >
                <ToastContainer />
                {
                    !cluster || Array.isArray(cluster) ? (
                        <>
                            <GridLoader />
                        </>
                    ) : (
                        <>
                            <div
                                className='w-full space-y-4'
                            >
                                <div
                                    className='flex justify-center items-center'
                                >
                                    <IndividualClusterCard cluster={cluster} />
                                </div>
                                <div
                                    className='flex justify-center items-center'
                                >
                                    <div
                                        className='w-2/3 h-80 border border-gray-200 rounded-lg flex'
                                    >
                                        <div
                                            className='flex w-1/2 justify-center items-center border-r border-gray-200'
                                        >
                                            <button
                                                className='w-40 h-10 rounded-md bg-violet-400 transition hover:bg-violet-200 text-white font-bold'
                                            >
                                                View Files
                                            </button>
                                        </div>
                                        <div
                                            className='flex w-1/2 justify-center items-center'
                                        >
                                            <button
                                                onClick={() => navigate(`/upload/file/${cluster._id}`)}
                                                className='w-40 h-10 rounded-md bg-violet-400 transition hover:bg-violet-200 text-white font-bold'
                                            >
                                                Upload a file
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
        </>
    )
}

export default Cluster