import React, { useState } from 'react';

const DynamicInputFields = ({ callbackFn }) => {

    const [field, setField] = useState({
        name: "",
        dataType: ""
    });

    return (
        <>
            <div
                className='flex w-2/3 h-20 mb-5'
            >
                <div
                    className='w-1/2 flex justify-center items-center border-r border-gray-200'
                >
                    <input
                        name="name"
                        value={field.name}
                        onChange={(e) => setField(prevState => ({ ...prevState, name: e.target.value }))}
                        placeholder="field name"
                        className='w-80 h-10 border border-gray-200 rounded-md focus:outline-none p-4'
                    />
                </div>
                <div
                    className='w-1/2 flex justify-center items-center'
                >
                    <select onChange={(e) => setField(prevState => ({ ...prevState, dataType: e.target.value }))} id="countries" className="border border-gray-200 text-gray-400 rounded-md focus:outline-none w-80 h-10">
                        <option selected>choose datatype</option>
                        <option value="string">String</option>
                        <option value="number">Number</option>
                        <option value="boolean">Boolean</option>
                    </select>
                </div>
                <div
                    className='flex justify-center items-center'
                >
                    <button
                        disabled={!field.name || !field.dataType}
                        onClick={() => callbackFn(field)}
                        className={`bg-red-400 rounded-md text-white font-bold transition hover:bg-red-300 w-40 h-10 ${!field.name || !field.dataType ? "cursor-not-allowed" : "cursor-pointer"}`}
                    >
                        Add
                    </button>
                </div>
            </div>
        </>
    )
}

export default DynamicInputFields