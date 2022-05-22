import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { BrowserView, MobileView } from 'react-device-detect';
import TextTransition, { presets } from 'react-text-transition';
import ksbuVideo from '../../Video/ksbu-bilmuh-video.webm';
import { v4 as uuid } from 'uuid';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/outline';

const texts = [
    'KÜTAHYA SAĞLIK BİLİMLERİ ÜNİVERSİTESİ',
    'BİLGİSAYAR MÜHENDİSLİĞİ',
    'SİZLERİ ARAMIZDA GÖRMEK İSTİYORUZ',
    'GELECEĞİ ŞEKİLLENDİRİYORUZ'
];

// NOTE(ahmet): YAZILAR BLOG KISMINDAN GELIYOR. BLOG YAZILARI BURAYA URL ILE AKTARILIYOR.

const cards = [
    { id: 0, src: 'http://localhost:8080/cdn/16466811418781.jpg', desc: 'Nulla nisi et consequat tempor do voluptate mollit ad sit.', url: 'tanitim-katalogu', headline: 'Tanıtım Kataloğu', href: 'https://localhost:3000/X' },
    { id: 1, src: 'http://localhost:8080/cdn/16466811418781.jpg', desc: 'Id mollit non amet nisi sit quis sit sunt exercitation sit cupidatat.', url: 'universite-tanitim-videolari', headline: 'Üniversite Tanıtım Videoları', href: 'https://localhost:3000/X' },
    { id: 2, src: 'http://localhost:8080/cdn/16466811418781.jpg', desc: 'Exercitation cupidatat fugiat irure elit anim reprehenderit sunt.', url: 'yurt-imkanlari', headline: 'Yurt İmkanları', href: 'https://localhost:3000/X' },
    { id: 3, src: 'http://localhost:8080/cdn/16466811418781.jpg', desc: 'Excepteur dolor proident aliquip ex culpa.', url: 'kutahya-sehir-kampus', headline: 'Kütahya Şehir & Kampüs', href: 'https://localhost:3000/X' },
    { id: 4, src: 'http://localhost:8080/cdn/16466811418781.jpg', desc: 'In velit aliqua tempor nulla consequat officia cillum pariatur officia nostrud.', url: 'ogrenci-toplulukları', headline: 'Öğrenci Toplulukları', href: 'https://localhost:3000/X' },
]

export const AdayOgrenci = () => {
    const [index, setIndex] = React.useState(0);
    useEffect(() => {
        const intervalId = setInterval(() =>
            setIndex(index => index + 1),
            3000
        );
        return () => clearTimeout(intervalId);

    }, [])

    return (
        <div>
            <Helmet><title>Aday Öğrenci | Bilgisayar Mühendisliği</title></Helmet>
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
            <div className='mx-auto max-w-7xl'>
                <div className='grid md:grid-cols-2 my-3 mx-1'>
                    <div>
                        <p className='font-semibold text-3xl'>Rektörümüzden</p>
                        <p>Ea velit cillum fugiat eiusmod sint. Dolor voluptate ullamco sit anim. Aliquip aute nisi laboris consectetur minim magna mollit ipsum fugiat pariatur sit mollit. Incididunt aliqua quis sit laboris tempor aliqua sint ex in laborum cillum proident. Et aute minim et quis. Non laborum quis amet nulla reprehenderit deserunt in ullamco reprehenderit.</p>
                        <p>Adipisicing officia laborum quis voluptate amet tempor non ut. Occaecat non qui voluptate ex ipsum commodo ipsum in. Exercitation elit occaecat id sit proident anim tempor dolore amet. Duis culpa et adipisicing irure in ea non adipisicing veniam quis. Excepteur fugiat qui occaecat eu irure esse elit velit sunt amet duis proident pariatur in. Excepteur et est et ipsum.</p>
                    </div>
                    <div>
                        <iframe className='yt-cover' src="https://www.youtube.com/embed/1c5dRURKZEY" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    <div>
                        <iframe className='yt-cover' src="https://www.youtube.com/embed/1c5dRURKZEY" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    <div>
                        <p className='font-semibold text-3xl'>Bölüm Başkanımızdan</p>
                        <p>Ea velit cillum fugiat eiusmod sint. Dolor voluptate ullamco sit anim. Aliquip aute nisi laboris consectetur minim magna mollit ipsum fugiat pariatur sit mollit. Incididunt aliqua quis sit laboris tempor aliqua sint ex in laborum cillum proident. Et aute minim et quis. Non laborum quis amet nulla reprehenderit deserunt in ullamco reprehenderit.</p>
                        <p>Adipisicing officia laborum quis voluptate amet tempor non ut. Occaecat non qui voluptate ex ipsum commodo ipsum in. Exercitation elit occaecat id sit proident anim tempor dolore amet. Duis culpa et adipisicing irure in ea non adipisicing veniam quis. Excepteur fugiat qui occaecat eu irure esse elit velit sunt amet duis proident pariatur in. Excepteur et est et ipsum.</p>
                    </div>
                    <div>
                        <p className='font-semibold text-3xl'>Kütahya</p>
                        <p>Ea velit cillum fugiat eiusmod sint. Dolor voluptate ullamco sit anim. Aliquip aute nisi laboris consectetur minim magna mollit ipsum fugiat pariatur sit mollit. Incididunt aliqua quis sit laboris tempor aliqua sint ex in laborum cillum proident. Et aute minim et quis. Non laborum quis amet nulla reprehenderit deserunt in ullamco reprehenderit.</p>
                        <p>Adipisicing officia laborum quis voluptate amet tempor non ut. Occaecat non qui voluptate ex ipsum commodo ipsum in. Exercitation elit occaecat id sit proident anim tempor dolore amet. Duis culpa et adipisicing irure in ea non adipisicing veniam quis. Excepteur fugiat qui occaecat eu irure esse elit velit sunt amet duis proident pariatur in. Excepteur et est et ipsum.</p>
                    </div>
                    <div>
                        <iframe className='yt-cover' src="https://www.youtube.com/embed/4Fdp-2Cgv9k" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                </div>
                <p className='text-5xl uppercase font-bold font-sans text-center border-b mb-3 text-firstColor'>Faydalı bilgiler</p>
                <div className='grid md:grid-cols-3'>
                    {
                        cards.map(item => (
                            <div className="bg-white m-1 shadow-xl rounded" key={uuid()}>
                                <Link to={'/blog/' + item._id}><img className='rounded' src={item.src} alt="" /></Link>
                                <div className="p-5">
                                    <Link to={'/gectigimiz-ay/' + item.href}>
                                        <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2">{item.headline}</h5>
                                    </Link>
                                    <p className="font-normal text-gray-700 mb-3">{item.desc}</p>
                                    <Link to={'/blog/' + item._id} className="text-white bg-firstColor hover:bg-middleColor font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center">
                                        Görüntüle
                                        <ArrowRightIcon className='h-5 w-5 ml-1' />
                                    </Link>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}