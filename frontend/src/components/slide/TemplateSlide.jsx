import React from "react";
import { IoMdClose } from 'react-icons/io';

import Titulo from "/Titulo.png";
import I from "/I.png";
import D4 from "/D-4.png";
import DH from "/D-H.png";
import DV from "/D-V.png";
import T2HIn from "/T-2H-In.png";
import T2HS from "/T-2H-S.png";
import T2VD from "/T-2V-D.png";
import T2VI from "/T-2V-I.png";

const TemplateSlide = ({handleOptionClick, setShowModal}) => {
    return (
        <div className='fixed inset-0 bg-[#000000a6] flex justify-center items-center z-30'>
          <div className='bg-[#252627] p-6 rounded-lg w-[900px] relative'>
            <div
              onClick={() => setShowModal(false)}
              className='absolute right-4 top-4 text-xl cursor-pointer text-white'
            >
              <IoMdClose />
            </div>
            <h2 className='text-white text-center text-lg font-bold mb-4'>Elige un diseño</h2>
            <div className='grid grid-cols-3 gap-4 justify-center'>
              <button
                onClick={() => handleOptionClick(1)}
                className='w-[250px] h-[120px] bg-[#3c3c3d] text-white text-center rounded-md hover:bg-[#4a4a4b] flex flex-col items-center justify-center'
              >
                <img
                  src={I}
                  alt="1920x1080"
                  className='w-[250px] h-[120px] mb-2 rounded-md'
                />
              </button>
              <button
                onClick={() => handleOptionClick(2)}
                className='w-[250px] h-[120px] bg-[#3c3c3d] text-white text-center rounded-md hover:bg-[#4a4a4b] flex flex-col items-center justify-center'
              >
                <img
                  src={Titulo}
                  alt="1920x1080"
                  className='w-[250px] h-[120px] mb-2 rounded-md'
                />
              </button>
              <button
                onClick={() => handleOptionClick(3)}
                className='w-[250px] h-[120px] bg-[#3c3c3d] text-white text-center rounded-md hover:bg-[#4a4a4b] flex flex-col items-center justify-center'
              >
                <img
                  src={D4}
                  alt="1920x1080"
                  className='w-[250px] h-[120px] mb-2 rounded-md'
                />
              </button>
              <button
                onClick={() => handleOptionClick(4)}
                className='w-[250px] h-[120px] bg-[#3c3c3d] text-white text-center rounded-md hover:bg-[#4a4a4b] flex flex-col items-center justify-center'
              >
                <img
                  src={T2VD}
                  alt="1920x1080"
                  className='w-[250px] h-[120px] mb-2 rounded-md'
                />
              </button>
              <button
                onClick={() => handleOptionClick(5)}
                className='w-[250px] h-[120px] bg-[#3c3c3d] text-white text-center rounded-md hover:bg-[#4a4a4b] flex flex-col items-center justify-center'
              >
                <img
                  src={T2VI}
                  alt="1920x1080"
                  className='w-[250px] h-[120px] mb-2 rounded-md'
                />
              </button>
              <button
                onClick={() => handleOptionClick(6)}
                className='w-[250px] h-[120px] bg-[#3c3c3d] text-white text-center rounded-md hover:bg-[#4a4a4b] flex flex-col items-center justify-center'
              >
                <img
                  src={T2HIn}
                  alt="1920x1080"
                  className='w-[250px] h-[120px] mb-2 rounded-md'
                />
              </button>
              <button
                onClick={() => handleOptionClick(7)}
                className='w-[250px] h-[120px] bg-[#3c3c3d] text-white text-center rounded-md hover:bg-[#4a4a4b] flex flex-col items-center justify-center'
              >
                <img
                  src={T2HS}
                  alt="1920x1080"
                  className='w-[250px] h-[120px] mb-2 rounded-md'
                />
              </button>
              <button
                onClick={() => handleOptionClick(8)}
                className='w-[250px] h-[120px] bg-[#3c3c3d] text-white text-center rounded-md hover:bg-[#4a4a4b] flex flex-col items-center justify-center'
              >
                <img
                  src={DV}
                  alt="1920x1080"
                  className='w-[250px] h-[120px] mb-2 rounded-md'
                />
              </button>
              <button
                onClick={() => handleOptionClick(9)}
                className='w-[250px] h-[120px] bg-[#3c3c3d] text-white text-center rounded-md hover:bg-[#4a4a4b] flex flex-col items-center justify-center'
              >
                <img
                  src={DH}
                  alt="1920x1080"
                  className='w-[250px] h-[120px] mb-2 rounded-md'
                />
              </button>
            </div>

          </div>
        </div>
    );
};

export default TemplateSlide;