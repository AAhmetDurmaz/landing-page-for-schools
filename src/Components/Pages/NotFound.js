import React from 'react';
import { Link } from 'react-router-dom';
import astronautImage from '../../Images/astronaut.png';

const NotFound = () => {
    return (
        <div>
            <div className='grid md:grid-cols-2'>
                <div className='md:m-auto mt-20'>
                    <p className='text-center text-firstColor font-sans font-bold uppercase text-5xl'>Bu sayfa bulunamadı.</p>
                    <p className='text-center text-middleColor font-sans font-bold uppercase text-xl mb-2'>Bir karadelik tarafından yutulmuş olabilir!</p>
                    <div className='flex justify-center'><Link to='/' className='text-white bg-firstColor rounded px-5 py-2 font-sans font-bold hover:bg-middleColor transition'>Ana sayfa</Link></div>
                </div>
                <div className='m-auto my-20'>
                    <img src={astronautImage} alt='' />
                </div>
            </div>
        </div>
    )
}

export default NotFound