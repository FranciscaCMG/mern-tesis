import React from "react";
import CreateComponent from "../CreateComponent";

const ViewSlide = ({ current_component, slides, removeComponent, attributes, handleSetAttributes, setCurrentComponent, setCurrentSlideId, setShowModal }) => {
    return (
        <div className='w-full flex h-full'>
            <div className={`flex flex-col items-center h-full ${!current_component ? 'w-full' : "w-[calc(100%-250px)]"}`}>

                <div className='m-w-[826px] m-h-[240px] flex justify-center items-center border-t-8'>
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
                                                slide.components.map((c) => <CreateComponent key={c.id} info={c} current_component={current_component} removeComponent={removeComponent} />)
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
                current_component && <div className='h-full w-[250px] text-gray-700 bg-[#fff] px-3 py-2'>

                    <div className='flex gap-3 flex-col items-start h-full px-3 justify-start'>
                        <div className='flex gap-4 justify-start items-start'>
                            <span className="text-gray-700">Color: </span>
                            <label className='w-[30px] h-[30px] cursor-pointer rounded-sm' style={{ background: `${current_component.color && current_component.color !== '#fff' ? current_component.color : 'gray'}` }} htmlFor="color"></label>
                            <input onChange={(e) => handleSetAttributes('color', e.target.value)} type="color" className='invisible' id='color' />
                        </div>
                        {
                            (current_component.name === 'main_frame' && attributes.image) && <div>
                                <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-md shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-300" onClick={remove_background}>Eliminar fondo</button>
                            </div>
                        }
                        {
                            current_component.name !== 'main_frame' && <div
                                className='flex gap-3 flex-col'>

                                <div className="flex gap-2 flex-col justify-start items-start">
                                    <textarea
                                        onChange={(e) =>
                                            setCurrentComponent({
                                                ...current_component,
                                                title: e.target.value,
                                            })
                                        }
                                        onInput={(e) => {
                                            e.target.style.height = "auto"; // Restablece la altura
                                            e.target.style.height = `${e.target.scrollHeight}px`; // Ajusta la altura según el contenido
                                        }}
                                        className="border border-gray-700 bg-transparent outline-none p-2 rounded-md resize-none overflow-hidden w-full"
                                        value={current_component.title}
                                        placeholder="Escribe aquí..."
                                    ></textarea>

                                    <button
                                        onClick={() => handleSetAttributes('text', current_component.title)}
                                        className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-md shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
                                    >
                                        Modificar texto
                                    </button>

                                    <p>Texto hablado: </p>

                                    <textarea
                                        onChange={(e) =>
                                            setCurrentComponent({
                                                ...current_component,
                                                audio_text: e.target.value,
                                            })
                                        }
                                        onInput={(e) => {
                                            e.target.style.height = "auto"; // Restablece la altura
                                            e.target.style.height = `${e.target.scrollHeight}px`; // Ajusta la altura según el contenido
                                        }}
                                        className="border border-gray-700 bg-transparent outline-none p-2 rounded-md resize-none overflow-hidden w-full"
                                        value={current_component.audio_text}
                                        placeholder="Escribe aquí..."
                                    ></textarea>

                                    <button
                                        onClick={() => handleSetAttributes('audio_text', current_component.audio_text)}
                                        className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-md shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
                                    >
                                        Modificar audio
                                    </button>
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