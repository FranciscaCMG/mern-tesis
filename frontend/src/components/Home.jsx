import React, { useState, useEffect } from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import api from '../utils/api'
import Item from './Home/Item';
import toast from 'react-hot-toast'
import CanvaMagical from 'canva-magical-mouse-effect'

const Home = () => {

    const [designs, setDesign] = useState([])

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

    const get_user_design = async () => {
        try {
            const { data } = await api.get('/api/user-designs');
            setDesign(data.designs);
        } catch (error) {
            console.error('Error fetching designs:', error);
        }
    };

    useEffect(() => {
        get_user_design();
    }, []);


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
                    </Carousel>
                </div>
            </div>
        </div>
    )
}

export default Home