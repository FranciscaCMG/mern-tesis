import React from "react";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

import Titulo from "/Titulo.png";
import I from "/I.png";
import D4 from "/D-4.png";
import DH from "/D-H.png";
import DV from "/D-V.png";
import T2HIn from "/T-2H-In.png";
import T2HS from "/T-2H-S.png";
import T2VD from "/T-2V-D.png";
import T2VI from "/T-2V-I.png";
import Alternativa from "/Alternativa.png";

const TemplateSlide = ({ handleOptionClick, setShowModal, flagFirstSlide }) => {
    const navigate = useNavigate();

    const createFirstSlide = (index) => {
        if (flagFirstSlide) {
            navigate("/design/create", {
                state: {
                    type: "create",
                    width: 480,
                    height: 826,
                    title: "Mini videoclases",
                    numberTemplate: index,
                },
            });
        }else {
            handleOptionClick(index);
            setShowModal(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-30 backdrop-blur-md">
            {/* Contenedor principal */}
            <div className="bg-white p-8 rounded-lg shadow-lg w-[1000px] relative">
                {/* Botón de cierre */}
                <div
                    onClick={() => setShowModal(false)}
                    className="absolute right-4 top-4 text-2xl cursor-pointer text-gray-600 hover:text-gray-900 transition-all duration-200"
                >
                    <IoMdClose />
                </div>

                {/* Título */}
                <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
                    Selecciona una diapositiva
                </h2>

                {/* Opciones de diapositivas */}
                <div className="grid grid-cols-4 gap-6">
                    {[I, Titulo, D4, T2VD, T2VI, T2HIn, T2HS, DV, DH, Alternativa ].map((src, index) => (
                        <button
                            key={index}
                            onClick={() => createFirstSlide(index + 1)}
                            className="w-[210px] h-[120px] bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 text-center rounded-lg shadow-md hover:from-gray-200 hover:to-gray-300 hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center"
                        >
                            <img
                                src={src}
                                alt={`Slide option ${index + 1}`}
                                className="w-[200px] h-[100px] mt-2 mb-2 rounded-md"
                            />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TemplateSlide;
