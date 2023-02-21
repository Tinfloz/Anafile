import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { resetSearch, searchAnafileUsers } from '../reducers/search/search.slice';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const successToast = () => {
    toast.success('Successful!', {
        position: toast.POSITION.BOTTOM_LEFT
    });
};

const CreateCluster = () => {

    const [details, setDetails] = useState({
        name: null,
        members: null
    });

    const nameCallback = useCallback((name) => {
        setDetails(prevState => ({
            ...prevState,
            name
        }))
    }, [])

    const membersCallback = useCallback((memberArray) => {
        setDetails(prevState => ({
            ...prevState,
            members: memberArray
        }))
    }, [])

    return (
        <>
            <div
                className='h-screen'
            >
                <Tabs variant='soft-rounded' colorScheme='purple' p="2vh" isLazy>
                    <TabList>
                        <Tab>Set Name</Tab>
                        <Tab>Set Members</Tab>
                        {
                            details.name && details.members ? (
                                <>
                                    <Tab>
                                        Confirm
                                    </Tab>
                                </>
                            ) : (null)
                        }
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <SetName onClickCallback={nameCallback} />
                        </TabPanel>
                        <TabPanel>
                            <SetMembers onClick={membersCallback} />
                        </TabPanel>
                        <TabPanel>
                            <Confirm details={details} />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </div>
        </>
    )
}

// set name 
const SetName = ({ onClickCallback }) => {

    const [name, setName] = useState("")

    return (
        <>
            <div
                className='flex justify-center items-center bg-red-100 w-full h-[75vh] rounded-2xl'
            >
                <div
                    className='w-1/2 h-60 border border-gray-100 bg-white rounded-[10vh] space-y-5'
                >
                    <div
                        className='flex justify-center items-center p-4'
                    >
                        <text
                            className='text-3xl font-semibold'
                        >
                            Set Name of Cluster
                        </text>
                    </div>
                    <div
                        className='flex justify-center items-center'
                    >
                        <input
                            placeholder='set name'
                            onChange={e => setName(prevState => e.target.value)}
                            className='w-80 h-10 border border-gray-200 focus:outline-none p-5 rounded-md'
                        />
                    </div>
                    <div
                        className='flex justify-center items-center'
                    >
                        <button
                            onClick={() => {
                                onClickCallback(name);
                                successToast();
                            }}
                            className='bg-indigo-500 text-white font-bold w-40 h-10 rounded-md transition hover:bg-indigo-300'
                        >
                            Set Name
                        </button>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    )
}

// set members
const SetMembers = ({ onClick }) => {

    const firstRenderRef = useRef(true);
    const { members } = useSelector(state => state.search);
    const [membersArray, setMembersArray] = useState([]);
    const [sendMembers, setSendMembers] = useState([]);
    const [query, setQuery] = useState(null)
    const dispatch = useDispatch();

    useEffect(() => {
        if (firstRenderRef.current) {
            firstRenderRef.current = false;
            return
        };
        (async () => {
            await dispatch(searchAnafileUsers(query))
        })()
    }, [query, dispatch])

    return (
        <>
            <div
                className='relative flex justify-center items-center bg-red-100 w-full h-[75vh] rounded-2xl space-x-5'
            >
                <div
                    className='flex justify-center items-center p-4 absolute w-full bottom-0'
                >
                    <button
                        onClick={() => {
                            onClick(sendMembers);
                            successToast();
                        }}
                        className='w-52 h-10 bg-indigo-500 transition hover:bg-indigo-300 text-white font-semibold rounded-md'
                    >
                        Set cluster members
                    </button>
                </div>
                <div
                    className='bg-indigo-200 w-[60vh] h-80 flex justify-center p-6'
                >
                    <div
                        className='w-full space-y-3'
                    >
                        <div
                            className='flex justify-center'
                        >
                            <input
                                placeholder="Search"
                                onChange={(e) => setQuery(prevState => e.target.value)}
                                className='w-80 h-10 border border-gray-100 rounded-lg focus:outline-none p-5'
                            />
                        </div>
                        {query &&
                            <div
                                className='flex justify-center h-auto w-80'
                            >
                                <div
                                    className='w-full'
                                >
                                    {
                                        members?.map(el => (
                                            <div
                                                className='flex justify-center items-center'
                                            >
                                                <text
                                                    onClick={() => {
                                                        setMembersArray(prevState => [...prevState, el]);
                                                        setSendMembers(prevState => [...prevState, el?._id])
                                                    }}
                                                    className='font-semibold text-xl cursor-pointer'
                                                >
                                                    {el?.name}
                                                </text>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div
                    className='bg-indigo-200 w-[60vh] h-80 flex justify-center p-6'
                >
                    {
                        membersArray.length === 0 ? (
                            <>
                                <text
                                    className='font-bold text-2xl text-center'
                                >
                                    No members have been selected for this cluster!
                                </text>
                            </>
                        ) : (
                            <div
                                className='w-full'
                            >
                                {
                                    membersArray.map(el => (
                                        <div
                                            className='flex justify-center space-x-1 mb-5'
                                        >
                                            <div className='w-24'>
                                                <text
                                                    className='font-semibold text-xl'
                                                >
                                                    {el?.name}
                                                </text>
                                            </div>
                                            <div>
                                                <button
                                                    className='bg-red-300 text-white font-semibold w-24 h-8 rounded-lg 
                                                    transition hover:bg-red-200'
                                                    onClick={() => {
                                                        setMembersArray(prevState => prevState.filter(element => element._id !== el._id))
                                                    }}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        )
                    }
                </div>
                <ToastContainer />
            </div>
        </>
    )
}

const Confirm = ({ details }) => {

    const navigate = useNavigate();

    return (
        <>
            <div
                className='bg-red-100 w-full h-[75vh] rounded-2xl flex justify-center items-center'
            >
                <div
                    className='w-1/2 h-80 bg-white relative rounded-3xl'
                >
                    <div
                        className='absolute bottom-0 p-5 flex justify-start space-x-3'
                    >
                        <button
                            className='w-40 h-10 bg-indigo-500 transition hover:bg-indigo-300 rounded-md text-white font-bold'
                        >
                            Create cluster
                        </button>
                        <button
                            onClick={() => {
                                navigate("/home");
                            }}
                            className='w-40 h-10 bg-indigo-500 transition hover:bg-indigo-300 rounded-md text-white font-bold'
                        >
                            Start again
                        </button>
                    </div>
                    <div
                        className='flex justify-center items-center pt-24'
                    >
                        <text
                            className='font-semibold text-2xl'
                        >
                            Are you sure you want to create this cluster?
                        </text>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateCluster