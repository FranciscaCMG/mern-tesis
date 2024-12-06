import React from 'react'
import {Link} from 'react-router-dom'
import videoLogo from "/Logo2.png";

const Header = () => {

  const saveImage = () => {

  }

  const downloadImage = () => {
    
  }


  return (
    <div className='h-[60px] bg-gradient-to-r from-[#212122] via-[#27282b] to-[#2a2b2c] w-full'>
      <div className='flex justify-between px-10 items-center text-gray-300 h-full'>
        <Link className='w-[80px] h-[48px]' to='/'>
          <img className="w-full h-full" src={videoLogo} alt='imagen Logo' />
        </Link>
        <span className='text-xl'>Mini videoclases</span>
        <div className='flex justify-center items-center gap-2 text-gray-300'>
          <button onClick={saveImage} className='px-3 py-[6px] outline-none bg-[#252627] rounded-sm'>Guardar</button>
          <button onClick={downloadImage} className='px-3 py-[6px] outline-none bg-[#252627] rounded-sm'>Descargar</button>
        </div>

      </div>
      
    </div>
  )
}

export default Header
