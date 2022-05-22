import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BrowserView, MobileView } from 'react-device-detect';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import Loading from '../SideComponents/LoadingFullPage';
import parser from 'html-react-parser';

const PostGoster = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState({});
    useEffect(() => {
        let tempState = '';
        if (params.state === 'duyuru') {
            tempState = 'announcement';
        } else if (params.state === 'etkinlik') {
            tempState = 'event';
        } else if (params.state === 'sosyal') {
            tempState = 'social';
        } else if (params.state === 'gectigimiz-ay') {
            tempState = 'last-month';
        } else if (params.state === 'blog') {
            tempState = 'blog';
        } else {
            navigate('/404');
        }
        axios.get(window.apiBase + '/' + tempState + '/' + params.url).then((response, err) => {
            if (err) {
                console.log(err);
            } else {
                if (response.data.code === 404) {
                    setData([]);
                    navigate('/404');
                } else {
                    setData(response.data);
                    setIsLoaded(true);
                }
            }
        })
    }, [params.url, params.state, navigate])

    return (
        <div>
            <Helmet><title>{isLoaded ? data.headline + ' |' : ''} Bilgisayar Mühendisliği</title></Helmet>
            {
                isLoaded ?
                    <>
                        <BrowserView>
                            <div className='h-screen flex'>
                                <div className='m-auto z-10 text-center'>
                                    <p className='m-auto md:mx-48 text-white text-4xl font-bold font-sans uppercase textShadow'>{data.headline}</p>
                                </div>
                                <div className='cover'></div>
                                <div className='video-wrapper'>
                                    <img alt='' src={data.src} />
                                </div>
                            </div>
                        </BrowserView>
                        <MobileView>
                            <div className='bgImageSetter grid grid-cols-1' style={{ backgroundImage: `url('${data.src}')` }}>
                                <div className='m-auto z-10 text-center'>
                                    <p className='m-auto text-white text-lg font-bold font-sans uppercase textShadow'>{data.headline}</p>
                                </div>
                                <div className='cover' style={{ height: 200 }}></div>
                            </div>
                        </MobileView>
                        <div className='max-w-7xl mx-auto py-5 px-3'>
                            <p className='md:text-3xl text-xl uppercase font-bold font-sans text-center border-b mb-3 text-firstColor'>{data.headline}</p>
                            <p className='font-sans font-bold'>{window.TimestampToDate(data.lastUpdatedDate)}</p>
                            <div>{parser(data.index)}</div>
                        </div>
                    </>
                    :
                    <Loading />
            }
        </div>
    )
}

export default PostGoster