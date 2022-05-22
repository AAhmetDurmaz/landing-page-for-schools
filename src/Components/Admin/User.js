import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../SideComponents/LoadingLocal';
import { v4 as uuid } from 'uuid';
import Cookies from 'universal-cookie';
import Duzenle from './User/Duzenle.js';
import Sil from './User/Sil.js';
import YeniEkle from './User/YeniEkle';
import YetkiGoruntule from './User/YetkiGoruntule';

const cookies = new Cookies();

const User = (props) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [userData, setUserData] = useState([]);
    useEffect(() => {
        axios.post(window.apiBase + '/get-users', {}, { headers: { 'Authorization': 'Bearer ' + cookies.get('auth') } }).then((response, err) => {
            if (err) console.log(err);
            else {
                if (response.data.code === 404) {
                    setUserData([]);
                    setIsLoaded(true);
                } else {
                    setUserData(response.data);
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
                            <YeniEkle powerPages={props.powerPages} />
                        </div>
                        <p className='text-5xl uppercase font-bold font-sans text-center border-b mb-3 text-firstColor'>Yetkililer</p>
                        <table className="table-auto border-collapse w-full">
                            <thead>
                                <tr className="rounded-lg text-sm font-medium text-black text-left border-b border-gray-200">
                                    <th className="px-4 py-2 font-sans font-bold">İsim</th>
                                    <th className="px-4 py-2 font-sans font-bold">E-Posta</th>
                                    <th className="px-4 py-2 font-sans font-bold">Şifre</th>
                                    <th className="px-4 py-2 font-sans font-bold">Yetkileri</th>
                                    <th className="px-4 py-2 font-sans font-bold">Düzenle</th>
                                    <th className="px-4 py-2 font-sans font-bold">Sil</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm font-normal text-black">
                                {
                                    userData.map(item => (
                                        <tr key={uuid()} className="hover:bg-gray-200 border-b border-gray-200 py-10">
                                            <td className='p-4'>{item.name}</td>
                                            <td className='p-4'>{item.email}</td>
                                            <td className='p-4'>Düzenle sekmesinden güncelleyebilirsiniz.</td>
                                            <td className='p-4'><YetkiGoruntule powerPages={props.powerPages} powers={item.powers} /></td>
                                            <td className='p-4'><Duzenle powerPages={props.powerPages} currentData={item} /></td>
                                            <td className='p-4'><Sil id={item._id} /></td>
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

export default User