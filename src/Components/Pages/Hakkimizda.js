import React, { useState, useEffect } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import hakkimizdaMenu from '../../Images/rose-1.jpg';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import axios from 'axios';
import parser from 'html-react-parser';
import Loading from '../SideComponents/LoadingFullPage';

const Hakkimizda = () => {
    const [data, setData] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        axios.get(window.apiBase + '/about-us').then((response, err) => {
            if (err) console.log(err);
            else {
                setData(response.data);
                setIsLoaded(true);
            }
        })
    }, [])


    return (
        <div>
            <Helmet><title>Hakkımızda | Bilgisayar Mühendisliği</title></Helmet>
            {
                isLoaded ?
                    <>
                        <BrowserView>
                            <div className='h-screen flex'>
                                <div className='m-auto z-10 text-center'>
                                    <p className='m-auto text-white text-7xl font-bold font-sans uppercase textShadow'>Hakkımızda</p>
                                    <p className='m-auto text-white text-xl font-bold font-sans textShadow'>Bilgisayar Mühendisliği Hakkında.</p>
                                </div>
                                <div className='cover'></div>
                                <div className='video-wrapper'>
                                    <img alt='' src={data.src} />
                                </div>
                            </div>
                        </BrowserView>
                        <MobileView>
                            <div className='bgImageSetter grid grid-cols-1' style={{ backgroundImage: `url('${data.src}')` }}>
                                <div className='m-auto z-10 text-center'>
                                    <p className='m-auto text-white text-3xl font-bold font-sans uppercase textShadow'>Hakkımızda</p>
                                    <p className='m-auto text-white text-sm font-bold font-sans textShadow'>Bilgisayar Mühendisliği Hakkında.</p>
                                </div>
                                <div className='cover' style={{ height: 200 }}></div>
                            </div>
                        </MobileView>
                        <div className='max-w-7xl mx-auto py-5 px-3'>
                            <p className='text-5xl uppercase font-bold font-sans text-center border-b mb-3 text-firstColor'>Bölüm Hakkında</p>
                            <div className='max-w-5xl mx-auto font-sans'>
                                {parser(data.index)}
                            </div>
                            <div className='grid md:grid-cols-3 mt-2'>
                                <div className='m-1'>
                                    <Link to='/yonetim'>
                                        <img alt='' src={hakkimizdaMenu} />
                                        <p className='font-sans px-5 pt-5 text-lg text-firstColor hover:underline'>Yönetim Kadrosu</p>
                                        <p className='font-light font-sans px-5 pt-1 pb-5'>Bölümün Yönetim Kadrosu</p>
                                    </Link>
                                </div>
                                <div className='m-1'>
                                    <Link to='/vizyon-ve-misyon'>
                                        <img alt='' src={hakkimizdaMenu} />
                                        <p className='font-sans px-5 pt-5 text-lg text-firstColor hover:underline'>Vizyon ve Misyon</p>
                                        <p className='font-light font-sans px-5 pt-1 pb-5'>Bölümün Vizyon ve Misyonu</p>
                                    </Link>
                                </div>
                                <div className='m-1'>
                                    <a href='https://aday.ksbu.edu.tr/index/sayfa/8660/basinda-biz' rel='noopener noreferrer' target='_blank'>
                                        <img alt='' src={hakkimizdaMenu} />
                                        <p className='font-sans px-5 pt-5 text-lg text-firstColor hover:underline'>Basında Biz</p>
                                        <p className='font-light font-sans px-5 pt-1 pb-5'>Bölümün Yönetim Kadrosu</p>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </>
                    :
                    <Loading />
            }
        </div>
    )
}

export default Hakkimizda