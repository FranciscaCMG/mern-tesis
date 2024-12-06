import React from 'react'
import { Link } from 'react-router-dom';
import slide2C from "/Slide_2C.png";

const Projects = () => {
  return (
    <div className='h-[88vh] overflow-x-auto flex justify-start items-start scrollbar-hide'>
    <div className='grid grid-cols-2 gap-2'>
        {
            [1,2,3,4].map((img,i) => <Link key={i} className='w-full h-[90px] overflow-hidden rounded-sm cursor-pointer'>
                <img className='w-full h-full object-fill' src={slide2C} alt="" />

            </Link> )
        }
    </div>

  </div>
  )
}

export default Projects
