import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import toast from 'react-hot-toast';

import { BsFillImageFill, BsFolder } from 'react-icons/bs'
import { FaCloudUploadAlt, FaCode, FaTable, FaQuestion, FaList } from 'react-icons/fa'
import { TfiText } from 'react-icons/tfi'
import { MdKeyboardArrowLeft } from 'react-icons/md'

import Header from '../components/Header'
import Projects from '../components/Projects'
import MyImages from '../components/MyImages'
import InitialImage from '../components/InitialImage'
import ViewSlide from '../components/slide/ViewSlide'
import ActivePause from '../components/ActivePause'
import TemplateSlide from '../components/slide/TemplateSlide'

import api from '../utils/api'

const Main = () => {
    const [selectItem, setSelectItem] = useState('')
    const { design_id } = useParams()
    const [stateComponent, setStateComponent] = useState('')
    const [current_component, setCurrentComponent] = useState('')
    const [currentSlideId, setCurrentSlideId] = useState(0);

    const { state } = useLocation()

    const [updateList, setUpdateList] = useState([])

    const [showModal, setShowModal] = useState(false);

    const [attributes, setAttributes] = useState({
        color: '',
        image: '',
        left: '',
        top: '',
        text: '',
        audio_text: '',
        alternative: '',
        description: ''
    })

    const handleSetAttributes = (key, value) => {
        setAttributes(prevAttributes => ({
            ...prevAttributes,
            [key]: value
        }));
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
    });

    const handleOptionClick = (numberTemplate) => {
        setShowModal(false);
        addSlide(numberTemplate);
    };

    const [slides, setSlides] = useState([])

    const upDownLimit = (index, type) => {
        const baseTop = (480 * index) + (16 * index) + 100;
        
        let top, down;
    
        switch (type) {
            case 1:
                top = baseTop;
                down = top + 380;
                break;
            case 2:
                top = baseTop;
                down = top + 140;
                break;
            case 3:
                top = baseTop + 140;
                down = top + 140;
                break;
            case 4:
                down = baseTop;
                top = down - 100;
                break;
            default:
                top = baseTop -100;
                down = top + 480;
        }
    
        return [top, down];
    };
    
    
 
    const leftRightLimit = (type) => {
        let left, rigth;
        switch (type) {
            case 1:
                left = 1;
                rigth = 826;
                break;
            case 2:
                left = 1;
                rigth = 413;
                break;
            case 3:
                left = 413;
                rigth = 826;
                break;
            default:
                left = 1;
                rigth = 826;
        }
    
        return [left, rigth]; 
    };


    const limitComponents = (tipoSlide, position, index) => {
        let top, down;

        if (tipoSlide === 2) {
            top = upDownLimit(index, 5);
            down = leftRightLimit(1);

            return [top, down];
        }
        if (position === 1) {
            top = upDownLimit(index, 4);
            down = leftRightLimit(1);
            return [top, down];
        }
        switch (tipoSlide) {
            case 1:
                top = upDownLimit(index, 1);
                down = leftRightLimit(1);
                return [top, down];

            case 3:
                switch (position) {
                    case 2:
                        top = upDownLimit(index, 2);
                        down = leftRightLimit(2);
                        return [top, down];
                    case 3:
                        top = upDownLimit(index, 3);
                        down = leftRightLimit(2);
                        return [top, down];
                    case 4:
                        top = upDownLimit(index, 2);
                        down = leftRightLimit(3);
                        return [top, down];
                    case 5:
                        top = upDownLimit(index, 3);
                        down = leftRightLimit(3);
                        return [top, down];
                    default:
                        return 0;
                }
            case 4:
                switch (position) {
                    case 2:
                        top = upDownLimit(index, 1);
                        down = leftRightLimit(2);
                        return [top, down];
                    case 3:
                        top = upDownLimit(index, 2);
                        down = leftRightLimit(3);
                        return [top, down];
                    case 4:
                        top = upDownLimit(index, 3);
                        down = leftRightLimit(3);
                        return [top, down];
                    default:
                        return 0;
                }
            case 5:
                switch (position) {
                    case 2:
                        top = upDownLimit(index, 2);
                        down = leftRightLimit(2);
                        return [top, down];
                    case 3:
                        top = upDownLimit(index, 3);
                        down = leftRightLimit(2);
                        return [top, down];
                    case 4:
                        top = upDownLimit(index, 1);
                        down = leftRightLimit(3);
                        return [top, down];
                    default:
                        return 0;
                }

            case 6:
                switch (position) {
                    case 2:
                        top = upDownLimit(index, 3);
                        down = leftRightLimit(2);
                        return [top, down];
                    case 3:
                        top = upDownLimit(index, 2);
                        down = leftRightLimit(1);
                        return [top, down];
                    case 4:
                        top = upDownLimit(index, 3);
                        down = leftRightLimit(3);
                        return [top, down];
                    default:
                        return 0;
                }

            case 7:
                switch (position) {
                    case 2:
                        top = upDownLimit(index, 2);
                        down = leftRightLimit(2);
                        return [top, down];
                    case 3:
                        top = upDownLimit(index, 3);
                        down = leftRightLimit(1);
                        return [top, down];
                    case 4:
                        top = upDownLimit(index, 2);
                        down = leftRightLimit(3);
                        return [top, down];
                    default:
                        return 0;
                }

            case 8:
                switch (position) {
                    case 2:
                        top = upDownLimit(index, 1);
                        down = leftRightLimit(2);
                        return [top, down];
                    case 3:
                        top = upDownLimit(index, 1);
                        down = leftRightLimit(3);
                        return [top, down];
                    default:
                        return 0;
                }

            case 9:
                switch (position) {
                    case 2:
                        top = upDownLimit(index, 2);
                        down = leftRightLimit(1);
                        return 1;
                    case 3:
                        top = upDownLimit(index, 3);
                        down = leftRightLimit(1);
                        return 1;
                    default:
                        return 0;
                }

            case 10:
                top = upDownLimit(index, 1);
                down = leftRightLimit(1);
                return [top, down];


            default:
                return 0;
        }
    };

    const replaceComponentInSlide = (component) => {
        if (!current_component || current_component.type === "titulo") {
            toast.error("No puedes reemplazar el titulo");
            setCurrentComponent('');
            return;
        }

        if (current_component.name === "main_frame") {
            toast.error("Es necesario seleccionar un elemento para reemplazar");
            setCurrentComponent('');
            return;
        }

        const slideIndex = slides.findIndex(slide => slide.id === currentSlideId);
        const componentIndex = slides[slideIndex].components.findIndex(
            comp => comp.id === current_component.id
        );

        const updatedSlide = {
            ...slides[slideIndex],
            components: slides[slideIndex].components.map((comp, index) =>
                index === componentIndex ? { ...component } : comp
            ),
        };

        const updatedSlides = slides.map((slide, index) =>
            index === slideIndex ? updatedSlide : slide
        );

        setSlides(updatedSlides);
    }

    const positionLeft = {
        1: 84,
        2: 327.8,
        3: 571.6
    };

    const topPositions = {
        1: (index) => (480 * index) + (16 * index) + 121,
        2: (index) => (480 * index) + (16 * index) + 204,
        3: (index) => (480 * index) + (16 * index) + 287,
        4: (index) => (480 * index) + (16 * index) + 370,
        5: (index) => (480 * index) + (16 * index) + 38
    };

    const createComponent = (position = {}, text, background, alternative, title = "Subtitulo", fontSize = "text-2xl", leftPosition = 1, topPosition = 1, flagFirstSlide, numberPosition, typeSlide) => {
        const isText = text === "text" || text === "titulo";
        return {
            id: Date.now() + Math.floor(Math.random() * 1000),
            slide_id: slides.length,
            name: text,
            type: text,
            numberPosition: numberPosition,
            left: positionLeft[leftPosition],
            top: topPositions[topPosition](flagFirstSlide ? 0 : slides.length),
            opacity: 1,
            z_index: 10,
            padding: 6,
            font: 36,
            title: title,
            titleId: title,
            titleSize: fontSize,
            weight: 400,
            color: '#3c3c3d',
            audio_text: '',
            type_slide: typeSlide,
            ...(isText ? {} : { background, alternative }),
            setCurrentComponent: (a) => setCurrentComponent(a),
            moveElement
        };
    };


    const getPositionTopComponents = (numberTemplate) => {
        switch (numberTemplate) {
            case 1:
                return [5, 2]
            case 2:
                return [2]
            case 3:
                return [5, 1, 3, 1, 3]
            case 4:
                return [5, 2, 1, 3]
            case 5:
                return [5, 1, 3, 2]
            case 6:
                return [5, 3, 1, 3]
            case 7:
                return [5, 1, 3, 1]
            case 8:
                return [5, 2, 2]
            case 9:
                return [5, 1, 3]
            case 10:
                return [5, 2, 1, 3, 4]
            default:
                return;
        }
    };

    const addSlide = (numberTemplate, flagFirstSlide = false) => {

        const baseFrame = {
            name: "main_frame",
            type: "rect",
            id: Date.now(),
            height: 480,
            width: 826,
            z_index: 1,
            color: '#fff',
            image: "",
            setCurrentComponent: (a) => setCurrentComponent(a),
            type_slide: numberTemplate
        };

        let components = [baseFrame];

        switch (numberTemplate) {
            case 1:
                components.push(createComponent({}, 'titulo', null, null, "Titulo", "text-6xl", 2, 5, flagFirstSlide, 1, numberTemplate));
                components.push(createComponent({}, 'text', null, null, "Agregar ", "text-lg", 2, 2, flagFirstSlide, 2, numberTemplate));
                break;
            case 2:
                components.push(createComponent({}, 'titulo', null, null, "Titulo", "text-6xl", 2, 2, flagFirstSlide, 1, numberTemplate));
                break;
            case 3:
                components.push(createComponent({}, 'titulo', null, null, "Titulo", "text-6xl", 2, 5, flagFirstSlide, 1, numberTemplate));
                components.push(createComponent({}, 'text', null, null, "Agregar 1", "text-lg", 1, 1, flagFirstSlide, 2, numberTemplate));
                components.push(createComponent({}, 'text', null, null, "Agregar 2", "text-lg", 1, 3, flagFirstSlide, 3, numberTemplate));
                components.push(createComponent({}, 'text', null, null, "Agregar 3", "text-lg", 3, 1, flagFirstSlide, 4, numberTemplate));
                components.push(createComponent({}, 'text', null, null, "Agregar 4", "text-lg", 3, 3, flagFirstSlide, 5, numberTemplate));
                break;
            case 4:
                components.push(createComponent({}, 'titulo', null, null, "Titulo", "text-6xl", 2, 5, flagFirstSlide, 1, numberTemplate));
                components.push(createComponent({}, 'text', null, null, "Agregar 1", "text-lg", 1, 2, flagFirstSlide, 2, numberTemplate));
                components.push(createComponent({}, 'text', null, null, "Agregar 2", "text-lg", 3, 1, flagFirstSlide, 3, numberTemplate));
                components.push(createComponent({}, 'text', null, null, "Agregar 3", "text-lg", 3, 3, flagFirstSlide, 4, numberTemplate));
                break;
            case 5:
                components.push(createComponent({}, 'titulo', null, null, "Titulo", "text-6xl", 2, 5, flagFirstSlide, 1, numberTemplate));
                components.push(createComponent({}, 'text', null, null, "Agregar 1", "text-lg", 1, 1, flagFirstSlide, 2, numberTemplate));
                components.push(createComponent({}, 'text', null, null, "Agregar 2", "text-lg", 1, 3, flagFirstSlide, 3, numberTemplate));
                components.push(createComponent({}, 'text', null, null, "Agregar 3", "text-lg", 3, 2, flagFirstSlide, 4, numberTemplate));
                break;
            case 6:
                components.push(createComponent({}, 'titulo', null, null, "Titulo", "text-6xl", 2, 5, flagFirstSlide, 1, numberTemplate));
                components.push(createComponent({}, 'text', null, null, "Agregar 1", "text-lg", 1, 3, flagFirstSlide, 2, numberTemplate));
                components.push(createComponent({}, 'text', null, null, "Agregar 2", "text-lg", 2, 1, flagFirstSlide, 3, numberTemplate));
                components.push(createComponent({}, 'text', null, null, "Agregar 3", "text-lg", 3, 3, flagFirstSlide, 4, numberTemplate));
                break;
            case 7:
                components.push(createComponent({}, 'titulo', null, null, "Titulo", "text-6xl", 2, 5, flagFirstSlide, 1, numberTemplate));
                components.push(createComponent({}, 'text', null, null, "Agregar 1", "text-lg", 1, 1, flagFirstSlide, 2, numberTemplate));
                components.push(createComponent({}, 'text', null, null, "Agregar 2", "text-lg", 2, 3, flagFirstSlide, 3, numberTemplate));
                components.push(createComponent({}, 'text', null, null, "Agregar 3", "text-lg", 3, 1, flagFirstSlide, 4, numberTemplate));
                break;
            case 8:
                components.push(createComponent({}, 'titulo', null, null, "Titulo", "text-6xl", 2, 5, flagFirstSlide, 1, numberTemplate));
                components.push(createComponent({}, 'text', null, null, "Agregar 1", "text-lg", 1, 2, flagFirstSlide, 2, numberTemplate));
                components.push(createComponent({}, 'text', null, null, "Agregar 2", "text-lg", 3, 2, flagFirstSlide, 3, numberTemplate));

                break;
            case 9:
                components.push(createComponent({}, 'titulo', null, null, "Titulo", "text-6xl", 2, 5, flagFirstSlide, 1, numberTemplate));
                components.push(createComponent({}, 'text', null, null, "Agregar 1", "text-lg", 2, 1, flagFirstSlide, 2, numberTemplate));
                components.push(createComponent({}, 'text', null, null, "Agregar 2", "text-lg", 2, 3, flagFirstSlide, 3, numberTemplate));
                break;

            case 10:
                components.push(createComponent({}, 'titulo', null, null, "Titulo", "text-6xl", 2, 5, flagFirstSlide, 1));
                components.push(createComponent({}, 'alternative', '#d9d9d9', false, "Agregar Alternativa 1", "text-4xl", 2, 1, flagFirstSlide, 2, numberTemplate));
                components.push(createComponent({}, 'alternative', '#d9d9d9', false, "Agregar Alternativa 2", "text-4xl", 2, 2, flagFirstSlide, 3, numberTemplate));
                components.push(createComponent({}, 'alternative', '#d9d9d9', false, "Agregar Alternativa 3", "text-4xl", 2, 3, flagFirstSlide, 4, numberTemplate));
                components.push(createComponent({}, 'alternative', '#d9d9d9', false, "Agregar Alternativa 4", "text-4xl", 2, 4, flagFirstSlide, 5, numberTemplate));
                break;
            default:
                return;
        }

        const newSlide = {
            id: flagFirstSlide ? 0 : slides.length,
            components: components
        };

        if (flagFirstSlide) {
            setSlides([newSlide]);
        } else {
            setSlides([...slides, newSlide]);
        }
    };

    const setElements = (type, name) => {
        setStateComponent(type)
        setShow({
            state: false,
            name
        })
    }

    useEffect(() => {
        if (state && state.numberTemplate !== null) {
            addSlide(state.numberTemplate, true);
        }
    }, [])

    const moveElement = (id, currentInfo) => {
        setCurrentComponent(currentInfo)
    
        const limits = limitComponents(currentInfo.type_slide, currentInfo.numberPosition, currentInfo.slide_id);

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
    
                const elementWidth = currentDiv.offsetWidth;
                const elementHeight = currentDiv.offsetHeight;
    
                let newLeft = parseInt(currentDiv.style.left);
                let newTop = parseInt(currentDiv.style.top);
    
                if (newLeft < limits[1][0]) {
                    currentDiv.style.left = `${limits[1][0]}px`;
                } else if (newLeft > limits[1][1] - elementWidth) {
                    currentDiv.style.left = `${limits[1][1] - elementWidth}px`;
                }
    
                if (newTop < limits[0][0]) {
                    currentDiv.style.top = `${limits[0][0]}px`;
                } else if (newTop > limits[0][1] - elementHeight) {
                    currentDiv.style.top = `${limits[0][1] - elementHeight}px`;
                }
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

    const topPositionsByIndex = (index, type) => {
        switch (type) {
            case 1:
                return (480 * index) + (16 * index) + 121;
            case 2:
                return (480 * index) + (16 * index) + 204;
            case 3:
                return (480 * index) + (16 * index) + 287;
            case 4:
                return (480 * index) + (16 * index) + 370;
            case 5:
                return (480 * index) + (16 * index) + 38;
            default:
                return 0;
        }
    };

    const removeComponent = (id, type) => {
        let updatedSlides;

        if (type === 'slide') {
            updatedSlides = slides.filter(slide => slide.components[0].id !== id);

            for (let i = 0; i < updatedSlides.length; i++) {
                updatedSlides[i].id = i;
                let positionTop = getPositionTopComponents(updatedSlides[i].components[0].type_slide);

                for (let j = 1; j < updatedSlides[i].components.length; j++) {
                    if (updatedSlides[i].components.length > 1) {
                        updatedSlides[i].components[j].top = topPositionsByIndex(i, positionTop[j - 1]);
                    }
                }
            }
        } else {
            updatedSlides = slides.map(slide => {
                return {
                    ...slide,
                    components: slide.components.filter(c => c.id !== id)
                };
            });
        }

        setSlides(updatedSlides);
        setCurrentComponent('');
    }

    function generateUniqueID() {
        return Date.now().toString() + Math.floor(Math.random() * 1000);
    }

    const duplicateSlide = (slideId) => {
        let updatedSlides;

        const slideIndex = slides.findIndex(slide => slide.components[0].id === slideId);
        const originalSlide = slides[slideIndex];

        const newSlide = {
            ...originalSlide,
            components: originalSlide.components.map((component, index) => ({
                ...component,
                id: generateUniqueID()
            }))
        };

        updatedSlides = [
            ...slides.slice(0, slideIndex + 1),
            newSlide,
            ...slides.slice(slideIndex + 1)
        ];

        for (let i = 0; i < updatedSlides.length; i++) {
            updatedSlides[i].id = i;

            let positionTop = getPositionTopComponents(updatedSlides[i].components[0].type_slide);

            for (let j = 0; j < updatedSlides[i].components.length; j++) {
                if (j === 0) {
                    updatedSlides[i].components[j].top = positionTop[j] || 0;
                } else {
                    updatedSlides[i].components[j].top = topPositionsByIndex(i, positionTop[j - 1]);
                }
            }
        }

        setSlides(updatedSlides);
        setCurrentComponent('');
    };


    const add_text = (name, titleName, titleSize, font) => {
        setCurrentComponent('')
        const id = Date.now();
        const style = {
            id: id,
            slide_id: currentSlideId,
            name: name,
            type: titleName,
            left: current_component.left,
            top: current_component.top,
            opacity: 1,
            z_index: 10,
            padding: 6,
            font: font,
            title: titleName,
            titleId: titleName,
            titleSize: titleSize,
            weight: 400,
            color: '#3c3c3d',
            audio_text: '',
            setCurrentComponent: (a) => setCurrentComponent(a),
            moveElement
        }

        setSelectItem(id);
        setCurrentComponent(style);
        replaceComponentInSlide(style);
    }

    const add_table = (name, rows, columns) => {
        setCurrentComponent('');
        const id = Date.now();

        const tableData = Array.from({ length: rows }, () =>
            Array.from({ length: columns }, () => '')
        );

        const style = {
            id: id,
            slide_id: currentSlideId,
            name: name,
            type: 'table',
            rows: rows,
            columns: columns,
            left: current_component.left,
            top: current_component.top,
            opacity: 1,
            z_index: 10,
            padding: 6,
            color: '#3c3c3d',
            title: "Título de la tabla",
            description: "Descripción de la tabla",
            tableData: tableData,
            audio_text: '',
            setCurrentComponent: (a) => setCurrentComponent(a),
            moveElement
        };

        setSelectItem(id);
        setCurrentComponent(style);
        replaceComponentInSlide(style);
    };

    const add_code = (name, type) => {
        setCurrentComponent('')
        const id = Date.now();
        const style = {
            id: id,
            slide_id: currentSlideId,
            name: name,
            type,
            left: current_component.left,
            top: current_component.top,
            opacity: 1,
            z_index: 10,
            padding: 6,
            font: 18,
            title: "<Agregar código>",
            weight: 400,
            color: '#d1d1d1',
            audio_text: '',
            setCurrentComponent: (a) => setCurrentComponent(a),
            moveElement
        }

        setSelectItem(id);
        setCurrentComponent(style);
        replaceComponentInSlide(style);

    }

    const add_list = (name, type, isOrdered = false) => {
        setCurrentComponent('');
        const id = Date.now();

        const style = {
            id: id,
            slide_id: currentSlideId,
            name: name,
            type: type,
            left: current_component.left,
            top: current_component.top,
            opacity: 1,
            z_index: 10,
            padding: 6,
            font: 18,
            title: "Agregar descripción de la lista",
            weight: 400,
            color: '#3c3c3d',
            textColor: 'text-white',
            isOrdered: isOrdered,
            listItems: ['Nuevo ítem'],
            audio_text: '',
            setCurrentComponent: (a) => setCurrentComponent(a),
            moveElement
        };

        setSelectItem(id);
        setCurrentComponent(style);
        replaceComponentInSlide(style);
    };

    const add_image = (img) => {
        setCurrentComponent('')
        const id = Date.now();
        const style = {
            id: id,
            slide_id: currentSlideId,
            name: 'image',
            type: 'image',
            left: current_component.left,
            top: current_component.top,
            opacity: 1,
            width: 200,
            height: 150,
            z_index: 2,
            ratius: 0,
            image: img,
            audio_text: '',
            setCurrentComponent: (a) => setCurrentComponent(a),
            moveElement
        }

        setSelectItem(id);
        setCurrentComponent(style);
        replaceComponentInSlide(style);

    }

    useEffect(() => {
        if (current_component) {
            const index = slides[currentSlideId].components.findIndex(c => c.id === current_component.id)
            if (index === -1) return;

            if (current_component.name === 'text') {
                slides[currentSlideId].components[index].title = attributes.text || current_component.title
            }
            if (current_component.name === 'titulo') {
                slides[currentSlideId].components[index].title = attributes.text || current_component.title
            }
            if (current_component.name === 'code') {
                slides[currentSlideId].components[index].title = attributes.text || current_component.title
            }
            if (current_component.name === 'table') {
                slides[currentSlideId].components[index].title = attributes.text || current_component.title
                slides[currentSlideId].components[index].title2 = attributes.text || current_component.title2
                slides[currentSlideId].components[index].description = attributes.description || current_component.description
            }
            if (current_component.name === 'main_frame' && attributes.image) {
                slides[currentSlideId].components[index].image = attributes.image || current_component.image
            }
            if (current_component.name !== 'main_frame') {
                slides[currentSlideId].components[index].left = attributes.left || current_component.left
                slides[currentSlideId].components[index].top = attributes.top || current_component.top
            }
            if (current_component.name === 'list') {
                slides[currentSlideId].components[index].listItems = updateList || current_component.listItems
                slides[currentSlideId].components[index].title = attributes.text || current_component.title
            }
            if (current_component.name === 'alternative') {
                slides[currentSlideId].components[index].alternative = attributes.alternative || current_component.alternative
                slides[currentSlideId].components[index].title = attributes.text || current_component.title
            }

            slides[currentSlideId].components[index].color = attributes.color || current_component.color
            slides[currentSlideId].components[index].audio_text = attributes.audio_text || current_component.audio_text

            toast.success("Atributo actualizado correctamente");

            handleSetAttributes('color', '')
            handleSetAttributes('top', '')
            handleSetAttributes('left', '')
            handleSetAttributes('text', '')
            handleSetAttributes('audio_text', '')
            handleSetAttributes('alternative', '')
            handleSetAttributes('description', '')
        }


    }, [attributes.color, attributes.image, attributes.left, attributes.top, attributes.text, attributes.audio_text, updateList, attributes.alternative, attributes.description])

    useEffect(() => {
        const get_design = async () => {
            try {
                const data = await api.get(`/api/user-design/${design_id}`)
                const design = data.data.components

                design.map((slides, index) => {
                    slides.components.map((c) => {
                        c.setCurrentComponent = (a) => setCurrentComponent(a)
                        c.moveElement = moveElement
                    })
                });

                setSlides(design);

            } catch (error) {
                console.log(error)
            }
        }
        get_design()
    }, [design_id])

    return (
        <div className="min-w-screen min-h-screen bg-[#f8f8f8] overflow-hidden">
            <Header
                slides={slides}
                design_id={design_id}
                attributes={attributes}
            />

            <div className="flex w-[100vw] h-[100vh] pt-[10px] overflow-hidden">
                {/* Barra lateral */}
                <div className="fixed top-[65px] left-0 w-[80px] h-[calc(100%-60px)] bg-white shadow-md z-50 overflow-y-auto">
                    <div
                        onClick={() => setElements("text", "text")}
                        className={`${show.name === "text" ? "bg-[#e8e8e8]" : ""
                            } w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-800`}
                    >
                        <span className="text-2xl text-blue-500">
                            <TfiText />
                        </span>
                        <span className="text-xs font-medium">Texto</span>
                    </div>

                    <div
                        onClick={() => setElements("code", "code")}
                        className={`${show.name === "code" ? "bg-[#e8e8e8]" : ""
                            } w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-800`}
                    >
                        <span className="text-2xl text-purple-500">
                            <FaCode />
                        </span>
                        <span className="text-xs font-medium">Código</span>
                    </div>

                    <div
                        onClick={() => setElements("list", "list")}
                        className={`${show.name === "list" ? "bg-[#e8e8e8]" : ""
                            } w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-800`}
                    >
                        <span className="text-2xl text-green-500">
                            <FaList />
                        </span>
                        <span className="text-xs font-medium">Lista</span>
                    </div>

                    <div
                        onClick={() => setElements("table", "table")}
                        className={`${show.name === "table" ? "bg-[#e8e8e8]" : ""
                            } w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-800`}
                    >
                        <span className="text-2xl text-orange-500">
                            <FaTable />
                        </span>
                        <span className="text-xs font-medium">Tabla</span>
                    </div>

                    <div
                        onClick={() => setElements("activepause", "activepause")}
                        className={`${show.name === "activepause" ? "bg-[#e8e8e8]" : ""
                            } w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-800`}
                    >
                        <span className="text-2xl text-red-500">
                            <FaQuestion />
                        </span>
                        <span className="text-xs font-medium">Pausa</span>
                        <span className="text-xs font-medium">activa</span>
                    </div>

                    <div
                        onClick={() => setElements("image", "uploadImage")}
                        className={`${show.name === "uploadImage" ? "bg-[#e8e8e8]" : ""
                            } w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-800`}
                    >
                        <span className="text-2xl text-blue-400">
                            <FaCloudUploadAlt />
                        </span>
                        <span className="text-xs font-medium">Subir</span>
                    </div>

                    <div
                        onClick={() => setElements("project", "project")}
                        className={`${show.name === "project" ? "bg-[#e8e8e8]" : ""
                            } w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-800`}
                    >
                        <span className="text-2xl text-teal-500">
                            <BsFolder />
                        </span>
                        <span className="text-xs font-medium">Proyecto</span>
                    </div>

                    <div
                        onClick={() => setElements("initImage", "images")}
                        className={`${show.name === "images" ? "bg-[#e8e8e8]" : ""
                            } w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-800`}
                    >
                        <span className="text-2xl text-pink-500">
                            <BsFillImageFill />
                        </span>
                        <span className="text-xs font-medium">Imágenes</span>
                    </div>
                </div>

                {/* Contenido principal */}
                <div className="ml-[80px] w-[calc(100vw-80px)] h-[calc(100vh-70px)] overflow-hidden py-[0px]">
                    <div
                        className={`${show.status ? "p-0 -left-[350px]" : "px-8 left-[80px] py-1"
                            } bg-[#f0f0f0] h-full fixed transition-all w-[300px] z-30 duration-700 shadow-md`}
                    >
                        <div
                            onClick={() => setShow({ name: "", status: true })}
                            className="flex absolute justify-center items-center bg-[#777676b6] w-[20px] -right-2 text-white top-[40%] cursor-pointer h-[100px] rounded-full"
                        >
                            <MdKeyboardArrowLeft />
                        </div>

                        {stateComponent === "text" && (
                            <div className="space-y-4">
                                {titles.map((title) => (
                                    <div
                                        key={title.id}
                                        onClick={() =>
                                            add_text("text", title.label, title.size, title.font)
                                        }
                                        className="bg-[#ffffff] border border-gray-300 cursor-pointer font-normal p-3 text-gray-700 text-xl rounded-sm hover:bg-gray-100"
                                    >
                                        <h2 className={title.size}>{title.label}</h2>
                                    </div>
                                ))}
                            </div>
                        )}

                        {
                            stateComponent === 'code' && <div>
                                <div className='grid grid-cols-1 gap-2'>
                                    <div onClick={() => add_code('code', 'code')} className='bg-[#3c3c3d] cursor-pointer font-bold p-3 text-white text-xl rounded-sm'>
                                        <h2>Código</h2>
                                    </div>
                                </div>
                            </div>
                        }

                        {
                            stateComponent === 'list' && (
                                <div>
                                    <div className="grid grid-cols-1 gap-2">

                                        <div
                                            onClick={() => add_list('list', 'unordered', false)}
                                            className="bg-[#3c3c3d] cursor-pointer font-bold p-3 text-white text-xl rounded-sm"
                                        >
                                            <h2>Lista Desordenada</h2>
                                        </div>

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
                            stateComponent === "table" && (
                                <div className="space-y-6 bg-[#ffffff] shadow-md p-6 rounded-md">

                                    <h2 className="text-lg font-bold text-gray-800">Insertar tabla</h2>

                                    <div className="flex flex-col items-start gap-4">
                                        <div className="grid grid-cols-6 grid-rows-5 gap-1 w-[180px] h-[150px] border border-gray-300 rounded-md p-2 relative">
                                            {Array.from({ length: 30 }).map((_, index) => {
                                                const row = Math.floor(index / 6) + 1;
                                                const col = (index % 6) + 1;

                                                return (
                                                    <div
                                                        key={index}
                                                        onMouseEnter={() => setDimensions({ rows: row, columns: col })}
                                                        onClick={() => add_table("table", row, col)}
                                                        className={`w-full h-full border rounded-sm transition-all duration-200 ${row <= dimensions.rows && col <= dimensions.columns
                                                            ? "bg-blue-500"
                                                            : "hover:bg-blue-100"
                                                            }`}
                                                    ></div>
                                                );
                                            })}
                                        </div>

                                        <span className="text-sm font-medium text-gray-600">
                                            {dimensions.rows} x {dimensions.columns}
                                        </span>
                                    </div>
                                </div>
                            )
                        }

                        {
                            stateComponent === 'activepause' && <ActivePause />
                        }

                        {
                            stateComponent === 'initImage' && <div className='h-[88vh] overflow-x-auto flex justify-start items-start scrollbar-hide'>
                                <InitialImage add_image={add_image} />
                            </div>
                        }

                        {
                            stateComponent === 'project' && <Projects type='main' design_id={design_id} />
                        }

                        {
                            stateComponent === 'image' && <MyImages add_image={add_image} />
                        }


                    </div>

                    <div className="h-full w-full overflow-y-auto">
                        <ViewSlide
                            current_component={current_component}
                            slides={slides}
                            removeComponent={removeComponent}
                            attributes={attributes}
                            handleSetAttributes={handleSetAttributes}
                            setCurrentComponent={setCurrentComponent}
                            addSlide={addSlide}
                            setCurrentSlideId={setCurrentSlideId}
                            setShowModal={setShowModal}
                            duplicateSlide={duplicateSlide}
                            setUpdateList={setUpdateList}
                        />

                        {showModal && (
                            <TemplateSlide
                                handleOptionClick={handleOptionClick}
                                setShowModal={setShowModal}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Main
