import React, { useState, useEffect } from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useNavigate } from 'react-router-dom'
import api from '../utils/api'
import Item from './Home/Item';
import toast from 'react-hot-toast'
import CanvaMagical from 'canva-magical-mouse-effect'

const Home = () => {

    const [designs, setDesign] = useState([])
    const navigate = useNavigate()
    const [state, setState] = useState({
        width: 0,
        height: 0
    })

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const [show, setShow] = useState(false)
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 3
        },
        mdtablet: {
            breakpoint: { max: 992, min: 464 },
            items: 3
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 4
        }
    };

    const create = () => {
        navigate('/design/create', {
            state: {
                type: 'create',
                width: state.width,
                height: state.height
            }
        })
    }

    const get_user_design = async () => {
        try {
            const { data } = await api.get('/api/user-designs');
            setDesign(data.designs);
            console.log("AAAAAAfERVR")
            console.log(data)
        } catch (error) {
            console.error('Error fetching designs:', error);
            // Display an error message to the user
        }
    };

    useEffect(() => {
        get_user_design();
    }, []); // Fetch designs on component mount


    const delete_design = async (design_id) => {
        try {
            const { data } = await api.put(`/api/delete-user-image/${design_id}`)
            toast.success(data.message)
            get_user_design()
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const options = {

        removeStarTime: 3500,
        iconText: "★",
        cursorStyle: true,
        iconFontSizes: ["20px"],
        background: "linear-gradient(145deg, #FF597B, rgb(58, 38, 153))",
        starColors: ["red", "yellow", "orange"]

    }


    return (
        <div className='pt-5'>

            <div className='w-fill h-[250px] rounded-md overflow-hidden'>
                <CanvaMagical options={options} >
                    <div className='relative flex justify-center items-center w-full h-full'>
                        <form onSubmit={create} className={`absolute top-16 right-3 gap-3 bg-[#252627] w-[250px] p-4 text-white ${show ? 'visible opacity-100' : 'invisible opacity-50'} transition-all duration-500`}>
                            <div className='grid grid-cols-2 pb-4 gap-3'>
                                <div className='flex gap-2 justify-center items-start flex-col'>
                                    <label htmlFor="width">Ancho</label>
                                    <input required onChange={inputHandle} type="number" name='width' className='w-full outline-none px-2 py-[4px] bg-[#1b1a1a] border border-[#404040] rounded-md' id='width' />
                                </div>
                                <div className='flex gap-2 justify-center items-start flex-col'>
                                    <label htmlFor="height">Alto</label>
                                    <input onChange={inputHandle} type="number" name='height' required className='w-full outline-none px-2 py-[4px] bg-[#1b1a1a] border border-[#404040] rounded-md' id='height' />
                                </div>
                            </div>
                            <button className='px-4 py-2 text-[13px] overflow-hidden text-center bg-[#8b3dffad] text-white rounded-[3px] font-medium hover:bg-[#8b3dffd3] w-full'>Crear un diseño nuevo</button>
                        </form>
                        <div>
                            <h2 className='text-3xl pb-10 pt-6 font-semibold text-white'>¿Que quieres diseñar hoy?</h2>
                        </div>
                    </div>
                </CanvaMagical>

            </div>
            <div>
                <h2 className='text-xl py-6 font-semibold text-black'>Diseños recientes</h2>
                <div>
                    <Carousel
                        autoPlay={true}
                        infinite={true}
                        responsive={responsive}
                        transitionDuration={500}
                    >
                        {
                            designs.map((d, i) => <Item delete_design={delete_design} design={d} key={i} />)
                        }
                        {

                        }
                    </Carousel>
                </div>
            </div>
        </div>
    )
}

export default Home