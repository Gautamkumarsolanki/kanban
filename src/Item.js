import React, { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { deleteTask, updateTask } from './api';

export default function Item({ index, data, cIndex, setData, boardData, columnName }) {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFromData] = useState({ ...data });
    const deleteHandler = async () => {
        let newCol = boardData[columnName];
        newCol.splice(index, 1);
        await deleteTask(columnName, newCol);
        setData({ ...boardData, [columnName]: newCol });
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        let updatedCol = [...boardData[columnName]];
        updatedCol[index] = formData;
        await updateTask(columnName, updatedCol);
        setShowForm(false);
        setData({ ...boardData, [columnName]: updatedCol });
    }
    return (
        <div>
            {!showForm ?

                <Draggable draggableId={index.toString() + cIndex.toString()} index={index}>
                    {
                        (provided) => (
                            <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                <div className='border-2 border-blue-900 rounded-md p-1 flex flex-col bg-sky-50'>
                                    <div className='flex justify-between'>
                                        <p onClick={() => { setShowForm(true) }} className='text-md font-medium bg-blue-100 p-1 rounded-md w-[17.2rem] line-clamp-1'>{data["title"]}</p>
                                        <button onClick={deleteHandler} className='self-start'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 hover:w-5 hover:h-5 h-4 ml-0.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div onClick={() => { setShowForm(true) }} className='flex justify-between pt-3'>
                                        <p className='text-xs font-medium mt-1'>Id:{data["id"]}</p>
                                        <div className='h-5 w-5 font-medium rounded-full bg-orange-400 text-xs pl-[3px] pt-[1.8px]'>GS</div>
                                    </div>
                                </div>
                            </div>
                        )
                    }

                </Draggable>
                : <form className='rounded-md' onSubmit={submitHandler}>
                    <textarea className='bg-sky-100 text-md font-medium rounded-md placeholder:text-gray-900 p-1' onChange={(e) => { setFromData({ ...formData, "title": e.target.value }) }} value={formData.title} rows={1} cols={35} placeholder='title' />
                    <textarea className='bg-sky-100 text-md font-medium rounded-md placeholder:text-gray-800 p-1' onChange={(e) => { setFromData({ ...formData, "description": e.target.value }) }} value={formData.description} rows={3} cols={35} placeholder='description' />
                    <div className='flex justify-end space-x-2'>
                        <button onClick={() => setShowForm(false)} type='button' className='bg-blue-800 rounded-md hover:bg-blue-900'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        </button>
                        <button type='submit' className='bg-blue-800 rounded-md hover:bg-blue-900'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        </button>
                    </div>
                </form>
            }
        </div >
    )
}

