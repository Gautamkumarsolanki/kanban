import React from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import Column from './Column'
import { moveTask } from './api';
export default function Board({ data, setData }) {
    const onDragEnd = (e) => {
        if (e.source && e.destination) {
            let sourceCol = data[data["order"][Number(e.source.droppableId)]];
            let destCol = data[data["order"][Number(e.destination.droppableId)]];
            let dataMoved = sourceCol[Number(e.source.index)];
            sourceCol.splice(Number(e.source.index), 1);
            destCol.splice(Number(e.destination.index), 0, dataMoved);
            moveTask(data["order"][Number(e.source.droppableId)], data["order"][Number(e.destination.droppableId)], sourceCol, destCol);
            setData({ ...data, [data["order"][Number(e.source.droppableId)]]: sourceCol, [data["order"][Number(e.destination.droppableId)]]: destCol });
        }
    }
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className='flex xs:space-x-4 md:space-x-8 lg:space-x-20 overflow-x-auto'>
                {
                    data && data.order.map((ele, index) => {
                        return <Column data={data[ele]} boardData={data} setData={setData} key={index} title={ele} index={index} />
                    })
                }
            </div>
        </DragDropContext>
    )
}
