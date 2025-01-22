import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { Link, useNavigate } from "react-router-dom";
import videoLogo from "/Logo2.png";


const Index = () => {
    const [type, setType] = useState('');
    const [show, setShow] = useState(false);
    const [loader, setLoader] = useState(false);

    const [state, setState] = useState({
        name: '',
        email: '',
        password: ''
    });

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    const user_register = async (e) => {
        e.preventDefault();
        try {
            setLoader(true);
            const { data } = await api.post('/api/user-register', state);
            setLoader(false);
            localStorage.setItem('canva_token', data.token);
            setState({ name: '', email: '', password: '' });
            window.location.href = '/';
        } catch (error) {
            setLoader(false);
            toast.error(error.response?.data?.message || "Error inesperado");
        }
    };

    const user_login = async (e) => {
        e.preventDefault();
        try {
            setLoader(true);
            const { data } = await api.post('/api/user-login', state);
            setLoader(false);
            localStorage.setItem('canva_token', data.token);
            localStorage.setItem('user_email', data.email);
            localStorage.setItem('user_name', data.name);
            setState({ email: '', password: '' });
            window.location.href = '/';
        } catch (error) {
            setLoader(false);
            toast.error(error.response?.data?.message || "Error inesperado");
        }
    };

    return (
        <div className="bg-[#ffffff] min-h-screen w-full">
            {/* Modal flotante */}
            <div
                className={`fixed inset-0 ${show ? "visible opacity-100" : "invisible opacity-0"
                    } transition-opacity duration-500 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm z-50`}
            >
                <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8 relative">
                    {/* Botón de cierre */}
                    <button
                        onClick={() => setShow(false)}
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 text-2xl"
                    >
                        <IoMdClose />
                    </button>

                    {/* Encabezado */}
                    <h2 className="text-2xl font-bold text-center text-purple-600 mb-2">
                        {type === "signin" ? "¡Hola! 👋" : "Gracias por querer ser parte ❤️"}
                    </h2>
                    <p className="text-gray-500 text-center mb-6">
                        {type === "signin"
                            ? "Qué bueno tenerte de vuelta."
                            : "Completa los siguientes datos para crear tu primera videoclase."}
                    </p>

                    {/* Formulario */}
                    {type === "signin" ? (
                        <form onSubmit={user_login}>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Correo
                                </label>
                                <input
                                    onChange={inputHandle}
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Ingresa tu correo"
                                    value={state.email}
                                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Contraseña
                                </label>
                                <input
                                    onChange={inputHandle}
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Ingresa tu contraseña"
                                    value={state.password}
                                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loader}
                                className={`w-full py-2 px-4 text-white rounded-lg shadow-md ${loader
                                    ? "bg-purple-300 cursor-not-allowed"
                                    : "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
                                    } transition-all duration-300`}
                            >
                                {loader ? "Cargando..." : "Inicia Sesión"}
                            </button>
                            <p className="mt-4 text-center text-sm text-gray-500">
                                ¿Aún no tienes cuenta?{" "}
                                <button
                                    onClick={() => setType("signup")}
                                    className="text-purple-600 hover:underline"
                                >
                                    Regístrate
                                </button>
                            </p>
                        </form>
                    ) : (
                        <form onSubmit={user_register}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Nombre
                                </label>
                                <input
                                    onChange={inputHandle}
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="¿Cómo quieres que te nombremos?"
                                    value={state.name}
                                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Correo
                                </label>
                                <input
                                    onChange={inputHandle}
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Ingresa tu correo"
                                    value={state.email}
                                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Contraseña
                                </label>
                                <input
                                    onChange={inputHandle}
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Crea tu contraseña"
                                    value={state.password}
                                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loader}
                                className={`w-full py-2 px-4 text-white rounded-lg shadow-md ${loader
                                    ? "bg-purple-300 cursor-not-allowed"
                                    : "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
                                    } transition-all duration-300`}
                            >
                                {loader ? "Cargando..." : "Regístrate"}
                            </button>
                            <p className="mt-4 text-center text-sm text-gray-500">
                                ¿Ya tienes cuenta?{" "}
                                <button
                                    onClick={() => setType("signin")}
                                    className="text-purple-600 hover:underline"
                                >
                                    Inicia sesión
                                </button>
                            </p>
                        </form>
                    )}
                </div>
            </div>

            {/* Barra de navegación */}
            <div className="bg-[#ffffff] shadow-md">
                <div className="w-[93%] m-auto py-3 flex justify-between items-center">
                    <div className="w-[80px] h-[48px]">
                        {/* Logo */}
                        <img className="w-full h-full" src={videoLogo} alt="imagen Logo" />

                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={() => {
                                setType("signin");
                                setShow(true);
                            }}
                            className="py-2 px-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-full shadow-md transition-transform transform hover:scale-105 hover:shadow-lg"
                        >
                            Iniciar sesión
                        </button>
                        <button
                            onClick={() => {
                                setType("signup");
                                setShow(true);
                            }}
                            className="py-2 px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full shadow-md transition-transform transform hover:scale-105 hover:shadow-lg"
                        >
                            Registrarse
                        </button>
                    </div>
                </div>
            </div>

            {/* Contenido principal */}
            <div className="py-[120px] px-6 flex justify-center items-center flex-col gap-8 bg-gray-50">
                <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 text-center leading-tight">
                    ¿
                    <span>Qué quieres </span>
                    <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                        diseñar
                    </span>
                    <span> hoy?</span>
                </h2>
                <div className="w-full max-w-3xl bg-gradient-to-br from-pink-500 to-purple-500 p-8 md:p-12 rounded-2xl shadow-xl text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-snug">
                        ¡Convierte tus ideas en contenido educativo de manera fácil!
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 mb-4">
                        No necesitas ser un experto en tecnología
                    </p>
                    <p className="text-lg md:text-xl text-gray-200">
                        Ahorra tiempo y enfócate en lo que mejor sabes hacer:{" "}
                        <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent animate-bounce">
                            enseñar
                        </span>
                    </p>
                    <button
                        onClick={() => {
                            setType("signup");
                            setShow(true);
                        }}
                        className="bg-white text-purple-600 font-semibold rounded-full px-8 py-3 mt-6 shadow-lg hover:bg-gray-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                        ¡Comienza a diseñar ahora!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Index;
