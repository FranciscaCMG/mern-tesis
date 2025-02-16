import React from "react";
import { FaAlignLeft, FaAlignCenter, FaAlignRight } from "react-icons/fa";

import CreateComponent from "../CreateComponent";

const ViewSlide = ({ current_component, slides, removeComponent, handleSetAttributes, setCurrentComponent, setCurrentSlideId, setShowModal, duplicateSlide, setUpdateList }) => {
    return (
        <div className="flex w-full h-full">
            <div className={`flex flex-col items-center h-full overflow-y-auto ${!current_component ? "w-full" : "w-[calc(100%-250px)]"}`}>

                <div className='m-w-[826px] m-h-[240px] flex justify-center items-center'>
                    <div id='main_design' className='w-auto relative h-auto'>
                        {
                            slides.map((slide, index) => {
                                return (
                                    <div
                                        key={index}
                                        id={`photo-${index}`}
                                        className='w-full h-full flex flex-col justify-center items-center'
                                        onClick={() => setCurrentSlideId(slide.id)}
                                    >
                                        <div className='w-full h-full flex justify-center items-center'>
                                            {
                                                slide.components.map((c) => <CreateComponent key={c.id} info={c} current_component={current_component} removeComponent={removeComponent} duplicateSlide={duplicateSlide} setUpdateList={setUpdateList} />)
                                            }
                                        </div>
                                        {index < slides.length - 1 && <div className='h-4'></div>}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <button
                    onClick={() => setShowModal(true)}
                    className="mt-4 py-3 px-[346px] text-center bg-gradient-to-r from-purple-500 to-purple-600 text-white font-medium rounded-md shadow-md hover:from-purple-600 hover:to-purple-700 hover:shadow-lg transition-all duration-300"
                >
                    Añadir una página
                </button>

            </div>

            {
                current_component && <div className='h-full w-[280px] bg-white/10 shadow-lg rounded-xl px-4 py-4 text-gray-700'>

                    <div className='flex flex-col gap-4 h-full'>
                        <div className='flex items-center gap-3'>
                            <span className="text-gray-800 font-medium">Color: </span>
                            <label className='w-8 h-8 rounded-md border border-gray-300 cursor-pointer transition-transform transform hover:scale-110' style={{ background: `${current_component.color && current_component.color !== '#fff' ? current_component.color : 'gray'}` }} htmlFor="color"></label>
                            <input onChange={(e) => handleSetAttributes('color', e.target.value)} type="color" className='invisible' id='color' />
                        </div>
                        {
                            current_component.name !== 'main_frame' && <div
                                className='flex flex-col gap-4 p-4'>

                                <div className="flex gap-2 flex-col justify-start items-start">

                                    <div className="flex flex-col items-start">
                                        <h3 className="mb-2 font-semibold">Alinear el contenido</h3>

                                        <div className="flex space-x-3">



                                            <button
                                                onClick={() => handleSetAttributes('textAlign', 'left')}
                                                className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-md hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                                            >
                                                <FaAlignLeft className="text-xl" />
                                            </button>

                                            <button
                                                onClick={() => handleSetAttributes('textAlign', 'center')}
                                                className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-md hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                                            >
                                                <FaAlignCenter className="text-xl" />
                                            </button>

                                            <button
                                                onClick={() => handleSetAttributes('textAlign', 'right')}
                                                className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-md hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                                            >
                                                <FaAlignRight className="text-xl" />
                                            </button>

                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-m font-semibold text-gray-800 mb-1">Texto</h3>
                                        <textarea
                                            onChange={(e) =>
                                                setCurrentComponent({
                                                    ...current_component,
                                                    title: e.target.value,
                                                })
                                            }
                                            onInput={(e) => {
                                                e.target.style.height = "auto";
                                                const newHeight = Math.min(e.target.scrollHeight, 100); 
                                                e.target.style.height = `${newHeight}px`;
                                            }}
                                            className="border border-gray-300 bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-400 outline-none p-3 rounded-lg w-full resize-none transition-all duration-300 min-h-[50px] max-h-[300px] overflow-auto"
                                            value={current_component.title}
                                            placeholder="Escribe aquí..."
                                        ></textarea>

                                        <button
                                            onClick={() => handleSetAttributes('text', current_component.title)}
                                            className="w-full mt-2 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
                                        >
                                            Modificar texto
                                        </button>
                                    </div>

                                    <div>
                                        <h3 className="text-m font-semibold text-gray-800 mb-1">Texto hablado</h3>

                                        <textarea
                                            onChange={(e) =>
                                                setCurrentComponent({
                                                    ...current_component,
                                                    audio_text: e.target.value,
                                                })
                                            }
                                            onInput={(e) => {
                                                e.target.style.height = "auto";
                                                const newHeight = Math.min(e.target.scrollHeight, 100); 
                                                e.target.style.height = `${newHeight}px`;
                                            }}
                                            className="border border-gray-300 bg-gray-100 focus:ring-2 focus:ring-blue-500 outline-none p-3 rounded-lg w-full resize-none transition-all duration-300"
                                            value={current_component.audio_text}
                                            placeholder="Escribe aquí..."
                                        ></textarea>

                                        <button
                                            onClick={() => handleSetAttributes('audio_text', current_component.audio_text)}
                                            className="w-full mt-2 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
                                        >
                                            Modificar audio
                                        </button>
                                    </div>


                                    {current_component.name === "alternative" && (
                                        <>
                                            <h3 className="text-m font-semibold text-gray-800 mb-1">Selección de alternativa</h3>
                                            <button
                                                onClick={() => {
                                                    const newValue = !current_component.alternative;
                                                    setCurrentComponent({
                                                        ...current_component,
                                                        alternative: newValue,
                                                    });
                                                    handleSetAttributes("alternative", newValue);
                                                    alert(newValue ? "¡Seleccionada como correcta!" : "Se ha deseleccionado como correcta");
                                                }}
                                                className={`w-full py-2 text-white font-semibold rounded-lg shadow-md transition-all duration-300 
            ${current_component.alternative
                                                        ? "bg-green-500 hover:bg-green-600"
                                                        : "bg-blue-500 hover:bg-blue-600"}`}
                                            >
                                                {current_component.alternative ? "Seleccionada como correcta" : "Seleccionar como correcta"}
                                            </button>
                                        </>
                                    )}

                                    {current_component.name === "table" && (
                                        <>
                                        <h3 className="text-m font-semibold text-gray-800 mb-1">Descripción Tabla</h3>
                                            <textarea
                                                onChange={(e) =>
                                                    setCurrentComponent({
                                                        ...current_component,
                                                        description: e.target.value,
                                                    })
                                                }
                                                onInput={(e) => {
                                                    e.target.style.height = "auto";
                                                    const newHeight = Math.min(e.target.scrollHeight, 100); 
                                                    e.target.style.height = `${newHeight}px`;
                                                }}
                                                className="border border-gray-300 bg-gray-100 focus:ring-2 focus:ring-blue-500 outline-none p-3 rounded-lg w-full resize-none transition-all duration-300"
                                                value={current_component.description}
                                                placeholder="Escribe aquí..."
                                            ></textarea>

                                            <button
                                                onClick={() => handleSetAttributes('description', current_component.description)}
                                                className="w-full mt-2 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
                                            >
                                                Modificar descripción
                                            </button>
                                        </>
                                    )}



                                </div>

                            </div>
                        }
                    </div>
                </div>
            }

        </div>
    );
};

export default ViewSlide;