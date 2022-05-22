import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import Loading from '../SideComponents/LoadingLocal';
import axios from 'axios';
import Duzenle from './Timetables/Duzenle';
import Sil from './Timetables/Sil';
import YeniEkle from './Timetables/YeniEkle';

const Timetables = () => {
    const [timetable, setTimetable] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        axios.get(window.apiBase + '/timetables').then((response, err) => {
            if (err) console.log(err);
            else{
                if(response.data[0] !== undefined){
                    setTimetable(response.data);
                    setIsLoaded(true);
                }else{
                    setIsLoaded(true);
                }
            }
        })
    }, [])

    return (
        <div>
            {
                isLoaded ?
                    <>
                    <div className='float-right'>
                        <YeniEkle />
                    </div>
                        <p className='text-5xl uppercase font-bold font-sans text-center border-b mb-3 text-firstColor'>Ders Programı</p>
                        <table className="table-auto border-collapse w-full">
                            <thead>
                                <tr className="rounded-lg text-sm font-medium text-black text-left border-b border-gray-200">
                                    <th className="px-4 py-2 font-sans font-bold">Dosya adı</th>
                                    <th className="px-4 py-2 font-sans font-bold">Görüntüle</th>
                                    <th className="px-4 py-2 font-sans font-bold">Düzenle</th>
                                    <th className="px-4 py-2 font-sans font-bold">Sil</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm font-normal text-black">
                                {
                                    timetable.map(item => (
                                        <tr key={uuid()} className="hover:bg-gray-200 border-b border-gray-200 py-10">
                                            <td className="px-4 py-4">{item.name}</td>
                                            <td className="px-4 py-4"><a download={true} className='text-black font-sans font-bold hover:text-gray-700 transition' href={item.src}>Görüntüle</a></td>
                                            <td><Duzenle currentData={item} /></td>
                                            <td><Sil id={item._id} /></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </>
                    :
                    <Loading />
            }
        </div>
    )
}

export default Timetables