import React, { useState, useEffect } from 'react';
import YeniEkle from './Gallery/YeniEkle';
import axios from 'axios';
import Loading from '../SideComponents/LoadingLocal';
import Sil from './Gallery/Sil';
import { v4 as uuid } from 'uuid';

const Gallery = () => {
    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        axios.get(window.apiBase + '/gallery').then((response, err) => {
            if (err) console.log(err);
            else {
                if (response.data.code === 404) {
                    setData([]);
                    setIsLoaded(true);
                } else {
                    setData(response.data);
                    setIsLoaded(true);
                }
            }
        })
    }, [])
    return (
        <>
            {
                isLoaded ?
                    <div>
                        <div className='float-right'>
                            <YeniEkle />
                        </div>
                        <p className='text-5xl uppercase font-bold font-sans text-center border-b mb-3 text-firstColor'>Galeri</p>
                        <div className='w-full grid md:grid-cols-4'>
                            {
                                data.map(item => (
                                    <div key={uuid()} className="bg-white rounded-lg overflow-hidden shadow relative mx-1">
                                        <img className="h-56 w-full object-cover object-center" src={item.src} alt="" />
                                        <div className="p-4">
                                            <p className="block text-blue-500 hover:text-blue-600 font-semibold mb-2 text-lg md:text-base lg:text-lg">
                                                {item.name}
                                            </p>
                                            <div className="text-gray-600 text-sm leading-relaxed block md:text-xs lg:text-sm">
                                                {item.desc}
                                            </div>
                                            <Sil id={item._id} />
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

export default Gallery