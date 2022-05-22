import React, { useEffect, useState } from 'react';
import Loading from '../SideComponents/LoadingLocal';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
    ArrowRightIcon,
} from '@heroicons/react/outline';
import Duzenle from './CustomText/Duzenle.js';
import Sil from './CustomText/Sil';
import YeniEkle from './CustomText/YeniEkle';

const EngineerText = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        axios.get(window.apiBase + '/custom-text').then((response, err) => {
            if (err) {
                console.log(err);
            } else {
                if (response.data.code === 404) {
                    setPosts([]);
                    setIsLoaded(true);
                } else {
                    setPosts(response.data);
                    setIsLoaded(true);
                }
            }
        })
    }, [])

    return (
        <div>
            {
                isLoaded ?
                    <div>
                        <div className='max-w-7xl mx-auto'>
                            <div className='float-right'>
                                <YeniEkle />
                            </div>
                            <div>
                                <p className='text-5xl uppercase font-bold font-sans text-center border-b mb-3 text-firstColor'>Mühendislerden Yazılar</p>
                                <div className='grid md:grid-cols-3'>
                                    {
                                        posts.map(item => (
                                            <div key={uuid()} className="bg-white shadow-md border border-gray-200 rounded-lg m-1">
                                                <Link to={'/duyuru/' + item.href}><img className="rounded-t-lg" src={item.src} alt="" /></Link>
                                                <div className="p-5">
                                                    <Link to={'/duyuru/' + item.href}>
                                                        <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2">{item.headline}</h5>
                                                    </Link>
                                                    <p className="font-normal text-gray-700 mb-3">{item.desc}</p>
                                                    <Link to={'/duyuru/' + item.href} className="text-white bg-firstColor hover:bg-middleColor font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center">
                                                        Görüntüle
                                                        <ArrowRightIcon className='h-5 w-5 ml-1' />
                                                    </Link>
                                                    <div className='mt-1'>
                                                        <Duzenle currentData={item} />
                                                    </div>
                                                    <div className='mt-1'>
                                                        <Sil id={item._id} />
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <Loading />
            }
        </div>
    )
}

export default EngineerText