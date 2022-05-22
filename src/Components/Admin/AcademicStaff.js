import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../SideComponents/LoadingLocal';
import { v4 as uuid } from 'uuid';
import {
    ExternalLinkIcon
} from '@heroicons/react/outline';
import Duzenle from './AcademicStaff/Duzenle';
import YeniEkle from './AcademicStaff/YeniEkle';
import Sil from './AcademicStaff/Sil';

const AcademicStaff = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [academicStaff, setAcademicStaff] = useState([]);

    useEffect(() => {
        axios.get(window.apiBase + '/academic-staff').then((response, err) => {
            if (err) {
                console.log(err);
            } else {
                if (response.data.code === 404) {
                    setAcademicStaff([]);
                    setIsLoaded(true);
                } else {
                    setAcademicStaff(response.data);
                    setIsLoaded(true);
                }
            }
        })
    }, [])

    return (
        <div>
            {
                isLoaded ?
                    <div className='max-w-7xl mx-auto'>
                        <div className='float-right'>
                            <YeniEkle />
                        </div>
                        <div>
                            <p className='text-5xl uppercase font-bold font-sans text-center border-b mb-3 text-firstColor'>Akademik Kadro</p>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {
                                    academicStaff.map(item => (
                                        <div key={uuid()} className="w-full bg-white rounded overflow-hidden flex flex-col md:flex-row">
                                            <div className="w-full md:w-2/5 h-80">
                                                <img className="object-center object-cover w-full h-full" src={item.src} alt='' />
                                            </div>
                                            <div className="w-full md:w-3/5 text-left p-6 md:p-4 space-y-2">
                                                <p className="text-xl text-gray-700 font-bold">{item.name}</p>
                                                <p className="text-base text-gray-500 font-semibold">{item.bb ? 'Bilgisayar Mühendisliği Bölüm Başkanı' : ''}</p>
                                                <p className="text-base text-gray-500 font-semibold">{item.role}</p>
                                                <p className="text-base leading-relaxed text-gray-500 font-normal">{item.desc}</p>
                                                <div className="flex justify-start space-x-2">
                                                    <a href={item.href} target='_blank' rel='noreferrer noopener' className="text-gray-500 hover:text-gray-600 flex items-center">
                                                        <ExternalLinkIcon className='h-6 w-6 mr-1' />
                                                        Detaylı bilgi
                                                    </a>
                                                </div>
                                                <Duzenle currentData={item} />
                                                <Sil id={item._id} />
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    :
                    <Loading />
            }
        </div>
    )
}

export default AcademicStaff