import React from 'react'

import Image from './Image';

const Myimages = () => {
  return (
    <div>
      <div className='w-full h-[40px] flex justify-center items-center bg-purple-500 rounded-sm text-white mb-3'>
        <label className='text-center cursor-pointer ' htmlFor="image">Subir imagen</label>
       <input type="file" id='image' className='hidden' /> 
      </div>
      <div className='h-[80vh] overflow-x-auto flex justify-start items-start scrollbar-hide'>
        <Image/>

      </div>
    </div>
  )
}

export default Myimages
