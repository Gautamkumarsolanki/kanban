import React, { useState } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import Item from './Item';
import { addTask } from './api';

export default function Column({ title, index, data, setData, boardData }) {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFromData] = useState({ title: "", description: ""});
    const submitHandler = async (e) => {
        e.preventDefault();
        setShowForm(false);
        await addTask(title, {...formData,id:boardData["nextId"]});
        setData({ ...boardData, [title]: [...data, {...formData,id:boardData["nextId"]}], nextId: boardData["nextId"] + 1 })
        setFromData({ title: "", description: "" })
    }

    return (
        <div className='flex flex-col'>
            <div className='flex justify-between rounded-md bg-blue-900 px-2 xs:w-[16rem] md:w-72 lg:w-80'>
                <p className='font-semibold uppercase rounded-md py-2 text-white'>{title}</p>
                <button onClick={() => setShowForm(true)} className='hover:bg-blue-950 rounded-md h-6 mt-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.6} stroke="white" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>
            </div>
            <div style={{ maxHeight:'32rem'}} className='xs:w-[16rem] md:w-72 lg:w-80 bg-slate-200 border-2 flex flex-col space-y-4 rounded-md overflow-auto example'>
                {showForm &&
                    <form className='mx-1.5 pt-4 rounded-md' onSubmit={submitHandler}>
                        <textarea name="title" value={formData.title} onChange={(e) => setFromData({ ...formData, [e.target.name]: e.target.value })} required className='bg-sky-100 text-md font-medium rounded-md placeholder:text-gray-800 p-1' rows={1} cols={39} placeholder='title' />
                        <textarea name='description' value={formData.description} onChange={(e) => setFromData({ ...formData, [e.target.name]: e.target.value })} className='bg-sky-100 text-md font-medium rounded-md placeholder:text-gray-800 p-1' rows={3} cols={39} placeholder='description' />
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
                <Droppable droppableId={index.toString()}>
                    {
                        (provided) => (

                            <div {...provided.droppableProps} ref={provided.innerRef} className={`flex flex-col space-y-2 mx-1 pb-4 pt-2`}>
                                {
                                    data && data.map((ele, i) => {
                                        return <Item key={i} data={ele} boardData={boardData} columnName={title} setData={setData} index={i} cIndex={index} />;
                                    })
                                }
                                {provided.placeholder}
                            </div>
                        )
                    }
                </Droppable>
            </div>
        </div>
    )
}
