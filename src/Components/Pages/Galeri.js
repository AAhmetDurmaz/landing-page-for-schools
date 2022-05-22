import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import Loading from '../SideComponents/LoadingFullPage';
import galleryBG from '../../Images/slider3.png';
import { BrowserView, MobileView } from 'react-device-detect';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

const Galeri = () => {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get(window.apiBase + '/gallery').then((response, err) => {
            if (err) {
                console.log(err);
            } else {
                if (response.data.code === 404) {
                    navigate('/404');
                } else {
                    setData(response.data);
                    setIsLoaded(true);
                }
            }
        })
    }, [navigate])

    return (
        <div>
            <Helmet><title>Galeri | Bilgisayar Mühendisliği</title></Helmet>
            {
                isLoaded ?
                    <>
                        <BrowserView>
                            <div className='h-screen flex'>
                                <div className='m-auto z-10 text-center'>
                                    <p className='m-auto text-white text-7xl font-bold font-sans uppercase textShadow'>Galeri</p>
                                    <p className='m-auto text-white text-xl font-bold font-sans textShadow'>Okulumuzdan kareler</p>
                                </div>
                                <div className='cover'></div>
                                <div className='video-wrapper'>
                                    <img alt='' src={galleryBG} />
                                </div>
                            </div>
                        </BrowserView>
                        <MobileView>
                            <div className='bgImageSetter grid grid-cols-1' style={{ backgroundImage: `url('${galleryBG}')` }}>
                                <div className='m-auto z-10 text-center'>
                                    <p className='m-auto text-white text-3xl font-bold font-sans uppercase textShadow'>Galeri</p>
                                    <p className='m-auto text-white text-sm font-bold font-sans textShadow'>Okulumuzdan kareler</p>
                                </div>
                                <div className='cover' style={{ height: 200 }}></div>
                            </div>
                        </MobileView>
                        <div className='mx-auto max-w-7xl my-2'>
                            <div className='w-full grid md:grid-cols-3'>
                                {
                                    data.map(item => (
                                        <div key={uuid()} className="bg-white rounded-lg overflow-hidden shadow relative">
                                            <a href={item.src} target='_blank' rel='noopener noreferrer'><img className="h-56 w-full object-cover object-center" src={item.src} alt="" /></a>
                                            <div className="p-4">
                                                <p className="block text-blue-500 font-semibold mb-2 text-lg md:text-base lg:text-lg">
                                                    {item.name}
                                                </p>
                                                <div className="text-gray-600 text-sm leading-relaxed block md:text-xs lg:text-sm">
                                                    {item.desc}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </>
                    :
                    <Loading />
            }
        </div>
    )
}

export default Galeri