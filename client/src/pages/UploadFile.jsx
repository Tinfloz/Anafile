import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useDispatch, useSelector } from 'react-redux';
import { searchUserCluster } from '../reducers/search/search.slice';
import { useParams } from 'react-router-dom';
import DynamicInputFields from '../components/DynamicInputFields';
import { resetFileHelpers, uploadAFileToCluster, resetFile } from '../reducers/file/file.slice';

const UploadFile = () => {

    const [file, setFile] = useState(null)
    const { id } = useParams();
    const [sendMembers, setSendMembers] = useState([]);
    const [types, setTypes] = useState([]);
    const dispatch = useDispatch();

    const formData = new FormData();

    const membersCallback = useCallback((members) => {
        setSendMembers(prevState => [...prevState, ...members]);
    }, []);

    const typesCallback = useCallback(type => {
        setTypes(prevState => [...prevState, ...type])
    }, [])

    useEffect(() => {
        return () => {
            dispatch(resetFile())
        }
    }, [])

    return (
        <>
            <div
                className='h-screen'
            >
                <Tabs variant='soft-rounded' colorScheme='purple' p="2vh" isLazy>
                    <TabList>
                        <Tab>Upload File</Tab>
                        <Tab>Set Members</Tab>
                        <Tab>Set Datatypes</Tab>
                        {
                            !file || sendMembers.length === 0 || types.length === 0 ?
                                (null) :
                                (
                                    <Tab>
                                        Confirm and upload
                                    </Tab>
                                )
                        }
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <div
                                className='flex justify-center items-center w-full h-[70vh] bg-purple-100'
                            >
                                <div className="flex items-center justify-center w-2/3">
                                    <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">XLSX DOCX</p>
                                        </div>
                                        <input id="dropzone-file" type="file" className="hidden"
                                            onChange={(e) => setFile(prevState => e.target.files[0])}
                                        />
                                    </label>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <SetClusterMembers id={id} setMemberCallback={membersCallback} />
                        </TabPanel>
                        <TabPanel>
                            <SetDataTypes callbackFn={typesCallback} />
                        </TabPanel>
                        <TabPanel>
                            <div
                                className='w-full h-[70vh] bg-red-100 flex justify-center items-center rounded-lg'
                            >
                                <div
                                    className='flex justify-center w-1/2 h-80 relative pt-20 bg-white rounded-md'
                                >
                                    <text
                                        className='font-semibold text-2xl text-center'
                                    >
                                        Are you sure you want to create and upload this file?
                                    </text>
                                    <div
                                        className='absolute bottom-0 p-4 w-full space-x-4'
                                    >
                                        <button
                                            onClick={async () => {
                                                formData.append("file", file);
                                                formData.append("types", JSON.stringify(types))
                                                formData.append("id", JSON.stringify(sendMembers))
                                                formData.append("clusterId", id)
                                                await dispatch(uploadAFileToCluster(formData));
                                                dispatch(resetFileHelpers());
                                            }}
                                            className='w-40 h-10 bg-violet-500 rounded-md transition hover:bg-violet-300 text-white font-bold'
                                        >
                                            Yes
                                        </button>
                                        <button
                                            className='w-40 h-10 bg-violet-500 rounded-md transition hover:bg-violet-300 text-white font-bold'
                                        >
                                            Start again
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </div>
        </>
    )
}

