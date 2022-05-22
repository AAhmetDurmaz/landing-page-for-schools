import React from 'react';
import { Helmet } from 'react-helmet';
import { BrowserView, MobileView } from 'react-device-detect';
import vmBG from '../../Images/slider1.png';

const VizyonVeMisyon = () => {
    return (
        <div>
            <Helmet><title>Vizyon ve Misyon | Bilgisayar Mühendisliği</title></Helmet>
            <BrowserView>
                <div className='h-screen flex'>
                    <div className='m-auto z-10 text-center'>
                        <p className='m-auto text-white text-7xl font-bold font-sans uppercase textShadow'>Vizyon ve Misyon</p>
                    </div>
                    <div className='cover'></div>
                    <div className='video-wrapper'>
                        <img alt='' src={vmBG} />
                    </div>
                </div>
            </BrowserView>
            <MobileView>
                <div className='bgImageSetter grid grid-cols-1' style={{ backgroundImage: `url('https://i.hizliresim.com/j6xuoyj.png')`}}>
                    <div className='m-auto z-10 text-center'>
                        <p className='m-auto text-white text-3xl font-bold font-sans uppercase textShadow'>Vizyon ve Misyon</p>
                    </div>
                    <div className='cover' style={{ height: 200 }}></div>
                </div>
            </MobileView>
            <div className='max-w-7xl mx-auto py-5 px-3 grid md:grid-cols-2'>
                <div className='mr-3'>
                    <p className='text-5xl uppercase font-bold font-sans text-center border-b mb-3 text-firstColor'>Vizyon</p>
                    <p>&emsp;&emsp;Evrensel bilim ilkeleri ışığında, bilime ve ülkemizin teknolojik alanda geliştirilmesine katkı sağlayan, mühendislik eğitimi ve uygulama alanlarında özellikle sağlık ve diğer disiplinler arası işbirliğine önem veren, ulusal ve uluslararası tanınırlığı olan, insani değerlere sahip ve bilimsel olarak nitelikli profesyoneller yetiştiren bir bölüm olmaktır.</p>
                </div>
                <div>
                    <p className='text-5xl uppercase font-bold font-sans text-center border-b mb-3 text-firstColor'>Misyon</p>
                    <p>&emsp;&emsp;Bilgi, beceri ve yetkinlikleri, evrensel ve güncel ihtiyaçlara cevap verecek seviyede desteklenerek bireysel refahın artırılması yoluyla toplumsal değerin büyütülmesidir. Bilimsel araştırmalar, sanayi ve özellikle sağlık uygulamaları için yeterli altyapıya sahip,  meslek alanında gerekli bilgi ve becerilerin yanında eleştirel düşünme, problem çözme ve araştırma becerilerine sahip, yeniliklere açık, bilim-teknolojiyi kullanabilen, disiplinler arası işbirliği ve ekip çalışması yapabilen, girişimci, etik ve insani değerlere saygılı, iş sağlığı ve güvenliği konusunda duyarlı bilgisayar mühendisleri yetiştirmektir.</p>
                </div>
            </div>
        </div>
    )
}

export default VizyonVeMisyon