import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Projects from '../components/Projects'
import MyImages from '../components/MyImages'
import InitialImage from '../components/InitialImage'
import BackgroundImages from '../components/BackgroundImages'
import { IoDuplicateOutline } from "react-icons/io5";
import ActivePause from '../components/ActivePause'
import usachLogo from '/Logo_Usach.jpg'
import { BsGrid1X2, BsFillImageFill, BsFolder } from 'react-icons/bs'
import { FaShapes, FaCloudUploadAlt, FaCode, FaTable, FaQuestion, FaList } from 'react-icons/fa'
import { TfiText } from 'react-icons/tfi'
import { RxTransparencyGrid } from 'react-icons/rx'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import TemplateDesign from '../components/main/TemplateDesign'
import api from '../utils/api'

import ViewSlide from '../components/slide/ViewSlide'

const Main = () => {
    const [selectItem, setSelectItem] = useState('')
    const { design_id } = useParams()
    const [state, setState] = useState('')
    const [current_component, setCurrentComponent] = useState('')

    const [attributes, setAttributes] = useState({
        color: '',
        image: '',
        left: '',
        top: '',
        text: ''
    })

    const handleSetAttributes = (key, value) => {
        setAttributes({
            ...attributes,
            [key]: value
        })
    }

    const titles = [
        { id: 1, size: "text-6xl", font: 48, label: "Titulo" },
        { id: 2, size: "text-4xl", font: 36, label: "Subtitulo" },
        { id: 3, size: "text-2xl", font: 24, label: "Parrafo" },
    ];

    const [dimensions, setDimensions] = useState({ rows: 0, columns: 0 });

    const [show, setShow] = useState({
        status: true,
        name: ''
    })

    const [components, setComponents] = useState([
        {
            name: "main_frame",
            type: "rect",
            id: Math.floor((Math.random() * 100) + 1),
            height: 450,
            width: 650,
            z_index: 1,
            color: '#fff',
            image: "",
            setCurrentComponent: (a) => setCurrentComponent(a)
        }
    ])

    const setElements = (type, name) => {
        setState(type)
        setShow({
            state: false,
            name
        })
    }

    const moveElement = (id, currentInfo) => {
        setCurrentComponent(currentInfo)

        let isMoving = true

        const currentDiv = document.getElementById(id)

        const mouseMove = ({ movementX, movementY }) => {
            setSelectItem("")
            const getStyle = window.getComputedStyle(currentDiv)
            const left = parseInt(getStyle.left)
            const top = parseInt(getStyle.top)
            if (isMoving) {
                currentDiv.style.left = `${left + movementX}px`
                currentDiv.style.top = `${top + movementY}px`
            }
        }

        const mouseUp = (e) => {
            isMoving = false
            window.removeEventListener('mousemove', mouseMove)
            window.removeEventListener('mouseup', mouseUp)

            handleSetAttributes('left', parseInt(currentDiv.style.left))
            handleSetAttributes('top', parseInt(currentDiv.style.top))
        }

        window.addEventListener('mousemove', mouseMove)
        window.addEventListener('mouseup', mouseUp)
        currentDiv.ondragstart = function () {
            return false;
        };
    }

    const removeComponent = (id) => {
        const temp = components.filter(c => c.id !== id)
        setCurrentComponent('')
        setComponents(temp)
    }

    const remove_background = () => {
        const com = components.find(c => c.id === current_component.id)
        const temp = components.filter(c => c.id !== current_component.id)
        com.image = ''
        handleSetAttributes('image', '')
        setComponents([...temp, com])
    }

    const createShape = (name, type) => {
        setCurrentComponent('')
        const id = Date.now()
        const style = {
            id: id,
            name: name,
            type,
            left: 10,
            top: 10,
            opacity: 1,
            width: 200,
            height: 150,
            z_index: 2,
            color: '#3c3c3d',
            setCurrentComponent: (a) => setCurrentComponent(a),
            moveElement
        }
        setSelectItem(id)
        setCurrentComponent(style)
        setComponents([...components, style])
    }

    const add_text = (name, type, titleName, titleSize, font) => {
        setCurrentComponent('')
        const id = Date.now()
        const style = {
            id: id,
            name: name,
            type,
            left: 10,
            top: 10,
            opacity: 1,
            z_index: 10,
            padding: 6,
            font: font,
            title: titleName,
            titleId: titleName,
            titleSize: titleSize,
            weight: 400,
            color: '#3c3c3d',
            setCurrentComponent: (a) => setCurrentComponent(a),
            moveElement
        }

        setSelectItem(id)
        setCurrentComponent(style)
        setComponents([...components, style])

        console.log(`Seleccionaste: ${titleName} con tamaño ${titleSize}`);

    }

    useEffect(() => {
        console.log(components);
    }, [components]);

    const add_table = (name, rows, columns) => {
        setCurrentComponent('');
        const id = Date.now();

        const tableData = Array.from({ length: rows }, () =>
            Array.from({ length: columns }, () => '')
        );

        const style = {
            id: id,
            name: name,
            type: 'table',
            rows: rows,
            columns: columns,
            left: 10,
            top: 10,
            opacity: 1,
            z_index: 10,
            padding: 6,
            color: '#3c3c3d',
            title: "Título de la tabla",
            tableData: tableData,
            setCurrentComponent: (a) => setCurrentComponent(a),
            moveElement
        };

        setSelectItem(id);
        setCurrentComponent(style);
        setComponents([...components, style]);

        console.log(`Tabla creada con ${rows} filas y ${columns} columnas.`);
    };

    const add_code = (name, type) => {
        setCurrentComponent('')
        const id = Date.now()
        const style = {
            id: id,
            name: name,
            type,
            left: 10,
            top: 10,
            opacity: 1,
            z_index: 10,
            padding: 6,
            font: 22,
            title: "<Agregar código>",
            weight: 400,
            color: '#3c3c3d',
            setCurrentComponent: (a) => setCurrentComponent(a),
            moveElement
        }

        setSelectItem(id)
        setCurrentComponent(style)
        setComponents([...components, style])

    }

    const add_list = (name, type, isOrdered = false) => {
        setCurrentComponent(''); // Resetear el componente actual
        const id = Date.now();

        const style = {
            id: id,
            name: name,
            type: type,
            left: 10,
            top: 10,
            opacity: 1,
            z_index: 10,
            padding: 6,
            font: 22,
            title: "<Agregar lista>",
            weight: 400,
            color: '#3c3c3d',
            textColor: 'text-white',
            isOrdered: isOrdered,
            listItems: ['Elemento 1'], // Inicializar la lista con un ítem
            setCurrentComponent: (a) => setCurrentComponent(a),
            moveElement
        };

        setSelectItem(id);
        setCurrentComponent(style); // Establecer el componente actual
        setComponents([...components, style]); // Agregar el nuevo componente a la lista de componentes
    };

    const add_image = (img) => {
        setCurrentComponent('')
        const id = Date.now()
        const style = {
            id: id,
            name: 'image',
            type: 'image',
            left: 10,
            top: 10,
            opacity: 1,
            width: 200,
            height: 150,
            z_index: 2,
            ratius: 0,
            image: img,
            setCurrentComponent: (a) => setCurrentComponent(a),
            moveElement
        }

        setSelectItem(id)
        setCurrentComponent(style)
        setComponents([...components, style])

    }

    useEffect(() => {
        if (current_component) {
            const index = components.findIndex(c => c.id === current_component.id)
            const temp = components.filter(c => c.id !== current_component.id)
            if (current_component.name === 'text') {
                components[index].title = attributes.text || current_component.title
            }
            if (current_component.name === 'code') {
                components[index].title = attributes.text || current_component.title
            }
            if (current_component.name === 'table') {
                components[index].title = attributes.text || current_component.title
                components[index].title2 = attributes.text || current_component.title2
            }
            if (current_component.name === 'main_frame' && attributes.image) {
                components[index].image = attributes.image || current_component.image
            }
            components[index].color = attributes.color || current_component.color
            if (current_component.name !== 'main_frame') {
                components[index].left = attributes.left || current_component.left
                components[index].top = attributes.top || current_component.top
            }
            setComponents([...temp, components[index]])

            handleSetAttributes('color', '')
            handleSetAttributes('top', '')
            handleSetAttributes('left', '')
            handleSetAttributes('text', '')

        }
    }, [attributes.color, attributes.image, attributes.left, attributes.top, attributes.text])

    useEffect(() => {
        const get_design = async () => {
            try {
                const { data } = await api.get(`/api/user-design/${design_id}`)
                const { design } = data

                for (let i = 0; i < design.length; i++) {
                    console.log('entré al for')
                    design[i].setCurrentComponent = (a) => setCurrentComponent(a)
                    design[i].moveElement = moveElement
                    design[i].remove_background = remove_background

                }
                setComponents(design)
            } catch (error) {
                console.log(error)
            }
        }
        get_design()
    }, [design_id])
    const navigate = useNavigate()
    const create = () => {
        navigate('/design/create', {
            state: {
                type: 'create',
                width: 600,
                height: 450
            }
        })
    }

    return (
        <div className='min-w-screen h-screen bg-black'>
            <Header components={components} design_id={design_id} />

            <div className='flex h-[calc(100%-60px)] w-screen'>
                <div className='w-[80px] bg-[#18191b] z-50 h-full text-gray-400 overflow-y-auto'>
                    <div onClick={() => setElements('design', 'design')} className={` ${show.name === 'design' ? 'bg-[#252627]' : ''} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
                        <span className='text-2xl'><BsGrid1X2 /></span>
                        <span className='text-xs font-medium'>Diseño</span>
                    </div>

                    <div onClick={() => setElements('text', 'text')} className={`${show.name === 'text' ? 'bg-[#252627]' : ''}  w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
                        <span className='text-2xl'><TfiText /></span>
                        <span className='text-xs font-medium'>Texto</span>

                    </div>

                    <div onClick={() => setElements('code', 'code')} className={`${show.name === 'code' ? 'bg-[#252627]' : ''} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
                        <span className='text-2xl'><FaCode /></span>
                        <span className='text-xs font-medium'>Código</span>
                    </div>

                    <div onClick={() => setElements('list', 'list')} className={`${show.name === 'list' ? 'bg-[#252627]' : ''} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
                        <span className='text-2xl'><FaList /></span>
                        <span className='text-xs font-medium'>Lista</span>
                    </div>

                    <div onClick={() => setElements('table', 'table')} className={`${show.name === 'table' ? 'bg-[#252627]' : ''} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
                        <span className='text-2xl'><FaTable /></span>
                        <span className='text-xs font-medium'>Tabla</span>
                    </div>

                    <div onClick={() => setElements('shape', 'shape')} className={`${show.name === 'shape' ? 'bg-[#252627]' : ''} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
                        <span className='text-2xl'><FaShapes /></span>
                        <span className='text-xs font-medium'>Formas</span>
                    </div>

                    <div onClick={() => setElements('activepause', 'activepause')} className={`${show.name === 'activepause' ? 'bg-[#252627]' : ''} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
                        <span className='text-2xl'><FaQuestion /></span>
                        <span className='text-xs font-medium'>Pausa </span>
                        <span className='text-xs font-medium'>activa</span>
                    </div>

                    <div onClick={() => setElements('image', 'uploadImage')} className={`${show.name === 'uploadImage' ? 'bg-[#252627]' : ''} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
                        <span className='text-2xl'><FaCloudUploadAlt /></span>
                        <span className='text-xs font-medium'>Subir</span>

                    </div>

                    <div onClick={() => setElements('project', 'project')} className={`${show.name === 'project' ? 'bg-[#252627]' : ''}  w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
                        <span className='text-2xl'><BsFolder /></span>
                        <span className='text-xs font-medium'>Proyecto</span>

                    </div>

                    <div onClick={() => setElements('initImage', 'images')} className={`${show.name === 'images' ? 'bg-[#252627]' : ''}  w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
                        <span className='text-2xl'><BsFillImageFill /></span>
                        <span className='text-xs font-medium'>Imagenes</span>
                    </div>

                    <div onClick={() => setElements('background', 'background')} className={`${show.name === 'background' ? 'bg-[#252627]' : ''} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
                        <span className='text-2xl'><RxTransparencyGrid /></span>
                        <span className='text-xs font-medium'>Fondo</span>
                    </div>
                </div>
                <div className='h-full w-[calc(100%-75px)]'>
                    <div className={`${show.status ? 'p-0 -left-[350px]' : 'px-8 left-[75px] py-5'} bg-[#252627] h-full fixed transition-all w-[350px] z-30 duration-700`}>
                        <div onClick={() => setShow({ name: '', status: true })} className='flex absolute justify-center items-center bg-[#252627] w-[20px] -right-2 text-slate-300 top-[40%] cursor-pointer h-[100px] rounded-full'><MdKeyboardArrowLeft /></div>
                        {
                            state === 'design' && <div>
                                <TemplateDesign type='main' />
                            </div>
                        }
                        {
                            state === 'text' && <div className="space-y-4">
                                {titles.map((title) => (
                                    <div key={title.id} className="grid grid-cols-1 gap-2">
                                        <div
                                            onClick={() => add_text('text', 'title', title.label, title.size, title.font)}
                                            className="bg-[#3c3c3d] cursor-pointer font-normal p-3 text-white text-xl rounded-sm"
                                        >

                                            <h2 className={title.size}>{console.log(title.size)}{title.label}</h2>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        }
                        {
                            state === 'code' && <div>
                                <div className='grid grid-cols-1 gap-2'>
                                    <div onClick={() => add_code('code', 'code')} className='bg-[#3c3c3d] cursor-pointer font-bold p-3 text-white text-xl rounded-sm'>
                                        <h2>Código</h2>
                                    </div>
                                </div>
                            </div>
                        }
                        {
                            state === 'list' && (
                                <div>
                                    <div className="grid grid-cols-1 gap-2">
                                        {/* Botón para agregar lista desordenada */}
                                        <div
                                            onClick={() => add_list('list', 'unordered', false)}
                                            className="bg-[#3c3c3d] cursor-pointer font-bold p-3 text-white text-xl rounded-sm"
                                        >
                                            <h2>Lista Desordenada</h2>
                                        </div>

                                        {/* Botón para agregar lista ordenada */}
                                        <div
                                            onClick={() => add_list('list', 'ordered', true)}
                                            className="bg-[#3c3c3d] cursor-pointer font-bold p-3 text-white text-xl rounded-sm"
                                        >
                                            <h2>Lista Ordenada</h2>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        {
                            state === 'table' && (
                                <div className="space-y-4">
                                    <h2 className="text-lg font-bold text-white ">Insertar tabla</h2>
                                    <div className="flex flex-col items-start space-y-2">
                                        <div className="grid grid-cols-6 grid-rows-5 gap-1 w-[180px] h-[150px] border border-gray-300 relative">
                                            {Array.from({ length: 30 }).map((_, index) => {
                                                const row = Math.floor(index / 6) + 1; // Máximo 5 filas
                                                const col = (index % 6) + 1; // Máximo 6 columnas

                                                return (
                                                    <div
                                                        key={index}
                                                        onMouseEnter={() => setDimensions({ rows: row, columns: col })}
                                                        onClick={() => add_table('table', row, col)}
                                                        className={`w-full h-full border hover:bg-blue-300 ${row <= dimensions.rows && col <= dimensions.columns
                                                            ? 'bg-blue-500'
                                                            : ''
                                                            }`}
                                                    ></div>
                                                );
                                            })}
                                        </div>
                                        <span className="text-sm text-gray-500">
                                            {dimensions.rows} x {dimensions.columns}
                                        </span>
                                    </div>
                                </div>
                            )
                        }

                        {
                            state === 'shape' && <div className='grid grid-cols-3 gap-2'>
                                <div onClick={() => createShape('shape', 'rect')} className='h-[90px] bg-[#3c3c3d] cursor-pointer'></div>
                                <div onClick={() => createShape('shape', 'circle')} className='h-[90px] bg-[#3c3c3d] cursor-pointer rounded-full'></div>
                                <div onClick={() => createShape('shape', 'trangle')} style={{ clipPath: 'polygon(50% 0,100% 100%,0 100%)' }} className='h-[90px] bg-[#3c3c3d] cursor-pointer'></div>
                            </div>
                        }
                        {
                            state === 'activepause' && <ActivePause />
                        }
                        {
                            state === 'initImage' && <div className='h-[88vh] overflow-x-auto flex justify-start items-start scrollbar-hide'>
                                <InitialImage add_image={add_image} />
                            </div>
                        }
                        {
                            state === 'project' && <Projects type='main' design_id={design_id} />
                        }
                        {
                            state === 'image' && <MyImages add_image={add_image} />
                        }
                        {
                            state === 'background' && <div className='h-[88vh] overflow-x-auto flex justify-start items-start scrollbar-hide'>
                                <BackgroundImages type='background' setImage={handleSetAttributes} />
                            </div>
                        }

                    </div>
                    
                    {
                        <ViewSlide
                            current_component={current_component}
                            components={components}
                            removeComponent={removeComponent}
                            create={create}
                            attributes={attributes}
                            handleSetAttributes={handleSetAttributes}
                            setCurrentComponent={setCurrentComponent}
                        />
                    }

                </div>
            </div>


        </div>
    )
}

export default Main
