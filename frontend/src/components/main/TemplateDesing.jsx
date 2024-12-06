import React from 'react'
import slide1C from "/Slide_1C.png";

const TemplateDesing = () => {
  return (
    <>

    {
        [1,2,3,4].map((d,i)=><div className='group w-full rounded-md overflow-hidden bg-[#ffffff12] cursor-pointer'>
            <img className='w-full h-full rounded-md overflow-hidden' src={slide1C} alt="Imagen Slide 1C" />
        </div>

        )
    }

    </>
  )
}

export default TemplateDesing
