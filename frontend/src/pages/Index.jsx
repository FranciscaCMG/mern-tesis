import React, { useState } from "react";
import { IoMdClose } from 'react-icons/io';
import videoLogo from "/Logo2.png";
import { AiOutlineGoogle } from "react-icons/ai";

const Index = () => {

    const [type, setType] = useState('');
    const [show, setShow] = useState(false);


    const [state, setState] = useState({
        name: '',
        email: '',
        password: ''
    })

    return (
        <div className="bg-[#18191b] min-h-screen w-full">
            <div className={`w-screen ${show ? 'visible opacity-100' : 'invisible opacity-30'} transition-all duration-500 h-screen fixed bg-[#252627ad] flex justify-center items-center`}>
                <div className="w-[350px] bg-[#323335] m-auto px-6 py-4 roinded-md relative">
                    <div onClick={() => setShow(false)} className="absolute right-4 top-4 text-xl cursor-pointer text-white"> <IoMdClose /> </div>
                    <h2 className="text-white pb-4 text-start text-xl">Hola! 👋
                    </h2>
                    <h2 className="text-white pb-4 text-left text-base">Qué bueno tenerte de vuelta.
                    </h2>
                    {
                        type === 'singin' &&
                        <form>
        <div className="flex flex-col gap-3 mb-3 text-white">
            <label htmlFor="email">Email</label>
            <input
                type="email"
                name="email"
                id="email"
                placeholder="email"
                value={state.email}
                
                className="px-3 py-2 rounded-md border outline-none border-[#5c5c5e] focus:border-purple-500 bg-transparent"
            />
        </div>
        <div className="flex flex-col gap-3 mb-3 text-white">
            <label htmlFor="password">Contraseña</label>
            <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
                value={state.password}
                
                className="px-3 py-2 rounded-md border outline-none border-[#5c5c5e] focus:border-purple-500 bg-transparent"
            />
        </div>
        <div>
            <button className="px-3 py-2 rounded-md bg-purple-500 w-full outline-none hover:bg-purple-600 text-white">Iniciar sesión</button>
        </div>
                            <div className="flex py-4 justify-between items-center px-3">
                                <div className="w-[45%] h-[1px] bg-[#434449]"></div>
                                <div className="w-[6%] text-center flex pb-1 px-1 text-white" >o</div>
                                <div className="w-[45%] h-[1px] bg-[#434449]"></div>
                            </div>
                            <div className="pb-4">
                                <button className="px-3 flex justify-center items-center gap-2 py-2 rounded-md bg-orange-600 w-full text-white outline-none hover:bg-orange-800">
                                    <span> <AiOutlineGoogle /></span>
                                    <span>Iniciar sesión con gmail</span>
                                </button>
                            </div>
                        </form>
                    }
                    {
                        type === 'singup' && <form>
                            <div className="flex flex-col gap-3 mb-3 text-white">
                                <label htmlFor="name">Nombre</label>
                                <input type="text" value={state.name} name='name' id='name' placeholder="name"  className="px-3 py-2 rounded-md border outline-none border-[#5c5c5e] focus:border-purple-500 bg-transparent" />
                            </div>
                            <div className="flex flex-col gap-3 mb-3 text-white">
                                <label htmlFor="email">Email</label>
                                <input type="email" value={state.email} name='email' id='email' placeholder="email" className="px-3 py-2 rounded-md border outline-none border-[#5c5c5e] focus:border-purple-500 bg-transparent" />
                            </div>
                            <div className="flex flex-col gap-3 mb-3 text-white">
                                <label htmlFor="password">Contraseña</label>
                                <input type="password" value={state.password} name='password' id='password' placeholder="password" className="px-3 py-2 rounded-md border outline-none border-[#5c5c5e] focus:border-purple-500 bg-transparent" />
                            </div>
                            <div>
                                <button className="px-3 py-2 rounded-md bg-purple-500 w-full ounline-none hover:bg-purple-600 text-white">Registrarse</button>
                            </div>
                        </form>
                    }


                </div>

            </div>
            <div className="bg-[#252627] shadow-md">
                <div className="w-[93%] m-auto py-3">
                    <div className="flex justify-between item-center">
                        <div className="w-[80px] h-[48px]">
                            <img className="w-full h-full" src={videoLogo} alt="Videoclases logo" />

                        </div>
                        <div className="flex gap-4">
                            <button onClick={() => {
                                setType('singin');
                                setShow(true);
                            }} className="py-2 w-[120px] text-center bg-blue-500 text-white transition-all hover:bg-blue-600 rounded-[5px] font-medium">Iniciar sesión</button>
                            <button onClick={() => {
                                setType('singup');
                                setShow(true);
                            }} className="py-2 w-[120px] text-center bg-purple-500 text-white transition-all hover:bg-purple-600 rounded-[5px] font-medium">Registrarse</button>
                        </div>

                    </div>
                </div>
            </div>
            <div className="w-full h-full justify-center items-center p-4">
                <div className="py-[169px] flex justify-center items-center flex-col gap-6" >
                    <h1 className="text-5xl text-[#c7c5c5] font-bold"> Transforma tu contenido en videoclases </h1>
                    <span className="text-[#aca9a9] text-2xl font-medium">Convierte tus ideas en contenido educativo de manera fácil</span>
                    <span className="text-[#aca9a9] text-2xl font-medium">No necesitas ser un experto en tecnología.</span>
                    <span className="text-[#aca9a9] text-2xl font-medium">
                        Ahorra tiempo y enfócate en lo que mejor sabes hacer: enseñar
                    </span>
                    <button onClick={() => {
                        setType('singin')
                        setShow(true)
                    }} className="py-2 w-[200px] text-center bg-purple-500 text-white transition-all hover:bg-purple-600 rounded-[5px] font-medium">Comienza a crear</button>
                </div>
            </div>
        </div>
    )
}

export default Index;