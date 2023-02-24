import React, { useEffect } from 'react';
import IndividualFileCard from '../components/IndividualFileCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllLoginUserClusterFiles, resetFileHelpers } from '../reducers/file/file.slice';
import { useParams } from 'react-router-dom';
import { GridLoader } from 'react-spinners';

const ViewFiles = () => {

    const { clusterId } = useParams();
    const { file } = useSelector(state => state.file);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            await dispatch(getAllLoginUserClusterFiles(clusterId));
            dispatch(resetFileHelpers());
        })()
    }, [])

    return (
        <>
            <div
                className={`flex justify-center h-screen ${!file ? "items-center" : "pt-10"}`}
            >
                {
                    !file ? (
                        <>
                            <GridLoader />
                        </>
                    ) : (
                        <>
                            {
                                file?.length === 0 ? (
                                    <>
                                        <text
                                            className='text-4xl font-bold text-gray-400'
                                        >
                                            There are no files to display!
                                        </text>
                                    </>
                                ) : (
                                    <>
                                        {file?.map(el => (
                                            <IndividualFileCard file={el} />
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

export default ViewFiles