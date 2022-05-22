import React, { useState, useEffect } from 'react';
import ksbuVideo from '../../Video/ksbu-bilmuh-video.webm';
import { BrowserView, MobileView } from 'react-device-detect';
import { Link } from 'react-router-dom';
import {
    ArrowRightIcon,
} from '@heroicons/react/outline';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import Loading from '../SideComponents/LoadingLocal';
import { Helmet } from 'react-helmet';
import TextTransition, { presets } from 'react-text-transition';

const texts = [
    'BİLGİSAYAR MÜHENDİSLİĞİ',
    'KÜTAHYA SAĞLIK BİLİMLERİ ÜNİVERSİTESİ',
    'GELECEĞİ ŞEKİLLENDİRİYORUZ',
];

const MainPage = () => {
    const [openTab, setOpenTab] = useState(1);
    const [isLoaded, setIsLoaded] = useState(false);
    const [announcements, setAnnouncements] = useState([]);
    const [firstAnnouncement, setFirstAnnouncement] = useState([]);
    const [events, setEvents] = useState([]);
    const [social, setSocial] = useState([]);
    const [lastMonth, setLastMonth] = useState([]);
    const [blog, setBlog] = useState([]);
    const [index, setIndex] = React.useState(0);
    useEffect(() => {
        axios.get(window.apiBase + '/main-page').then((response, err) => {
            if (err) {
                console.log(err);
                setIsLoaded(true);
            }
            else {
                setFirstAnnouncement(response.data[0].shift());
                setAnnouncements(response.data[0]);
                setEvents(response.data[1]);
                setSocial(response.data[2]);
                setLastMonth(response.data[3]);
                setBlog(response.data[4]);
                setIsLoaded(true);
            }
        });
        const intervalId = setInterval(() =>
            setIndex(index => index + 1),
            3000
        );
        return () => clearTimeout(intervalId);
    }, []);

    return (
        <div>
            {/* TOP VIDEO */}
            <Helmet><title>Ana Sayfa | Bilgisayar Mühendisliği</title></Helmet>
            <BrowserView>
                <div className='h-screen flex'>
                    <TextTransition
                        className='m-auto text-white z-10 text-7xl font-bold textShadow text-center'
                        text={texts[index % texts.length]}
                        springConfig={presets.wobbly}
                    />
                    <div className='cover'></div>
                    <div className='video-wrapper'>
                        <video id='ksbu-video' autoPlay muted loop>
                            <source src={ksbuVideo} type="video/mp4" />
                        </video>
                    </div>
                </div>
            </BrowserView>
            <MobileView>
                <div className='bgImageSetter grid grid-cols-1' style={{ backgroundImage: `url('https://i.hizliresim.com/j6xuoyj.png')` }}>
                    <TextTransition
                        className='m-auto text-white z-10 text-lg font-bold font-sans textShadow'
                        text={texts[index % texts.length]}
                        springConfig={presets.wobbly}
                    />
                    <div className='cover' style={{ height: 200 }}></div>
                </div>
            </MobileView>
            {/* TOP VIDEO */}
            <div className='max-w-7xl mx-auto py-10'>
                <>
                    <div className="flex flex-wrap">
                        <div className="w-full">
                            <ul className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row" role="tablist">
                                <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                                    <a
                                        className={
                                            "text-xs font-[Montserrat] uppercase px-5 py-3 block leading-normal text-firstColor transition " +
                                            (openTab === 1
                                                ? "border-b-2 border-firstColor shadow-lg text-firstColor"
                                                : "bg-white border-b-0 text-gray-900")
                                        }
                                        onClick={e => {
                                            e.preventDefault();
                                            setOpenTab(1);
                                        }}
                                        data-toggle="tab"
                                        href="#tab1"
                                        role="tablist"
                                    >
                                        Duyurular
                                    </a>
                                </li>
                                <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                                    <a
                                        className={
                                            "text-xs font-[Montserrat] uppercase px-5 py-3 transition block leading-normal " +
                                            (openTab === 2
                                                ? "border-b-2 border-firstColor shadow-lg text-firstColor"
                                                : "bg-white border-b-0 text-gray-900")
                                        }
                                        onClick={e => {
                                            e.preventDefault();
                                            setOpenTab(2);
                                        }}
                                        data-toggle="tab"
                                        href="#tab2"
                                        role="tablist"
                                    >
                                        Etkinlikler
                                    </a>
                                </li>
                                <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                                    <a
                                        className={
                                            "text-xs font-[Montserrat] uppercase px-5 py-3 transition block leading-normal " +
                                            (openTab === 3
                                                ? "border-b-2 border-firstColor text-firstColor shadow-lg"
                                                : "bg-white border-b-0 text-gray-900")
                                        }
                                        onClick={e => {
                                            e.preventDefault();
                                            setOpenTab(3);
                                        }}
                                        data-toggle="tab"
                                        href="#tab3"
                                        role="tablist"
                                    >
                                        Sosyal
                                    </a>
                                </li>
                            </ul>
                            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 rounded">
                                <div className="px-4 py-5 flex-auto">
                                    <div className="tab-content tab-space">
                                        <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                                            <div className='grid grid-cols-1 md:grid-cols-3'>
                                                {
                                                    isLoaded ?
                                                        <>
                                                            <div className='md:col-span-2 md:px-5 px-0'>
                                                                <div className="relative w-full h-full rounded overflow-hidden">
                                                                    <Link to={'/duyuru/' + firstAnnouncement.href}>
                                                                        <div className='w-full h-full absolute bg-gray-900 opacity-25'></div>
                                                                        <img src={firstAnnouncement.src} alt="Announcement" className="object-cover w-full h-full" />
                                                                        <div className="absolute w-full md:py-5 py-3 md:px-10 px-2 bottom-0 inset-x-0 bg-firstColor opacity-90"><span className='opacity-100 text-white md:text-xl text-xs font-sans font-bold'>{firstAnnouncement.headline}</span></div>
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <ul>
                                                                    {
                                                                        announcements.map((item, index) => (
                                                                            index !== announcements.length - 1 ?
                                                                                <li key={uuid()} className='border-b border-gray-400 py-5'>
                                                                                    <Link to={'/duyuru/' + item.href} className='hover:underline text-firstColor font-bold'>
                                                                                        {item.headline}
                                                                                    </Link>
                                                                                </li>
                                                                                :
                                                                                <li key={uuid()} className='py-5'>
                                                                                    <Link to={'/duyuru/' + item.href} className='hover:underline text-firstColor font-bold'>
                                                                                        {item.headline}
                                                                                    </Link>
                                                                                </li>
                                                                        ))
                                                                    }
                                                                </ul>
                                                            </div>


                                                        </>
                                                        :
                                                        <Loading />
                                                }
                                            </div>
                                        </div>
                                        <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                                            <div className='grid md:grid-cols-3'>
                                                {
                                                    isLoaded ?
                                                        events.map(item => (
                                                            <div key={uuid()} className="bg-white shadow-md border border-gray-200 rounded-lg m-1">
                                                                <Link to={'/etkinlik/' + item.href}><img className="rounded-t-lg" src={item.src} alt="" /></Link>
                                                                <div className="p-5">
                                                                    <Link to={'/etkinlik/' + item.href}>
                                                                        <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2">{item.headline}</h5>
                                                                    </Link>
                                                                    <p className="font-normal text-gray-700 mb-3">{item.desc}</p>
                                                                    <Link to={'/etkinlik/' + item.href} className="text-white bg-firstColor hover:bg-middleColor font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center">
                                                                        Devamını oku
                                                                        <ArrowRightIcon className='h-5 w-5 ml-1' />
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        ))
                                                        :
                                                        <Loading />
                                                }
                                            </div>
                                        </div>
                                        <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                                            <div className='grid md:grid-cols-3'>
                                                {
                                                    isLoaded ?
                                                        social.map(item => (
                                                            <div key={uuid()} className="bg-white shadow-md border border-gray-200 m-1">
                                                                <Link to={'/sosyal/' + item.href}><img src={item.src} alt="" /></Link>
                                                                <div className="p-5">
                                                                    <Link to={'/sosyal/' + item.href}>
                                                                        <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2">{item.headline}</h5>
                                                                    </Link>
                                                                    <p className="font-normal text-gray-700 mb-3">{item.desc}</p>
                                                                    <Link to={'/sosyal/' + item.href} className="text-white bg-firstColor hover:bg-middleColor font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center">
                                                                        Devamını oku
                                                                        <ArrowRightIcon className='h-5 w-5 ml-1' />
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        ))
                                                        :
                                                        <Loading />
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='grid md:grid-cols-2'>
                        <div className='grid place-items-center mb-1'><Link to='/duyurular' className='w-4/5 text-center border-4 border-firstColor p-3 hover:bg-firstColor hover:text-white text-firstColor font-bold font-sans transition uppercase'>Tüm duyuruları görüntüle</Link></div>
                        <div className='grid place-items-center mb-1'><Link to='/etkinlikler' className='w-4/5 text-center border-4 border-firstColor p-3 hover:bg-firstColor hover:text-white text-firstColor font-bold font-sans transition uppercase'>Tüm etkinlikleri görüntüle</Link></div>
                    </div>
                </>
            </div>
            <div className='bg-firstColor py-5'>
                <div className='max-w-7xl mx-auto'>
                    <p className='text-center font-sans font-bold text-3xl text-white textShadow uppercase mb-5'>Öğrencilerimizden Yazılar</p>
                    <div className='grid md:grid-cols-3'>
                        {
                            isLoaded ?
                                blog.map(item => (
                                    <div className="bg-white m-1" key={uuid()}>
                                        <Link to={'/blog/' + item.href}><img src={item.src} alt="" /></Link>
                                        <div className="p-5">
                                            <Link to={'/gectigimiz-ay/' + item.href}>
                                                <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2">{item.headline}</h5>
                                            </Link>
                                            <p className="font-normal text-gray-700 mb-3">{item.desc}</p>
                                            <Link to={'/blog/' + item.href} className="text-white bg-firstColor hover:bg-middleColor font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center">
                                                Devamını oku
                                                <ArrowRightIcon className='h-5 w-5 ml-1' />
                                            </Link>
                                        </div>
                                    </div>
                                ))
                                :
                                <Loading />
                        }
                    </div>
                    <div className='grid place-items-center'><Link to='/blog' className='border-4 border-white bg-firstColor text-white py-3 md:px-32 px-10 mt-4 uppercase font-bold font-sans hover:bg-white hover:text-firstColor transition'>Tüm yazıları görüntüle</Link></div>
                </div>
            </div>
            <div className='bg-white py-5'>
                <div className='max-w-7xl mx-auto'>
                    <p className='text-center font-sans font-bold text-3xl text-firstColor uppercase mb-5 '>Geçtiğimiz Ay KSBÜ</p>
                    <div className='grid md:grid-cols-3'>
                        {
                            isLoaded ?
                                lastMonth.map(item => (
                                    <div className="bg-white m-1 shadow-lg" key={uuid()}>
                                        <Link to={'/gectigimiz-ay/' + item.href}><img src={item.src} alt="" /></Link>
                                        <div className="p-5">
                                            <Link to={'/gectigimiz-ay/' + item.href}>
                                                <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2">{item.headline}</h5>
                                            </Link>
                                            <p className="font-normal text-gray-700 mb-3">{item.desc}</p>
                                            <Link to={'/gectigimiz-ay/' + item.href} className="text-white bg-firstColor hover:bg-middleColor font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center">
                                                Devamını oku
                                                <ArrowRightIcon className='h-5 w-5 ml-1' />
                                            </Link>
                                        </div>
                                    </div>
                                ))
                                :
                                <Loading />
                        }
                    </div>
                </div>
            </div>
            <div className='campusImageSetter py-10'>
                <p className='text-center text-white z-10 text-4xl uppercase font-bold font-sans textShadow'>Kütahya</p>
                <div className='grid md:grid-cols-2 py-10'>
                    <div className='z-10 md:mx-auto mx-3'>
                        <iframe className='yt-cover' src="https://www.youtube.com/embed/4Fdp-2Cgv9k" title="Kütahyayı Keşfet" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                    </div>
                    <div className='z-10 md:mr-20 text-xl my-auto mx-3 mt-3'>
                        <span className='text-white font-bold'>Ad consectetur minim ullamco amet qui tempor quis tempor in. Laborum est quis cillum magna cillum Lorem id ullamco. Anim ex laboris nisi velit. Ea exercitation esse elit consectetur consequat non reprehenderit sit fugiat exercitation aliqua. Nostrud nulla ex dolor consectetur deserunt nisi ex elit nisi sint consectetur exercitation.Ad minim velit eu duis ex magna fugiat. Anim ullamco velit ex aliquip fugiat et anim proident esse sunt sunt velit laboris. Consectetur mollit ut sunt ullamco adipisicing sunt eiusmod cupidatat proident cillum ipsum aute magna. Exercitation nisi nisi nulla voluptate aute amet anim.</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainPage;
