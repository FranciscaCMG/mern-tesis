import React from 'react'

const Element = ({id, info, exId}) => {

    return (
        <>
            <div onMouseDown={() => info.moveElement(id, info)} className='hidden absolute group-hover:block -top-[3px] left-[50%] translate-[-50%,0%] w-[10px] h-[10px] cursor-nw-resize bg-green-500 z-[99999]'></div>
            <div onMouseDown={() => info.moveElement(id, info)} className='hidden absolute group-hover:block top-[50%] -left-[3px] translate-[-0%,50%] w-[10px] h-[10px] cursor-nw-resize bg-green-500 z-[99999]'></div>
            <div onMouseDown={() => info.moveElement(id, info)} className='hidden absolute group-hover:block top-[50%] -right-[3px] translate-[-0%,50%] w-[10px] h-[10px] cursor-nw-resize bg-green-500 z-[99999]'></div>
            <div onMouseDown={() => info.moveElement(id, info)} className='hidden absolute group-hover:block -bottom-[3px] left-[50%] translate-[-50%,0%] w-[10px] h-[10px] cursor-nw-resize bg-green-500 z-[99999]'></div>
        </>
    )
}

export default Element
