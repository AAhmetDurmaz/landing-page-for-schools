import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loading from '../SideComponents/LoadingLocal';
import { v4 as uuid } from 'uuid';
import Duzenle from './Lessons/Duzenle.js';
import YeniEkle from './Lessons/YeniEkle';
import Sil from './Lessons/Sil';

const Lessons = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [semesters] = useState([]);
    useEffect(() => {
        axios.get(window.apiBase + '/lessons').then((response, err) => {
            if (err) console.log(err);
            else {
                if (semesters.length !== 8) {
                    for (let index = 0; index < 8; index++) {
                        semesters.push([]);
                    }
                } else {
                    semesters.length = 0;
                    for (let index = 0; index < 8; index++) {
                        semesters.push([]);
                    }
                }
                if (response.data.code !== 404) {
                    for (let index = 0; index < response.data.length; index++) {
                        semesters[response.data[index].semester - 1].push(response.data[index])
                    }
                }
                setIsLoaded(true);
            }
        })
    }, [semesters])


    return (
        <>
            {
                isLoaded ?
                    <div className='grid place-items-end'><YeniEkle /></div>
                    : ''
            }
            {
                isLoaded ?
                    semesters.map((semItem, index) => (
                        <div key={uuid()} className='border-x'>
                            <p className='text-center font-sans font-bold border-b border-gray-200'>{index + 1}. Yarıyıl</p>
                            <table className="table-auto border-collapse w-full">
                                <thead>
                                    <tr className="rounded-lg text-sm font-medium text-black text-left border-b border-gray-200">
                                        <th className="px-4 py-2 uppercase">Yarıyıl</th>
                                        <th className="px-4 py-2 uppercase">Ders Adı</th>
                                        <th className="px-4 py-2 uppercase">T+U</th>
                                        <th className="px-4 py-2 uppercase">Kredi</th>
                                        <th className="px-4 py-2 uppercase">AKTS</th>
                                        <th className='px-4 py-2 uppercase'>Düzenle</th>
                                        <th className='px-4 py-2 uppercase'>Sil</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm font-normal text-black">
                                    {
                                        semItem.map(item => (
                                            <tr key={uuid()} className="hover:bg-gray-200 border-b border-gray-200 py-10">
                                                <td className="px-4 py-4">{index + 1}</td>
                                                <td className="px-4 py-4">{item.name}</td>
                                                <td className="px-4 py-4">{item.theorical}+{item.pratical}</td>
                                                <td className="px-4 py-4">{item.credit}</td>
                                                <td className="px-4 py-4">{item.akts}</td>
                                                <td className="px-4 py-4"><Duzenle currentData={item} /></td>
                                                <td className="px-4 py-4"><Sil id={item._id} /></td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    ))
                    :
                    <Loading />
            }
        </>
    )
}

export default Lessons