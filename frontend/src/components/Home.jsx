import React, { useState } from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link, useNavigate } from 'react-router-dom';
import slide1C from "/Slide_1C.png";
import slide2C from "/Slide_2C.png";
import {FaTrash} from 'react-icons/fa'

const Home = () => {

    const navigate = useNavigate()

    const [state,setState] = useState({
        width: 0,
        height: 0,
    })

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name] : e.target.value
        })
    }

    const [show, setShow] = useState(false);
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 992, min: 464 },
            items: 3
        },
        mdtablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 3
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 4
        }
    };

    const create = () => {
        navigate('/desing/create', {
            state: {
                type : 'create',
                width : state.width,
                height : state.height
            }
        })
    }

    return (
        <div className='pt-5'>
            <div className='w-full flex justify-center items-center h-[250px] bg-gradient-to-r from-[#4c76cf] to-[#552ab8] relative rounded-md overflow-hidden'>
                <button onClick={() => setShow(!show)} className='px-4 py-2 text-[15px] overflow-hidden text-center bg-[#8b3dffad] text-white rounded-[3px] font-medium hover:bg-[#8b3dffd3] absolute top-3 right-3'>Custom Size</button>
                <div className={`absolute top-16 right-3 gap-3 bg-[#252627] w-[250px] p-4 text-white ${show ? 'visible opacity-100' : 'invisible opacity-50'} transition-all duration-500`}>
                    <div className='grid grid-cols-2 pb-4 gap-3 '>
                        <div className='flex gap-2 justify-center items-start flex-col'>
                            <label htmlFor='width'>Ancho</label>
                            <input required onChange={inputHandle} type='number' name='width' className='w-full outline-none px-2 py-[4px] bg-[#1b1a1a] border border-[#404040] rounded-md' id='width' />
                        </div>
                        <div className='flex gap-2 justify-center items-start flex-col'>
                            <label htmlFor='height'>Alto</label>
                            <input onChange={inputHandle} type='number' name='height' required className='w-full outline-none px-2 py-[4px] bg-[#1b1a1a] border border-[#404040] rounded-md' id='height' />
                        </div>
                    </div>
                    <button  onClick={create} className='px-4 py-2 text-[13px] overflow-hidden text-center bg-[#8b3dffad] text-white rounded-[3px] font-medium hover:bg-[#8b3dffd3] w-full'>Crear un diseño nuevo</button>
                </div>
                <div>
                    <h2 className='text-3xl pb-10 pt-6 font-semibold text-white'>
                        ¿Qué quieres diseñar hoy?
                    </h2>
                </div>
            </div>
            <div>
                <h2 className='text-2xl py-6 font-semibold text-white'>
                    Diseños recientes
                </h2>
                <div>
                    <Carousel
                        autoplay={true}
                        infinite={true}
                        responsive={responsive}
                        transitionDuration={500}
                    >
                        {
                            [1, 2, 3, 4, 5, 6, 7, 8].map((d, i) => <div className='relative group w-full h-[160px] px-2' key={i}>
                                <Link className='w-full h-full block bg-[#ffffff12] p-4 rounded-md'>
                                    <img className='w-full h-full rounded-md overflow-hidden' src={slide1C} alt='' />
                                </Link>
                                <div className='absolute hidden cursor-pointer top-1 right-2 text-red-500 p-2 transition-all duration-500 group-hover:block'><FaTrash/></div>
                            </div>)
                        }


                    </Carousel>

                </div>
            </div>
        </div>
    )
}

export default Home
