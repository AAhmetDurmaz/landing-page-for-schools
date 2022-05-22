import React, { useState, useEffect } from 'react';
import Duzenle from './AboutUs/Duzenle';
import axios from 'axios';
import Loading from '../SideComponents/LoadingLocal';

const AboutUs = () => {
    const [data, setData] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        axios.get(window.apiBase + '/about-us').then((response, err) => {
            if (err) console.log(err);
            else {
                if (response.data.code === 404) {
                    setData({});
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
                    <Duzenle currentData={data} />
                    :
                    <Loading />
            }
        </>
    )
}

export default AboutUs