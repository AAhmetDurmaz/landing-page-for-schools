import React, { useEffect, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import hakkimizdaBG from '../../Images/slider1.png';
import hakkimizdaMenu from '../../Images/rose-1.jpg';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import {
    ExternalLinkIcon
} from '@heroicons/react/outline';
import axios from 'axios';
import Loading from '../SideComponents/LoadingFullPage';

const anabilimDallari = [
    'Bilgisayar bilimleri anabilim dalı',
    'Yazılım mühendisliği anabilim dalı',
    'Yapay zeka anabilim dalı',
];

const Akademik = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [academicStaff, setAcademicStaff] = useState([]);
    const [timetable, setTimetable] = useState([]);
    const [semesters] = useState([]);
    useEffect(() => {
        axios.get(window.apiBase + '/academic').then((response, err) => {
            if (err) console.log(err);
            else {
                setAcademicStaff(response.data[0]);
                setTimetable(response.data[1]);
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
                for (let index = 0; index < response.data[2].length; index++) {
                    semesters[response.data[2][index].semester - 1].push(response.data[2][index])
                }
                setIsLoaded(true);
            }
        })
    }, [semesters])

    return (
        <div>
            <Helmet><title>Akademik | Bilgisayar Mühendisliği</title></Helmet>
            {
                isLoaded ?
                    <>
                        <BrowserView>
                            <div className='h-screen flex'>
                                <div className='m-auto z-10 text-center'>
                                    <p className='m-auto text-white text-7xl font-bold font-sans uppercase textShadow'>Akademik</p>
                                </div>
                                <div className='cover'></div>
                                <div className='video-wrapper'>
                                    <img alt='' src={hakkimizdaBG} />
                                </div>
                            </div>
                        </BrowserView>
                        <MobileView>
                            <div className='bgImageSetter grid grid-cols-1' style={{ backgroundImage: `url('https://i.hizliresim.com/j6xuoyj.png')` }}>
                                <div className='m-auto z-10 text-center'>
                                    <p className='m-auto text-white text-3xl font-bold font-sans uppercase textShadow'>Akademik</p>
                                </div>
                                <div className='cover' style={{ height: 200 }}></div>
                            </div>
                        </MobileView>
                        <div className='max-w-7xl mx-auto py-5 px-3'>
                            <p className='text-5xl uppercase font-bold font-sans text-center border-b mb-3 text-firstColor'>Akademik</p>
                            <div className='grid md:grid-cols-3 mt-2'>
                                <div className='m-1'>
                                    <button onClick={() => document.getElementById('AnabilimDallari').scrollIntoView({ behavior: 'smooth' })} className='text-left'>
                                        <img alt='' src={hakkimizdaMenu} />
                                        <p className='font-sans px-5 pt-5 text-lg text-firstColor hover:underline'>Anabilim Dalları</p>
                                        <p className='font-light font-sans px-5 pt-1 pb-5'>Bilgisayar Mühendisliği Anabilim Dalları</p>
                                    </button>
                                </div>
                                <div className='m-1'>
                                    <button onClick={() => document.getElementById('AkademikKadro').scrollIntoView({ behavior: 'smooth' })} className='text-left'>
                                        <img alt='' src={hakkimizdaMenu} />
                                        <p className='font-sans px-5 pt-5 text-lg text-firstColor hover:underline'>Akademik Kadro</p>
                                        <p className='font-light font-sans px-5 pt-1 pb-5'>Bölümümüzün Akademik Kadrosu</p>
                                    </button>
                                </div>
                                <div className='m-1'>
                                    <a href='https://www.ksbu.edu.tr/Website/Contents.aspx?PageID=190&ampLangID=1' target='_blank' rel='noopener noreferrer'>
                                        <img alt='' src={hakkimizdaMenu} />
                                        <p className='font-sans px-5 pt-5 text-lg text-firstColor hover:underline'>Akademik Takvim</p>
                                        <p className='font-light font-sans px-5 pt-1 pb-5'>KSBÜ | Akademik Takvim</p>
                                    </a>
                                </div>
                                <div className='m-1'>
                                    <button onClick={() => document.getElementById('DersListesi').scrollIntoView({ behavior: 'smooth' })} className='text-left'>
                                        <img alt='' src={hakkimizdaMenu} />
                                        <p className='font-sans px-5 pt-5 text-lg text-firstColor hover:underline'>Ders Listesi</p>
                                        <p className='font-light font-sans px-5 pt-1 pb-5'>Bilgisayar Mühendisliği Bölümü 4 Yıllık Ders Listesi</p>
                                    </button>
                                </div>
                                <div className='m-1'>
                                    <button onClick={() => document.getElementById('DersProgrami').scrollIntoView({ behavior: 'smooth' })} className='text-left'>
                                        <img alt='' src={hakkimizdaMenu} />
                                        <p className='font-sans px-5 pt-5 text-lg text-firstColor hover:underline'>Ders Programı</p>
                                        <p className='font-light font-sans px-5 pt-1 pb-5'>Tüm Dönemlerin Ders Programları</p>
                                    </button>
                                </div>
                                <div className='m-1'>
                                    <Link to='/yonetim'>
                                        <img alt='' src={hakkimizdaMenu} />
                                        <p className='font-sans px-5 pt-5 text-lg text-firstColor hover:underline'>Yönetim</p>
                                        <p className='font-light font-sans px-5 pt-1 pb-5'>Yönetim kadrosu</p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className='bg-firstColor text-white py-10 mt-10 px-3'>
                            <div className='max-w-7xl mx-auto'>
                                <div id='AnabilimDallari'>
                                    <p className='text-5xl uppercase font-bold font-sans text-center border-b mb-3'>Anabilim Dalları</p>
                                    <div>
                                        <p>&emsp;&emsp;Yükseköğretim Yürütme Kurulu 19.02.2020 tarihli toplantısı ile 2547 sayılı kanunun 2880 sayılı kanunla değişik 7/d-2 maddesi uyarınca, fakültemiz bünyesinde Bilgisayar Mühendisliği Bölümü ve bu bölüme bağlı olarak,</p>
                                        <br />
                                        <ul className='list-disc list-inside'>
                                            {
                                                anabilimDallari.map(item => (
                                                    <li key={item}>{item}</li>
                                                ))
                                            }
                                        </ul>
                                        <br />
                                        <p>bulunmaktadır.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='max-w-7xl mx-auto'>
                            <div id='AkademikKadro' className='mt-10'>
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
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='bg-firstColor'>
                            <div className='max-w-7xl mx-auto'>
                                <div id='DersProgrami' className='mt-10 py-5'>
                                    <p className='text-5xl uppercase font-bold font-sans text-center border-b mb-3 text-white'>Ders Programı</p>
                                    <table className="table-auto border-collapse w-full">
                                        <thead>
                                            <tr className="rounded-lg text-sm font-medium text-white text-left border-b border-gray-200">
                                                <th className="px-4 py-2 font-sans font-bold">Dosya adı</th>
                                                <th className="px-4 py-2 font-sans font-bold">Görüntüle</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm font-normal text-white">
                                            {
                                                timetable.map(item => (
                                                    <tr key={uuid()} className="hover:bg-middleColor border-b border-gray-200 py-10">
                                                        <td className="px-4 py-4">{item.name}</td>
                                                        <td className="px-4 py-4"><a download={true} className='text-white font-sans font-bold hover:text-gray-200 transition' href={item.src}>Görüntüle</a></td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className='max-w-7xl mx-auto'>
                            <div className='max-w-7xl mx-auto'>
                                <div id='DersListesi' className='py-5'>
                                    <p className='text-5xl uppercase font-bold font-sans text-center border-b mb-3 text-firstColor'>Ders Listesi</p>
                                    <div className='grid md:grid-cols-2'>
                                        {
                                            semesters.map((semItem, index) => (
                                                <div key={uuid()} className='border-x overflow-x-auto'>
                                                    <p className='text-center font-sans font-bold'>{index + 1}. Yarıyıl</p>
                                                    <table className="table-auto whitespace-nowrap border-collapse w-full border-t border-gray-200">
                                                        <thead>
                                                            <tr className="rounded-lg text-sm font-medium text-black text-left border-b border-gray-200">
                                                                <th className="px-4 py-2">Yarıyıl</th>
                                                                <th className="px-4 py-2">Ders Adı</th>
                                                                <th className="px-4 py-2">T+U</th>
                                                                <th className="px-4 py-2">Kredi</th>
                                                                <th className="px-4 py-2">AKTS</th>
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
                                                                    </tr>
                                                                ))
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            ))
                                        }
                                    </div>
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

export default Akademik