import React from 'react'
import usachLogo from "/Logo_Usach.jpg";

const Image = ({add_image}) => {
    return (
        <div className='grid grid-cols-2 gap-2'>
            {
                [1, 2, 3, 4].map((img, i) => <div key={i} onClick={()=> add_image(usachLogo)} className='w-full h-[200px] overflow-hidden rounded-sm cursor-pointer'>
                    <img className='w-full h-full object-fill' src={usachLogo} alt="" />

                </div>)
            }
        </div>

    )
}

export default Image
