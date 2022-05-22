import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/SideComponents/Navbar';
import Footer from './Components/SideComponents/Footer';
import MainPage from './Components/Pages/MainPage';
import ScrollToTop from './Components/SideComponents/ScrollToTop';
import NotFound from './Components/Pages/NotFound';
import Hakkimizda from './Components/Pages/Hakkimizda';
import YonetimKadrosu from './Components/Pages/YonetimKadrosu';
import VizyonVeMisyon from './Components/Pages/VizyonVeMisyon';
import YonetmelikVeYonergeler from './Components/Pages/YonetmelikVeYonergeler';
import Akademik from './Components/Pages/Akademik';
import PostGoster from './Components/Pages/PostGoster';
import TumDuyurular from './Components/Pages/TumDuyurular';
import TumEtkinlikler from './Components/Pages/TumEtkinlikler';
import Blog from './Components/Pages/Blog';
import CustomText from './Components/Pages/MuhendislerdenYazilar';
import Galeri from './Components/Pages/Galeri';
// Admin Pages
import AdminLogin from './Components/Admin/LoginPage';
import AdminPage from './Components/Admin/AdminPage';
import AdminAcademicStaff from './Components/Admin/AcademicStaff';
import AdminAnnouncements from './Components/Admin/Announcements';
import AdminEvents from './Components/Admin/Events';
import AdminSocial from './Components/Admin/Social';
import AdminLastMonth from './Components/Admin/LastMonth';
import AdminAboutUs from './Components/Admin/AboutUs';
import AdminLessons from './Components/Admin/Lessons';
import AdminTimetables from './Components/Admin/Timetables';
import AdminUser from './Components/Admin/User';
import AdminDirectives from './Components/Admin/Directives.js';
import AdminBlog from './Components/Admin/Blog';
import EngineerText from './Components/Admin/EngineerText';
import AdminGallery from './Components/Admin/Gallery';
// Admin Pages
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import Cookies from 'universal-cookie';
import {
    AcademicCapIcon,
    ChatAlt2Icon,
    ClockIcon,
    NewspaperIcon,
    DesktopComputerIcon,
    BookOpenIcon,
    UserIcon,
    DocumentIcon,
    GlobeIcon,
    PhotographIcon,
} from '@heroicons/react/outline';
import { AdayOgrenci } from './Components/Pages/AdayOgrenci';

const cookies = new Cookies();

const powerPages = [
    { id: 0, text: 'Akademik Kadro', route: '/admin/AcademicStaff', icon: AcademicCapIcon },
    { id: 1, text: 'Duyurular', route: '/admin/Announcements', icon: NewspaperIcon },
    { id: 2, text: 'Etkinlikler', route: '/admin/Events', icon: ChatAlt2Icon },
    { id: 3, text: 'Sosyal', route: '/admin/Social', icon: ChatAlt2Icon },
    { id: 4, text: 'Mühendislerden Yazılar', route: '/admin/Texts', icon: ChatAlt2Icon },
    { id: 5, text: 'Geçtiğimiz Ay KSBÜ', route: '/admin/LastMonth', icon: ClockIcon },
    { id: 6, text: 'Hakkımızda', route: '/admin/AboutUs', icon: DesktopComputerIcon },
    { id: 7, text: 'Ders Listesi', route: '/admin/Lessons', icon: BookOpenIcon },
    { id: 8, text: 'Ders Programı', route: '/admin/Timetables', icon: BookOpenIcon },
    { id: 9, text: 'Yönetmelik ve Yönergeler', route: '/admin/Directives', icon: DocumentIcon },
    { id: 10, text: 'Öğrencilerimizden Yazılar/Blog', route: '/admin/Blog', icon: GlobeIcon },
    { id: 11, text: 'Yetkililer', route: '/admin/Users', icon: UserIcon },
    { id: 12, text: 'Galeri', route: '/admin/Gallery', icon: PhotographIcon },
];

