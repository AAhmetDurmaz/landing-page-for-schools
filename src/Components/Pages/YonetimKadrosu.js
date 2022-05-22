import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { BrowserView, MobileView } from 'react-device-detect';
import yonetimBG from '../../Images/slider1.png';
import { v4 as uuid } from 'uuid';
import { ExternalLinkIcon } from '@heroicons/react/outline';
import axios from 'axios';
import Loading from '../SideComponents/LoadingFullPage';

const YonetimKarosu = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get(window.apiBase + '/administration').then((response, err) => {
            if (err) console.log(err);
            else {
                setData(response.data);
                setIsLoaded(true);
            }
        })
    }, [])

    return (
        <div>
            <Helmet><title>Yönetim Kadrosu | Bilgisayar Mühendisliği</title></Helmet>
            {
                isLoaded ?
                    <>
                        <BrowserView>
                            <div className='h-screen flex'>
                                <div className='m-auto z-10 text-center'>
                                    <p className='m-auto text-white text-7xl font-bold font-sans uppercase textShadow'>Yönetim Kadrosu</p>
                                </div>
                                <div className='cover'></div>
                                <div className='video-wrapper'>
                                    <img alt='' src={yonetimBG} />
                                </div>
                            </div>
                        </BrowserView>
                        <MobileView>
                            <div className='bgImageSetter grid grid-cols-1' style={{ backgroundImage: `url('${yonetimBG}')` }}>
                                <div className='m-auto z-10 text-center'>
                                    <p className='m-auto text-white text-3xl font-bold font-sans uppercase textShadow'>Yönetim Kadrosu</p>
                                </div>
                                <div className='cover' style={{ height: 200 }}></div>
                            </div>
                        </MobileView>
                        <div className='max-w-7xl mx-auto py-5 px-3'>
                            <p className='text-5xl uppercase font-bold font-sans text-center border-b mb-3 text-firstColor'>Yönetim Kadrosu</p>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {
                                    data.map(item => (
                                        <div key={uuid()} className="w-full bg-white rounded overflow-hidden flex flex-col md:flex-row">
                                            <div className="w-full md:w-2/5 h-80">
                                                <img className="object-center object-cover w-full h-full" src={item.src} alt='' />
                                            </div>
                                            <div className="w-full md:w-3/5 text-left p-6 md:p-4 space-y-2">
                                                <p className="text-xl text-gray-700 font-bold">{item.name}</p>
                                                <p className="text-base text-gray-500 font-semibold">{item.role}</p>
                                                <p className="text-base leading-relaxed text-gray-500 font-normal">{item.desc}</p>
                                                <div className="flex justify-start space-x-2">
                                                    <a href={item.href} target='_blank' rel='noreferrer noopener' className="text-gray-500 hover:text-gray-600 flex items-center">
                                                        <ExternalLinkIcon className='h-6 w-6 mr-1' />
                                                        Detaylı bilgi
                                                    </a>
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

export default YonetimKarosu