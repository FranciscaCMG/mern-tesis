import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import videoLogo from "/Logo2.png";

import { token_decode } from "../utils/index";
import { FaHome } from "react-icons/fa";
import { BsGrid1X2, BsFolder } from "react-icons/bs";

import TemplateSlide from "../components/slide/TemplateSlide";

const Layout = () => {
    const userInfo = token_decode(localStorage.getItem("canva_token"));
    const userEmail = localStorage.getItem("user_email");
    const userName = localStorage.getItem("user_name")?.toUpperCase() || "USUARIO";

    const [inicialName, setInicialName] = useState("")

    const { pathname } = useLocation();

    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const logout = () => {
        localStorage.removeItem("canva_token");
        window.location.href = "/";
    };

    const handleOptionClick = () => {
        setShowModal(false);
    };

    const get_inicial_name = () => {
        const names = userName.split(" ");
        if (names.length > 1) {
            setInicialName(names[0][0] + names[1][0]);
        } else {
            setInicialName(names[0][0]);
        }
    }

    useEffect(() => {
        get_inicial_name();
    }, []);

    const create = () => {
        setShowModal(true);
    };

    return (
        <div className="bg-[#ffffff] min-h-screen w-full">
            {/* Header */}
            <div className="bg-[#ffffff] shadow-md fixed left-0 top-0 w-full z-20">
                <div className="w-[93%] m-auto py-3">
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <Link className="w-[80px] h-[48px]" to="/">
                            <img className="w-full h-full" src={videoLogo} alt="imagen Logo" />
                        </Link>

                        {/* Botones y menú de usuario */}
                        <div className="flex gap-4 justify-center items-center relative">
                            {/* Botón para crear diseño */}
                            <button
                                onClick={create}
                                className="py-2 px-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-full shadow-md transition-transform transform hover:scale-105 hover:shadow-lg"
                            >
                                Crear un diseño
                            </button>

                            {/* Avatar de usuario */}
                            <div
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                className="cursor-pointer"
                            >
                                <div className="w-[50px] h-[50px] rounded-full border-2 border-purple-500 hover:border-purple-800 bg-purple-100 text-purple-700 hover:text-purple-800 flex items-center justify-center text-2xl transition-transform transform hover:scale-105 hover:shadow-lg ">
                                    {inicialName}
                                </div>
                            </div>

                            {/* Menú desplegable */}
                            <div
                                className={`absolute top-[60px] right-0 w-[350px] bg-[#ffffff] p-4 rounded-xl border border-gray-300 shadow-lg transform transition-all duration-500 ${showUserMenu
                                        ? "visible opacity-100 translate-y-0"
                                        : "invisible opacity-0 -translate-y-5"
                                    }`}
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-[45px] h-[45px] rounded-full border-2 border-purple-500  bg-purple-100 text-purple-700  flex items-center justify-center transition-all text-xl">
                                        {inicialName}
                                    </div>
                                    <div>
                                        <span className="block text-lg font-bold text-[#333333]">
                                            {userName || "Usuario"}
                                        </span>
                                        <span className="block text-sm text-[#777777]">
                                            {userEmail || "email@example.com"}
                                        </span>
                                    </div>
                                </div>

                                <ul className="text-[#555555] font-medium">
                                    <li className="p-2 hover:bg-[#f8f8f8] rounded-md cursor-pointer">
                                        <Link>
                                            <span>Configuración</span>
                                        </Link>
                                    </li>
                                    <li
                                        onClick={logout}
                                        className="p-2 hover:bg-[#f8f8f8] rounded-md cursor-pointer"
                                    >
                                        <span>Cerrar sesión</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showModal && (
                <TemplateSlide
                    handleOptionClick={handleOptionClick}
                    setShowModal={setShowModal}
                    flagFirstSlide={true}
                />
            )}

            {/* Sidebar y contenido principal */}
            <div className="w-full flex mt-16">
                {/* Sidebar */}
                <div className="sidebar w-[300px] p-1 h-[calc(100vh-70px)] fixed bg-[#f9f9f9] shadow-md rounded-r-xl">
                    <div className="px-2 pt-5 flex justify-start gap-5 items-center mb-6">
                        <div className="w-[50px] h-[50px] rounded-full border-2 border-purple-500  bg-purple-100 text-purple-700  flex items-center justify-center transition-all text-2xl">
                            {inicialName}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[#333333] font-bold text-md">
                                {userName || "Usuario"}
                            </span>
                        </div>
                    </div>
                    <ul className="flex flex-col gap-3 text-[#555555]">
                        <li>
                            <Link
                                to="/"
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg ${pathname === "/" ? "bg-[#e0e0e0]" : "hover:bg-[#f3f3f3]"
                                    }`}
                            >
                                <FaHome className="text-xl" />
                                <span className="font-medium">Home</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/projects"
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg ${pathname === "/projects" ? "bg-[#e0e0e0]" : "hover:bg-[#f3f3f3]"
                                    }`}
                            >
                                <BsFolder className="text-xl" />
                                <span className="font-medium">Proyectos</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/templates"
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg ${pathname === "/templates" ? "bg-[#e0e0e0]" : "hover:bg-[#f3f3f3]"
                                    }`}
                            >
                                <BsGrid1X2 className="text-xl" />
                                <span className="font-medium">Plantillas</span>
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Contenido principal */}
                <div className="ml-[300px] w-[calc(100%-300px)]">
                    <div className="py-4 pr-4">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Layout;
