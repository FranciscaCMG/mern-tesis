import React from "react";

import CreateComponent from "../CreateComponent";

const ViewSlide = ({ current_component, slides, addSlide, removeComponent, attributes, handleSetAttributes, setCurrentComponent, setCurrentSlideId }) => {
    return (
        <div className='w-full flex h-full'>
            <div className={`flex flex-col items-center h-full ${!current_component ? 'w-full' : "w-[calc(100%-250px)]"}`}>

                <div className='m-w-[826px] m-h-[240px] flex justify-center items-center'>
                    <div id='main_design' className='w-auto relative h-auto'>
                        {
                            slides.map((slide, index) => {
                                return (
                                    <div 
                                        key={index} 
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

                <button onClick={addSlide} className='mt-4 py-2 px-56 overflow-hidden text-center bg-[#f0f1f5] text-black rounded-[3px] font-medium hover:bg-[#9553f8]'>
                    Añadir una página
                </button>
            </div>

            {
                current_component && <div className='h-full w-[250px] text-gray-300 bg-[#252627] px-3 py-2'>

                    <div className='flex gap-3 flex-col items-start h-full px-3 justify-start'>
                        <div className='flex gap-4 justify-start items-start'>
                            <span>Color: </span>
                            <label className='w-[30px] h-[30px] cursor-pointer rounded-sm' style={{ background: `${current_component.color && current_component.color !== '#fff' ? current_component.color : 'gray'}` }} htmlFor="color"></label>
                            <input onChange={(e) => handleSetAttributes('color', e.target.value)} type="color" className='invisible' id='color' />
                        </div>
                        {
                            (current_component.name === 'main_frame' && attributes.image) && <div>
                                <button className='p-[6px] bg-slate-700 text-white rounded-sm' onClick={remove_background}>Eliminar fondo</button>
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
                                        className="px-4 py-2 bg-purple-500 text-xs text-white rounded-sm"
                                    >
                                        Agregar
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