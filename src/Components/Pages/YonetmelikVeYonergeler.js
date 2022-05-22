import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { BrowserView, MobileView } from 'react-device-detect';
import yvyBG from '../../Images/slider1.png';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import Loading from '../SideComponents/LoadingFullPage';

const YonetmelikVeYonergeler = () => {
    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        axios.get(window.apiBase + '/directives').then((response, err) => {
            if (err) console.log(err)
            else {
                if(response.data.code === 404){
                    setData([]);
                    setIsLoaded(true);
                }else{
                    setData(response.data);
                    setIsLoaded(true);
                }
            }
        })
    }, [])

    return (
        <div>
            <Helmet><title>Yönetmelik ve Yönergeler | Bilgisayar Mühendisliği</title></Helmet>
            {
                isLoaded ?
                    <>
                        <BrowserView>
                            <div className='h-screen flex'>
                                <div className='m-auto z-10 text-center'>
                                    <p className='m-auto text-white text-7xl font-bold font-sans uppercase textShadow'>Yönetmelik ve Yönergeler</p>
                                </div>
                                <div className='cover'></div>
                                <div className='video-wrapper'>
                                    <img alt='' src={yvyBG} />
                                </div>
                            </div>
                        </BrowserView>
                        <MobileView>
                            <div className='bgImageSetter grid grid-cols-1' style={{ backgroundImage: `url('https://i.hizliresim.com/j6xuoyj.png')` }}>
                                <div className='m-auto z-10 text-center'>
                                    <p className='m-auto text-white text-3xl font-bold font-sans uppercase textShadow'>Yönetmelik ve Yönergeler</p>
                                </div>
                                <div className='cover' style={{ height: 200 }}></div>
                            </div>
                        </MobileView>
                        <div className='max-w-7xl mx-auto py-5 px-3'>
                            <div>
                                <p className='text-5xl uppercase font-bold font-sans text-center border-b mb-3 text-firstColor'>Yönetmelik ve Yönergeler</p>
                                <table className="table-auto border-collapse w-full">
                                    <thead>
                                        <tr className="rounded-lg text-sm font-medium text-gray-700 text-left">
                                            <th className="px-4 py-2">Dosya adı</th>
                                            <th className="px-4 py-2">Görüntüle</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm font-normal text-gray-700">
                                        {
                                            data.map(item => (
                                                <tr key={uuid()} className="hover:bg-gray-100 border-b border-gray-200 py-10">
                                                    <td className="px-4 py-4">{item.name}</td>
                                                    <td className="px-4 py-4"><a className='text-blue-600 hover:text-blue-800 transition' href={item.src}>Görüntüle</a></td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                    :
                    <Loading />
            }
        </div>
    )
}

export default YonetmelikVeYonergeler