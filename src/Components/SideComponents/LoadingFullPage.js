import TextTransition, { presets } from 'react-text-transition';
import { useEffect, useState } from 'react';

const LoadingFullPage = () => {
    const [text, setText] = useState('');
    useEffect(() => {
        setTimeout(() => {
            setText('Sunucularımızda bir gecikme durumu var. Beklediğiniz için teşekkürler.');
        }, 10000);
    }, [])

    return (
        <div className='h-screen w-screen bg-firstColor fixed top-0 left-0 grid place-items-center'>
            <div className='text-white grid grid-cols-0 grid place-items-center'>
                <div className='flex items-center'>
                    <svg fill='none' className="w-16 h-16 animate-spin" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
                        <path clipRule='evenodd'
                            d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
                            fill='currentColor' fillRule='evenodd' />
                    </svg>
                    Yükleniyor...
                </div>
                <TextTransition
                    className='mx-5 text-white z-10 text-md font-bold textShadow text-center'
                    text={text}
                    springConfig={presets.wobbly}
                />
            </div>
        </div>
    )
}
export default LoadingFullPage;