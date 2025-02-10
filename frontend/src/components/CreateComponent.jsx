import React from 'react'
import { BsTrash } from 'react-icons/bs'
import Element from './Element'
import Table from './Table'
import List from './List'

const CreateComponent = ({ info, current_component, removeComponent, duplicateSlide, setUpdateList }) => {

    const randValue = Math.floor(Math.random() * 100)
    let html = ''

    if (info.name === 'main_frame') {
        html = (
            <div
                id={randValue}
                onClick={() => info.setCurrentComponent(info)}
                className="hover:border-[2px] hover:border-indigo-500 shadow-md"
                style={{
                    width: info.width + 'px',
                    height: info.height + 'px',
                    background: info.color,
                    zIndex: info.z_index,
                }}
            >
                {info.image && (
                    <img className="w-full h-full" src={info.image} alt="image info" />
                )}

                <Element id={randValue} info={info} exId="" />

                {current_component.id === info.id && (
                    <div className="flex space-x-2 mt-2 justify-end">
                        <div
                            onClick={() => removeComponent(info.id, 'slide')}
                            className="flex items-center justify-center w-10 h-10 bg-red-100 rounded-full hover:bg-red-200 cursor-pointer"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 text-red-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.136 21H7.864a2 2 0 01-1.997-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V4a1 1 0 011-1h6a1 1 0 011 1v3"
                                />
                            </svg>
                        </div>

                        <div
                            onClick={() => duplicateSlide(info.id)}
                            className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full hover:bg-blue-200 cursor-pointer"
                        >
                            <svg
                                xmlns="http://www.w3.org/200/svg"
                                className="w-6 h-6 text-blue-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                />
                            </svg>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    if (info.name === 'shape' && info.type === 'rect') {
        html = <div id={randValue} onClick={() => info.setCurrentComponent(info)} style={{
            width: info.width + 'px',
            height: info.height + 'px',
            background: info.color,
            opacity: info.opacity,
            left: info.left + 'px',
            top: info.top + 'px',
            zIndex: info.z_index,
            transform: info.rotate ? `rotate(${info.rotate}deg)` : 'rotate(0deg)',
        }}
            className='absolute group hover:border-[2px] hover:border-indigo-500'
        >
            <Element id={randValue} info={info} exId="" />
            {
                current_component.id === info.id && <div onClick={() => removeComponent(info.id)} className='px-3 py-2 bg-white absolute top-0 hidden group-hover:block cursor-pointer rounded-md'>
                    <BsTrash />
                </div>
            }

        </div>
    }

    if (info.name === 'shape' && info.type === 'circle') {
        html = <div id={randValue} onClick={() => info.setCurrentComponent(info)} style={{

            left: info.left + 'px',
            top: info.top + 'px',
            zIndex: info.z_index,
            transform: info.rotate ? `rotate(${info.rotate}deg)` : 'rotate(0deg)',
        }}
            className='absolute group hover:border-[2px] hover:border-indigo-500'
        >
            <Element id={randValue} info={info} exId={`${randValue}c`} />
            <div id={`${randValue}c`} className='rounded-full' style={{
                width: info.width + 'px',
                height: info.width + 'px',
                background: info.color,
                opacity: info.opacity,

            }}>

            </div>
            {
                current_component.id === info.id && <div onClick={() => removeComponent(info.id)} className='px-3 py-2 bg-white absolute top-0 hidden group-hover:block cursor-pointer rounded-md'>
                    <BsTrash />
                </div>
            }

        </div>
    }

    if (info.name === 'shape' && info.type === 'trangle') {
        html = <div id={randValue} onClick={() => info.setCurrentComponent(info)} style={{

            left: info.left + 'px',
            top: info.top + 'px',
            zIndex: info.z_index,
            transform: info.rotate ? `rotate(${info.rotate}deg)` : 'rotate(0deg)',
        }}
            className='absolute group hover:border-[2px] hover:border-indigo-500'
        >
            <Element id={randValue} info={info} exId={`${randValue}t`} />
            <div id={`${randValue}t`} style={{
                width: info.width + 'px',
                height: info.height + 'px',
                background: info.color,
                opacity: info.opacity,
                clipPath: 'polygon(50% 0,100% 100%,0 100%)'

            }}>

            </div>
            {
                current_component.id === info.id && <div onClick={() => removeComponent(info.id)} className='px-3 py-2 bg-white absolute top-0 hidden group-hover:block cursor-pointer rounded-md'>
                    <BsTrash />
                </div>
            }

        </div>
    }

    if (info.name === 'text') {
        html = <div id={randValue} onClick={() => info.setCurrentComponent(info)} style={{

            left: info.left + 'px',
            top: info.top + 'px',
            zIndex: info.z_index,
            transform: info.rotate ? `rotate(${info.rotate}deg)` : 'rotate(0deg)',
            padding: info.padding + 'px',
            color: info.color,
            opacity: info.opacity,
        }}
            className='absolute group hover:border-[2px] hover:border-indigo-500'
        >
            <Element id={randValue} info={info} exId="" />

            <h2 style={{ fontSize: info.font + 'px', fontWeight: info.weight }} className='w-full h-full'>{info.title}</h2>

            {
                current_component.id === info.id && <div onClick={() => removeComponent(info.id)} className='px-3 py-2 bg-white absolute top-0 hidden group-hover:block cursor-pointer rounded-md'>
                    <BsTrash />
                </div>
            }

        </div>
    }

    if (info.name === 'code') {
        html = <div id={randValue} onClick={() => info.setCurrentComponent(info)} style={{

            left: info.left + 'px',
            top: info.top + 'px',
            zIndex: info.z_index,
            transform: info.rotate ? `rotate(${info.rotate}deg)` : 'rotate(0deg)',
            padding: info.padding + 'px',
            color: info.color,
            backgroundColor: '#2a2b2c',
            fontFamily: 'Source Code Pro',
            opacity: info.opacity,
        }}
            className='absolute group hover:border-[2px] hover:border-indigo-500'
        >
            <Element id={randValue} info={info} exId="" />

            <h2 style={{ fontSize: info.font + 'px', fontWeight: info.weight }} className='w-full h-full'>{info.title}</h2>

            {
                current_component.id === info.id && <div onClick={() => removeComponent(info.id)} className='px-3 py-2 bg-white absolute top-0 hidden group-hover:block cursor-pointer rounded-md'>
                    <BsTrash />
                </div>
            }

        </div>
    }

    if (info.name === 'list') {
        html = (
            <div
                id={randValue}
                onClick={() => info.setCurrentComponent(info)}
                style={{
                    left: info.left + 'px',
                    top: info.top + 'px',
                    zIndex: info.z_index,
                    padding: info.padding + 'px',
                    color: info.color,
                    backgroundColor: '#fff',
                    fontFamily: 'Source Code Pro',
                    opacity: info.opacity,
                }}
                className="absolute group hover:border-[2px] hover:border-indigo-500"
            >
                <List
                    initialItems={info.listItems || []}
                    isOrdered={info.isOrdered}
                    updateListData={setUpdateList}
                />

                {current_component.id === info.id && (
                    <div
                        onClick={() => removeComponent(info.id)}
                        className="px-3 py-2 bg-white absolute top-0 hidden group-hover:block cursor-pointer rounded-md"
                    >
                        <BsTrash />
                    </div>
                )}
            </div>
        );
    }

    if (info.name === 'table') {
        html = (
            <div
                id={randValue}
                onClick={() => info.setCurrentComponent(info)}
                style={{
                    left: info.left + 'px',
                    top: info.top + 'px',
                    zIndex: info.z_index,
                    transform: info.rotate ? `rotate(${info.rotate}deg)` : 'rotate(0deg)',
                    padding: info.padding + 'px',
                    color: info.color,
                    backgroundColor: '#fff',
                    fontFamily: 'Source Code Pro',
                    opacity: info.opacity,
                }}
                className="absolute group hover:border-[2px] hover:border-indigo-500"
            >
                <Element id={randValue} info={info} exId="" />

                <Table
                    rows={info.rows}
                    columns={info.columns}
                    tableData={info.tableData}
                    updateTableData={(updatedData) => {
                        info.setCurrentComponent({
                            ...info,
                            tableData: updatedData, // Actualizar los datos en el estado principal
                        });
                    }}
                    maximo = "max-w-28"
                />

                {current_component.id === info.id && (
                    <div
                        onClick={() => removeComponent(info.id)}
                        className="px-3 py-2 bg-white absolute top-0 hidden group-hover:block cursor-pointer rounded-md"
                    >
                        <BsTrash />
                    </div>
                )}
            </div>
        );
    }


    if (info.name === 'image') {
        html = <div id={randValue} onClick={() => info.setCurrentComponent(info)} style={{

            left: info.left + 'px',
            top: info.top + 'px',
            zIndex: info.z_index,
            transform: info.rotate ? `rotate(${info.rotate}deg)` : 'rotate(0deg)',
            opacity: info.opacity,
        }}
            className='absolute group hover:border-[2px] hover:border-indigo-500'
        >
            <Element id={randValue} info={info} exId={`${randValue}img`} />
            <div id={`${randValue}img`} style={{
                width: info.width + 'px',
                height: info.height + 'px',
                borderRadius: `${info.radius}%`

            }}>

                <img className='w-full h-full' src={info.image} alt="image" />

            </div>
            {
                current_component.id === info.id && <div onClick={() => removeComponent(info.id)} className='px-3 py-2 bg-white absolute top-0 hidden group-hover:block cursor-pointer rounded-md'>
                    <BsTrash />
                </div>
            }

        </div>
    }

    return html

}

export default CreateComponent
