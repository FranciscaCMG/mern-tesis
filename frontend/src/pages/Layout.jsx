import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import videoLogo from "/Logo2.png";
import userLogo from "/Logo_User2.png";

import { token_decode } from '../utils/index';
import { FaHome } from 'react-icons/fa';
import { BsGrid1X2, BsFolder } from 'react-icons/bs';

import TemplateSlide from '../components/slide/TemplateSlide';

const Layout = () => {
  const userInfo = token_decode(localStorage.getItem('canva_token'));

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const logout = () => {
    localStorage.removeItem('canva_token');
    window.location.href = '/';
  };

  const handleOptionClick = (width, height) => {
    setShowModal(false); // Cierra el modal
    navigate('/design/create', {
      state: {
        type: 'create',
        width,
        height,
      },
    });
  };

  return (
    <div className='bg-[#18191b] min-h-screen w-full'>
      {/* Header */}
      <div className='bg-[#252627] shadow-md fixed left-0 top-0 w-full z-20'>
        <div className='w-[93%] m-auto py-3'>
          <div className='flex justify-between items-center'>
            <div className='w-[80px] h-[48px]'>
              <img className="w-full h-full" src={videoLogo} alt="Videoclases logo" />
            </div>
            <div className='flex gap-4 justify-center items-center relative'>
              <button
                onClick={() => setShowModal(true)}
                className='py-2 px-6 overflow-hidden text-center bg-[#8b3dff] text-white rounded-[3px] font-medium hover:bg-[#9553f8]'
              >
                Crear un diseño
              </button>
              <div onClick={() => setShowUserMenu(!showUserMenu)} className='cursor-pointer'>
                <img
                  src={userInfo?.image ? userInfo?.image : userLogo}
                  className='w-[45px] h-[45px] rounded-full'
                  alt='Usuario logo'
                />
              </div>
              <div
                className={`absolute top-[60px] right-0 w-[350px] bg-[#313030] p-3 border border-gray-700 transition duration-500 ${showUserMenu ? 'visible opacity-100' : 'invisible opacity-30'
                  }`}
              >
                <div className='px-2 py-2 flex justify-start gap-5 items-center'>
                  <img src={userLogo} className='w-[40px] h-[40px] rounded-full' alt='Usuario logo' />
                  <div className='flex justify-center flex-col items-start'>
                    <span className='text-[#e0ddddd] font-bold text-md'>Francisca Márquez</span>
                    <span className='text-[#c4c4c0] font-bold text-md'>francisca.marquez@usach.cl</span>
                  </div>
                </div>
                <ul className='text-[#e0dddd] font-semibold'>
                  <li>
                    <Link className='p-2'>
                      <span>Configuración</span>
                    </Link>
                  </li>
                  <li>
                    <div onClick={logout} className='p-2 cursor-pointer'>
                      <span>Logout</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <TemplateSlide
          handleOptionClick={handleOptionClick}
          setShowModal={setShowModal}
        />
      )}

      {/* Sidebar y Contenido */}
      <div className='w-full flex mt-16'>
        <div className='sidebar w-[300px] p-5 h-[calc(100vh-70px)] fixed'>
          <div className='px-2 py-2 flex justify-start gap-5 items-center mb-3'>
            <img src={userLogo} className='w-[40px] h-[40px] rounded-full' />
            <div className='flex justify-center flex-col items-start'>
              <span className='text-[#e0dddd] font-bold text-md'>Francisca Márquez</span>
              <span className='text-[#c4c0c0]'>Free</span>
            </div>
          </div>
          <div>
            <ul className='px-4 flex flex-col gap-2'>
              <li>
                <Link
                  to='/'
                  className={`text-[#e0dddd] px-2 py-2 flex justify-start items-center gap-2 ${pathname === '/' ? 'bg-[#ffffff26]' : ''
                    } rounded-[4px]`}
                >
                  <span className='text-xl'>
                    <FaHome />
                  </span>
                  <span className='font-medium'>Home</span>
                </Link>
              </li>
              <li>
                <Link
                  to='/projects'
                  className={`text-[#e0dddd] px-2 py-2 flex justify-start items-center gap-2 ${pathname === '/projects' ? 'bg-[#ffffff26]' : ''
                    } rounded-[4px]`}
                >
                  <span className='text-xl'>
                    <BsFolder />
                  </span>
                  <span className='font-medium'>Proyectos</span>
                </Link>
              </li>
              <li>
                <Link
                  to='/templates'
                  className={`text-[#e0dddd] px-2 py-2 flex justify-start items-center gap-2 ${pathname === '/templates' ? 'bg-[#ffffff26]' : ''
                    } rounded-[4px]`}
                >
                  <span className='text-xl'>
                    <BsGrid1X2 />
                  </span>
                  <span className='font-medium'>Plantillas</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className='ml-[300px] w-[calc(100%-300px)]'>
          <div className='py-4 pr-4 '>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
