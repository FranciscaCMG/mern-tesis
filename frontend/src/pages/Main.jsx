import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import Projects from '../components/Projects'
import MyImages from '../components/MyImages'
import InitialImage from '../components/InitialImage'
import BackgroundImages from '../components/BackgroundImages'
import Code from '../components/Code'
import Table from '../components/Table'
import ActivePause from '../components/ActivePause'
import CreateComponent from '../components/CreateComponent'
import usachLogo from '/Logo_Usach.jpg'
import { BsGrid1X2, BsFillImageFill, BsFolder } from 'react-icons/bs'
import { FaShapes, FaCloudUploadAlt, FaCode, FaTable, FaQuestion } from 'react-icons/fa'
import { TfiText } from 'react-icons/tfi'
import { RxTransparencyGrid } from 'react-icons/rx'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import TemplateDesign from '../components/main/TemplateDesign'
import api from '../utils/api'

const Main = () => {
    const [selectItem, setSelectItem] = useState('')
    const { design_id } = useParams()
    const [state, setState] = useState('')
    const [current_component, setCurrentComponent] = useState('')
    const [color, setColor] = useState('')
    const [image, setImage] = useState('')
    const [rotate, setRotate] = useState(0)
    const [left, setLeft] = useState('')
    const [top, setTop] = useState('')
    const [width, setWidth] = useState('')
    const [height, setHeight] = useState('')
    const [padding, setPadding] = useState('')
    const [font, setFont] = useState('')
    const [weight, setWeight] = useState('')
    const [opacity, setOpacity] = useState('')
    const [text, setText] = useState('')
    const [radius, setRadius] = useState(0)

    const titles = [
        { id: 1, size: "text-6xl", font: 48, label: "Titulo" },
        { id: 2, size: "text-4xl", font: 36, label: "Subtitulo" },
        { id: 3, size: "text-2xl", font: 24, label: "Parrafo" },
    ];

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
            setLeft(parseInt(currentDiv.style.left))
            setTop(parseInt(currentDiv.style.top))
        }

        window.addEventListener('mousemove', mouseMove)
        window.addEventListener('mouseup', mouseUp)
        currentDiv.ondragstart = function () {
            return false;
        };
    }



    const resizeElement = (id, currentInfo) => {
        setCurrentComponent(currentInfo)

        let isMoving = true

        const currentDiv = document.getElementById(id)

        const mouseMove = ({ movementX, movementY }) => {
            const getStyle = window.getComputedStyle(currentDiv)
            const width = parseInt(getStyle.width)
            const height = parseInt(getStyle.height)
            if (isMoving) {
                currentDiv.style.width = `${width + movementX}px`
                currentDiv.style.height = `${height + movementY}px`
            }
        }

        const mouseUp = (e) => {
            isMoving = false
            window.removeEventListener('mousemove', mouseMove)
            window.removeEventListener('mouseup', mouseUp)
            setWidth(parseInt(currentDiv.style.width))
            setHeight(parseInt(currentDiv.style.height))
        }

        window.addEventListener('mousemove', mouseMove)
        window.addEventListener('mouseup', mouseUp)
        currentDiv.ondragstart = function () {
            return false;
        };
    }

    const rotateElement = (id, currentInfo) => {
        setCurrentComponent("")
        setCurrentComponent(currentInfo)

        const target = document.getElementById(id)

        const mouseMove = ({ movementX, movementY }) => {
            const getStyle = window.getComputedStyle(target)

            const trans = getStyle.transform

            const values = trans.split('(')[1].split(')')[0].split(',')

            const angle = Math.round(Math.atan2(values[1], values[0]) * (180 / Math.PI))

            let deg = angle < 0 ? angle + 360 : angle

            if (movementX) {
                deg = deg + movementX
            }

            target.style.transform = `rotate(${deg}deg)`
        }

        const mouseUp = (e) => {
            window.removeEventListener('mousemove', mouseMove)
            window.removeEventListener('mouseup', mouseUp)
            const getStyle = window.getComputedStyle(target)
            const trans = getStyle.transform
            const values = trans.split('(')[1].split(')')[0].split(',')
            const angle = Math.round(Math.atan2(values[1], values[0]) * (180 / Math.PI))
            setRotate(deg)
        }

        window.addEventListener('mousemove', mouseMove)
        window.addEventListener('mouseup', mouseUp)

        target.ondragstart = function () {
            return false;
        };
    }

    const removeComponent = (id) => {
        const temp = components.filter(c => c.id !== id)
        setCurrentComponent('')
        setComponents(temp)
    }

    const duplicate = (current) => {
        if (current) {
            setComponents([...components, { ...current, id: Date.now() }])
        }
    }

    const remove_background = () => {
        const com = components.find(c => c.id === current_component.id)
        const temp = components.filter(c => c.id !== current_component.id)
        com.image = ''
        setImage("")
        setComponents([...temp, com])
    }

    const opacityHandle = (e) => {
        setOpacity(parseFloat(e.target.value))
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
            rotate,
            z_index: 2,
            color: '#3c3c3d',
            setCurrentComponent: (a) => setCurrentComponent(a),
            moveElement,
            resizeElement,
            rotateElement
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
            rotate,
            z_index: 10,
            padding: 6,
            font: font,
            title: titleName,
            titleId: titleName,
            titleSize: titleSize,
            weight: 400,
            color: '#3c3c3d',
            setCurrentComponent: (a) => setCurrentComponent(a),
            moveElement,
            resizeElement,
            rotateElement
        }

        setWeight('')
        setFont('')
        setSelectItem(id)
        setCurrentComponent(style)
        setComponents([...components, style])

        console.log(`Seleccionaste: ${titleName} con tamaño ${titleSize}`);

    }

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
            rotate,
            z_index: 2,
            ratius: 0,
            image: img,
            setCurrentComponent: (a) => setCurrentComponent(a),
            moveElement,
            resizeElement,
            rotateElement
        }
        
        setSelectItem(id)
        setCurrentComponent(style)
        setComponents([...components, style])

    }

    useEffect(() => {
        if (current_component) {
            const index = components.findIndex(c => c.id === current_component.id)
            const temp = components.filter(c => c.id !== current_component.id)
            if (current_component.name !== 'text') {
                components[index].width = width || current_component.width
                components[index].height = height || current_component.height
                components[index].rotate = rotate || current_component.rotate
            }
            if (current_component.name === 'text') {
                components[index].title = text || current_component.title
            }
            if (current_component.name === 'main_frame' && image) {
                components[index].image = image || current_component.image
            }
            components[index].color = color || current_component.color
            if (current_component.name !== 'main_frame') {
                components[index].left = left || current_component.left
                components[index].top = top || current_component.top
                components[index].opacity = opacity || current_component.opacity
            }
            setComponents([...temp, components[index]])

            setColor('')
            setWidth('')
            setHeight('')
            setTop('')
            setLeft('')
            setRotate(0)
            setOpacity('')
            setText('')

        }
    }, [color, image, left, top, width, height, opacity, text])

    useEffect(() => {
        const get_design = async () => {
            try {
                const { data } = await api.get(`/api/user-design/${design_id}`)
                const { design } = data

                for (let i = 0; i < design.length; i++) {
                    console.log('entré al for')
                    design[i].setCurrentComponent = (a) => setCurrentComponent(a)
                    design[i].moveElement = moveElement
                    design[i].resizeElement = resizeElement
                    design[i].rotateElement = rotateElement
                    design[i].remove_background = remove_background

                }
                setComponents(design)
            } catch (error) {
                console.log(error)
            }
        }
        get_design()
    }, [design_id])

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

                    <div onClick={() => setElements('code', 'code')} className={`${show.name === 'shape' ? 'bg-[#252627]' : ''} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
                        <span className='text-2xl'><FaCode /></span>
                        <span className='text-xs font-medium'>Código</span>
                    </div>

                    <div onClick={() => setElements('table', 'table')} className={`${show.name === 'shape' ? 'bg-[#252627]' : ''} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
                        <span className='text-2xl'><FaTable /></span>
                        <span className='text-xs font-medium'>Tabla</span>
                    </div>

                    <div onClick={() => setElements('shape', 'shape')} className={`${show.name === 'shape' ? 'bg-[#252627]' : ''} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
                        <span className='text-2xl'><FaShapes /></span>
                        <span className='text-xs font-medium'>Formas</span>
                    </div>

                    <div onClick={() => setElements('activepause', 'activepause')} className={`${show.name === 'shape' ? 'bg-[#252627]' : ''} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
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
                            state === 'code' && <Code />
                        }
                        {
                            state === 'table' && <div>
                                <Table />
                            </div>
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
                            <BackgroundImages type='background' setImage={setImage} />
                        </div>
                        }

                    </div>
                    <div className='w-full flex h-full' >
                        <div className={`flex justify-center relative items-center h-full ${!current_component ? 'w-full' : "w-[calc(100%-250px)] overflow-hidden"}`}>
                            <div className='m-w-[650px] m-h-[480px] flex justify-center items-center overflow-hidden'>
                                <div id='main_design' className='w-auto relative h-auto overflow-hidden'>
                                    {
                                        components.map((c) => <CreateComponent key={c.id} info={c} current_component={current_component} removeComponent={removeComponent} />)

                                    }
                                </div>

                            </div>
                        </div>
                        {
                            current_component && <div className='h-full w-[250px] text-gray-300 bg-[#252627] px-3 py-2'>
                                <div className='flex gap-3 flex-col items-start h-full px-3 justify-start'>
                                    <div className='flex gap-4 justify-start items-start'>
                                        <span>Color: </span>
                                        <label className='w-[30px] h-[30px] cursor-pointer rounded-sm' style={{ background: `${current_component.color && current_component.color !== '#fff' ? current_component.color : 'gray'}` }} htmlFor="color"></label>
                                        <input onChange={(e) => setColor(e.target.value)} type="color" className='invisible' id='color' />
                                    </div>
                                    {
                                        (current_component.name === 'main_frame' && image) && <div>
                                            <button className='p-[6px] bg-slate-700 text-white rounded-sm' onClick={remove_background}>Eliminar fondo</button>
                                        </div>
                                    }
                                    {
                                        current_component.name !== 'main_frame' && <div
                                            className='flex gap-3 flex-col'>
                                            <div className='flex gap-1 justify-start items-start'>
                                                <span className='text-md w-[70px]'>Opacidad: </span>
                                                <input onChange={opacityHandle} className='w-[70px] border border-gray-700 bf-transparent outline-none px-2 rounded-md' type="number" step={0.1} min={0.1} max={1} value={current_component.opacity} />
                                            </div>

                                            <div className='flex gap-2 flex-col justify-start items-start'>
                                                <input onChange={(e) => setCurrentComponent({
                                                    ...current_component,
                                                    title: e.target.value
                                                })} className=' border border-gray-700 bf-transparent outline-none p-2 rounded-md' type="text" value={current_component.title} />
                                                <button onClick={() => setText(current_component.title)} className='px-4 py-2 bg-purple-500 text-xs text-white rounded-sm'>Agregar</button>

                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        }

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Main