const pagesWithItems = [
    { id: 0, text: 'Akademik Kadro', item: <Route key={uuid()} path='/admin/AcademicStaff' element={<AdminAcademicStaff />} /> },
    { id: 1, text: 'Duyurular', item: <Route key={uuid()} path='/admin/Announcements' element={<AdminAnnouncements />} /> },
    { id: 2, text: 'Etkinlikler', item: <Route key={uuid()} path='/admin/Events' element={<AdminEvents />} /> },
    { id: 3, text: 'Sosyal', item: <Route key={uuid()} path='/admin/Social' element={<AdminSocial />} /> },
    { id: 4, text: 'Mühendislerden Yazılar', item: <Route key={uuid()} path='/admin/Texts' element={<EngineerText />} /> },
    { id: 5, text: 'Geçtiğimiz Ay KSBÜ', item: <Route key={uuid()} path='/admin/LastMonth' element={<AdminLastMonth />} /> },
    { id: 6, text: 'Hakkımızda', item: <Route key={uuid()} path='/admin/AboutUs' element={<AdminAboutUs />} /> },
    { id: 7, text: 'Ders Listesi', item: <Route key={uuid()} path='/admin/Lessons' element={<AdminLessons />} /> },
    { id: 8, text: 'Ders Programı', item: <Route key={uuid()} path='/admin/Timetables' element={<AdminTimetables />} /> },
    { id: 9, text: 'Yönetmelik ve Yönergeler', item: <Route key={uuid()} path='/admin/Directives' element={<AdminDirectives />} /> },
    { id: 10, text: 'Öğrencilerimizden Yazılar/Blog', item: <Route key={uuid()} path='/admin/Blog' element={<AdminBlog />} /> },
    { id: 11, text: 'Yetkililer', item: <Route key={uuid()} path='/admin/Users' element={<AdminUser powerPages={powerPages} />} /> },
    { id: 12, text: 'Galeri', item: <Route key={uuid()} path='/admin/Gallery' element={<AdminGallery />} /> },
];

// TODO(ahmet): HER SAYFA YÜKLENDİĞİNDE isAuthenticated'A POST ATILIYOR. HİÇ HOŞ DEĞİL. DÜZENLE BURAYI.

function App() {
    const [isLogged, setIsLogged] = useState(false);
    const [userData, setUserData] = useState({});
    useEffect(() => {
        if (cookies.get('auth') !== undefined) {
            axios.post(window.apiBase + '/isAuthenticated', {}, { headers: { 'Authorization': 'Bearer ' + cookies.get('auth') } }).then(response => {
                if (response.data.auth === true) {
                    setUserData(response.data.userData);
                    setIsLogged(true);
                } else {
                    setIsLogged(false);
                }
            })
        } else {
            setIsLogged(false);
        }
    }, []);
    return (
        <BrowserRouter>
            <Navbar />
            <ScrollToTop>
                <Routes>
                    <Route exact path='/' element={<MainPage />} />
                    <Route exact path='/hakkimizda' element={<Hakkimizda />} />
                    <Route exact path='/yonetim' element={<YonetimKadrosu />} />
                    <Route exact path='/vizyon-ve-misyon' element={<VizyonVeMisyon />} />
                    <Route exact path='/yonetmelik-ve-yonergeler' element={<YonetmelikVeYonergeler />} />
                    <Route exact path='/akademik' element={<Akademik />} />
                    <Route exact path='/duyurular' element={<TumDuyurular />} />
                    <Route exact path='/blog' element={<Blog />} />
                    <Route exact path='/muhendislerden-yazilar' element={<CustomText />} />
                    <Route exact path='/etkinlikler' element={<TumEtkinlikler />} />
                    <Route exact path='/galeri' element={<Galeri />} />
                    <Route exact path='/aday-ogrenci' element={<AdayOgrenci />} />
                    <Route exact path='/:state/:url' element={<PostGoster />} />
                    <Route exact path='*' element={<NotFound />} />

                    {/* ADMIN PAGES */}
                    {
                        isLogged ?
                            userData.powers !== undefined ?
                                <>
                                    <Route path='admin' element={<AdminPage userData={userData} powerPages={powerPages} />}>
                                        {
                                            userData.powers.map(item => (
                                                pagesWithItems[item].item
                                            ))
                                        }
                                        <Route path='AcademicStaff' element={<AdminAcademicStaff />} />
                                    </Route>
                                </>
                                :
                                <></>
                            :
                            <Route exact path='/admin' element={<AdminLogin />} />
                    }
                    {/* ADMIN PAGES */}
                </Routes>
            </ScrollToTop>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