const SetClusterMembers = ({ id, setMemberCallback }) => {

    const dispatch = useDispatch();
    const { members } = useSelector(state => state.search);
    const firstRenderRef = useRef(true);
    const [query, setQuery] = useState("");
    const [membersSend, setMembersSend] = useState([]);
    const [membersDisplay, setMembersDisplay] = useState([]);

    useEffect(() => {
        if (firstRenderRef.current) {
            firstRenderRef.current = false;
            return
        };
        (async () => {
            let queryDetails = {
                id,
                query
            }
            await dispatch(searchUserCluster(queryDetails));
        })()
    }, [query])

    return (
        <>
            <div
                className='relative flex justify-center items-center bg-purple-100 w-full h-[70vh]'
            >
                <div
                    className='absolute w-full bottom-0 p-4 flex justify-center'
                >
                    <button
                        onClick={() => setMemberCallback(membersSend)}
                        className='w-40 h-10 bg-violet-500 rounded-md text-white font-bold transition hover:bg-violet-300'
                    >
                        Set members
                    </button>
                </div>
                <div
                    className='flex justify-center w-1/2 h-56 border-r border-gray-400'
                >
                    <div
                        className='w-full'
                    >
                        <div
                            className='flex justify-center items-center p-4'
                        >
                            <input
                                onChange={(e) => setQuery(prevState => e.target.value)}
                                placeholder='search cluster user'
                                className='w-80 h-10 rounded-md focus:outline-none p-5 '
                            />
                        </div>
                        {query && <div>
                            {
                                members?.map(el => (
                                    <div
                                        onClick={() => {
                                            setMembersSend(prevState => [...prevState, el._id]);
                                            setMembersDisplay(prevState => [...prevState, el]);
                                        }}
                                        className='flex justify-center font-semibold text-lg cursor-pointer'
                                    >
                                        {el?.name}
                                    </div>
                                ))
                            }
                        </div>}
                    </div>
                </div>
                <div
                    className='flex justify-center w-1/2 h-56'
                >
                    <div
                        className='w-full'
                    >
                        {
                            membersDisplay?.length === 0 ? (
                                <>
                                    <div
                                        className='flex justify-center p-3'
                                    >
                                        <text
                                            className='font-bold text-3xl text-center text-gray-400'
                                        >
                                            No members have been selected
                                        </text>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {
                                        membersDisplay?.map(el => (
                                            <div
                                                className='flex p-4'
                                            >
                                                <div
                                                    className='w-32 text-lg font-semibold'
                                                >
                                                    {el?.name}
                                                </div>
                                                <div
                                                    className='w-1/2'
                                                >
                                                    <button
                                                        onClick={() => {
                                                            setMembersDisplay(prevState => prevState.filter(element => element._id !== el._id));
                                                            setMembersSend(prevState => prevState.filter(element => element !== el._id));
                                                        }}
                                                        className="bg-red-300 w-20 text-white font-bold rounded-md"
                                                    >
                                                        X
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

const SetDataTypes = ({ callbackFn }) => {
    const [state, setState] = useState([1]);

    const [fields, setFields] = useState([]);

    const fieldsCallback = useCallback(field => {
        setFields(prevState => [...prevState, field])
    })

    return (
        <>
            <div
                className='relative h-[75vh] bg-yellow-100 flex justify-center p-3'
            >
                <div
                    className='absolute bottom-0 p-4 w-full space-x-4'
                >
                    <div className='inline-block'>
                        <button
                            onClick={() => setState(prevState => [...prevState, 1])}
                            className='bg-violet-500 text-white font-bold rounded-md transition hover:bg-violet-300 w-40 h-10'
                        >
                            Add field
                        </button>
                    </div>
                    <div className='inline-block'>
                        <button
                            disabled={state.length === 1}
                            onClick={() => {
                                setState(prevState => prevState.slice(0, -1));
                                setFields(prevState => prevState.slice(0, -1));
                            }}
                            className={`bg-violet-500 text-white font-bold rounded-md transition hover:bg-violet-300 w-40 h-10 ${state.length === 1 ? "cursor-not-allowed" : "cursor-pointer"}`}
                        >
                            Cancel
                        </button>
                    </div>
                    <div className='inline-block pl-[25vh]'>
                        <button
                            onClick={() => callbackFn(fields)}
                            className='w-40 h-10 bg-violet-500 text-white font-bold transition hover:bg-violet-300 rounded-md'
                        >
                            Set fields
                        </button>
                    </div>
                </div>
                <div
                    className='w-full'
                >
                    {
                        state?.map(el => (
                            <div
                                className='flex justify-center items-center'
                            >
                                <DynamicInputFields callbackFn={fieldsCallback} />
                            </div>
                        ))
                    }
                </div>
            </div >
        </>
    )
}


export default UploadFile