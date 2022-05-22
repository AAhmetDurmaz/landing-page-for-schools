import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../SideComponents/LoadingFullPage';
import { v4 as uuid } from 'uuid';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/outline';
import { Helmet } from 'react-helmet';
import coverImage from '../../Images/cover.png';

const TumDuyurular = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [firstPost, setFirstPost] = useState({});
    const [fourPost, setFourPost] = useState([]);
    const [remainingPosts, setRP] = useState([]);
    useEffect(() => {
        axios.get(window.apiBase + '/events').then((response, err) => {
            if (err) console.log(err);
            else {
                if (response.data.code === 404) {
                    setFirstPost({
                        href: '',
                        src: '',
                        headline: '',
                        index: '',
                    });
                    setFourPost([]);
                    setRP([]);
                    setIsLoaded(true);
                } else {
                    setFirstPost((response.data).shift())
                    for (let index = 0; index < fourPost.length; index++) {
                        fourPost.remove(index);
                    }
                    fourPost.push((response.data).shift());
                    fourPost.push((response.data).shift());
                    fourPost.push((response.data).shift());
                    fourPost.push((response.data).shift());
                    setRP(response.data);
                    setIsLoaded(true);
                    setIsLoaded(true);
                }
            }
        })
    }, [fourPost]);
    return (
        <>
            <Helmet><title>Duyurular | Bilgisayar Mühendisliği</title></Helmet>
            {
                isLoaded ?
                    <div className='max-w-7xl mx-auto my-5'>
                        <div className='blog-h-setter relative m-1'>
                            <Link to={'/etkinlik/' + firstPost.href}>
                                <img alt='blogMain' src={firstPost.src} className='w-full h-full absolute' />
                                <img src={coverImage} alt="Cover" className="absolute opacity-50 object-cover w-full h-full" />
                                <div className="absolute w-full py-7 bottom-0 inset-x-0 text-white text-left leading-4 textShadow">
                                    <p className='mx-7 font-sans font-bold text-xl'>{firstPost.headline}</p>
                                </div>
                            </Link>
                        </div>
                        <div className='grid md:grid-cols-4 mr-1'>
                            {
                                fourPost.map(item => (
                                    <div className="relative h-48 overflow-hidden ml-1 my-1" key={uuid()}>
                                        <Link to={'/etkinlik/' + item.href}>
                                            <img src={item.src} alt="Blog four" className="absolute object-cover w-full h-full" />
                                            <img src={coverImage} alt="Cover" className="absolute opacity-50 object-cover w-full h-full" />
                                            <div className="absolute w-full py-2.5 bottom-0 inset-x-0 text-white text-left leading-4 textShadow">
                                                <p className='mx-2 font-bold font-sans'>{item.headline}</p>
                                            </div>
                                        </Link>
                                    </div>
                                ))
                            }
                        </div>
                        <p className='text-center font-sans font-bold text-3xl text-firstColor border-b uppercase mb-3 mt-1'>Diğer Yazılar</p>
                        <div className='grid md:grid-cols-4 mt-1'>
                            {
                                remainingPosts.map(item => (
                                    <div key={uuid()} className="bg-white shadow-md border border-gray-200 rounded-lg m-1">
                                        <Link to={'/etkinlik/' + item.href}><img className="rounded-t-lg" src={item.src} alt="" /></Link>
                                        <div className="p-5">
                                            <Link to={'/etkinlik/' + item.href}>
                                                <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2">{item.headline}</h5>
                                            </Link>
                                            <Link to={'/etkinlik/' + item.href} className="text-white bg-firstColor hover:bg-middleColor font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center">
                                                Devamını oku
                                                <ArrowRightIcon className='h-5 w-5 ml-1' />
                                            </Link>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    :
                    <Loading />
            }
        </>
    )
}

export default TumDuyurular