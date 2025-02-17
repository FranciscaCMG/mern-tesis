import React, { useRef } from 'react'
import Element from './Element'
import Table from './Table'
import List from './List'

const CreateComponent = ({ info, current_component, removeComponent, duplicateSlide, setUpdateList }) => {

    const randValue = Math.floor(Math.random() * 100)
    let html = ''

    const textRef = useRef(null);

    if (info.name === 'main_frame') {
        html = (
            <div
                id={randValue}
                onClick={() => info.setCurrentComponent(info)}
                className="hover:border-[2px] hover:border-indigo-500 shadow-md"
                ref={textRef}
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
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
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
            className={ current_component.id === info.id ? 'absolute group border-[2px] border-indigo-500' : 'absolute group hover:border-[2px] hover:border-indigo-500'}
        >
            <Element id={randValue} info={info} exId="" />

            <h2 style={{whiteSpace: 'pre-line', textAlign: info.textAlign }} className={`w-full h-full ${info.titleSize}`}>{info.title}</h2>
        </div>
    }

    if (info.name === 'alternative') {
        html = <div id={randValue} onClick={() => info.setCurrentComponent(info)} style={{

            left: info.left + 'px',
            top: info.top + 'px',
            zIndex: info.z_index,
            transform: info.rotate ? `rotate(${info.rotate}deg)` : 'rotate(0deg)',
            padding: info.padding + 'px',
            color: info.color,
            opacity: info.opacity,
            backgroundColor: info.alternative ? "#22c55e" : info.background,
        }}
            className='absolute group hover:border-[2px] hover:border-indigo-500'
        >
            <Element id={randValue} info={info} exId="" />

            <h2 style={{ fontSize: info.font + 'px', fontWeight: info.weight }} className='w-full h-full'>{info.title}</h2>
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
            <div className='w-full h-full overflow-auto border-8 border-[#2a2b2c]'>

            <h2 style={{ fontSize: info.font + 'px', fontWeight: info.weight, whiteSpace: 'pre-line' }} className='w-full h-full border-8 border-[#2a2b2c]'>{info.title}</h2>

            </div>
        </div>
    }

    if (info.name === 'titulo') {
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

            <h2 style={{ fontSize: info.font + 'px', fontWeight: info.weight}} className='w-full h-full font-bebas'>{info.title}</h2>

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
                <Element id={randValue} info={info} exId="" />
                <h2 className={`w-full h-full font-bold text-m`}>{info.title}</h2>
                <List
                    initialItems={info.listItems || []}
                    isOrdered={info.isOrdered}
                    updateListData={setUpdateList}
                />
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

                <h2 className={`w-full h-full font-bold text-m text-center`}>{info.title}</h2>

                <Table
                    rows={info.rows}
                    columns={info.columns}
                    tableData={info.tableData}
                    updateTableData={(updatedData) => {
                        info.setCurrentComponent({
                            ...info,
                            tableData: updatedData,
                        });
                    }}
                    maximo="max-w-28"
                />

                <h2 className={`w-full h-full text-m text-center`}>{info.description}</h2>
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
        </div>
    }

    return html

}

export default CreateComponent
