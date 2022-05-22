import React, { Fragment } from 'react';
import ksbuLogo from '../../Images/logo1181.png';
import { Popover, Transition } from '@headlessui/react';
import {
    MenuIcon,
    XIcon,
    DesktopComputerIcon,
    BookOpenIcon,
    DocumentIcon,
    UserGroupIcon,
    GlobeIcon,
    ChevronDownIcon,
    NewspaperIcon,
    DocumentTextIcon,
    PhotographIcon,
} from '@heroicons/react/outline';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

const Navbar = () => {
    return (
        <div>
            <Popover>
                <div className='mx-auto bg-firstColor grid md:grid-cols-0 py-3 md:py-0 grid-cols-3 md:px-12 px-3 items-center'>
                    <div className='md:block hidden'>
                        <p className='text-white font-sans font-semibold text-right uppercase'>Kütahya Sağlık Bilimleri Üniversitesi</p>
                    </div>
                    <div className='md:flex md:justify-center md:mt-3'><Link to='/'><img alt='Logo' src={ksbuLogo} className='md:w-24 md:h-24 w-12 h-12' /></Link></div>
                    <div className='md:block hidden'>
                        <p className='text-white font-sans font-semibold text-left uppercase'>Bilgisayar Mühendisliği</p>
                    </div>
                    <div className='md:hidden block text-center text-white grid place-items-center'><span>KSBÜ</span></div>
                    <div className='md:hidden block flex justify-end grid place-items-center'>
                        <Popover.Button className="inline-flex items-center text-white">
                            <span className="sr-only">Menüyü Aç</span>
                            <MenuIcon className="h-8 w-8" aria-hidden="true" />
                        </Popover.Button>
                    </div>
                </div>
                <div className='hidden md:block'>
                    <div className='mx-auto bg-firstColor grid grid-cols-0 md:grid-cols-6 items-center'>
                        <Link to='/hakkimizda' key={uuid()} className='text-white my-5 px-3 grid place-items-center text-sm uppercase rounded-md'>
                            <p className='flex items-center'>
                                <DesktopComputerIcon className='h-6 w-6 mr-1' />
                                Hakkımızda
                            </p>
                        </Link>
                        <Popover className="relative">
                            {({ open }) => (
                                <>
                                    <div className='grid place-items-center'>
                                        <Popover.Button
                                            className='group text-white rounded-md inline-flex items-center text-base font-medium'
                                        >
                                            <BookOpenIcon className='h-6 w-6 text-white mr-1' />
                                            <span className='uppercase text-sm'>Yazılar</span>
                                            <ChevronDownIcon
                                                className='ml-2 h-5 w-5 text-gray-300'
                                                aria-hidden="true"
                                            />
                                        </Popover.Button>
                                    </div>

                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-200"
                                        enterFrom="opacity-0 translate-y-1"
                                        enterTo="opacity-100 translate-y-0"
                                        leave="transition ease-in duration-150"
                                        leaveFrom="opacity-100 translate-y-0"
                                        leaveTo="opacity-0 translate-y-1"
                                    >
                                        <Popover.Panel className="absolute z-10 w-screen -ml-4 mt-3 transform px-2 max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                                            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                                                <div className="relative grid gap-6 bg-middleColor px-5 py-6 sm:gap-8 sm:p-8">
                                                    <Link
                                                        to='/muhendislerden-yazilar'
                                                        className="-m-3 p-3 flex items-start rounded-lg"
                                                    >
                                                        <GlobeIcon className="flex-shrink-0 h-6 w-6 text-white" aria-hidden="true" />
                                                        <div className="ml-4">
                                                            <p className="text-base font-medium text-white">Mühendislerden Yazılar</p>
                                                            <p className="mt-1 text-sm text-gray-300">Bilgisayar mühendislerden bilgilendirici yazılar.</p>
                                                        </div>
                                                    </Link>
                                                    <Link
                                                        to='/blog'
                                                        className="-m-3 p-3 flex items-start rounded-lg"
                                                    >
                                                        <NewspaperIcon className="flex-shrink-0 h-6 w-6 text-white" aria-hidden="true" />
                                                        <div className="ml-4">
                                                            <p className="text-base font-medium text-white">Öğrencilerimizden Yazılar</p>
                                                            <p className="mt-1 text-sm text-gray-300">KSBÜ Bilgisayar Mühendisliği öğrencileri tarafından yazılan blog.</p>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </Popover.Panel>
                                    </Transition>
                                </>
                            )}
                        </Popover>
                        <Link to='/aday-ogrenci' key={uuid()} className='text-white my-5 px-3 grid place-items-center text-sm uppercase rounded-md'>
                            <p className='flex items-center uppercase text-sm'>
                                <GlobeIcon className='h-6 w-6 mr-1' />
                                Aday Öğrenci
                            </p>
                        </Link>
                        <Link to='/galeri' key={uuid()} className='text-white my-5 px-3 grid place-items-center text-sm uppercase rounded-md'>
                            <p className='flex items-center uppercase text-sm'>
                                <PhotographIcon className='h-6 w-6 mr-1' />
                                Galeri
                            </p>
                        </Link>
                        <Link to='/akademik' key={uuid()} className='text-white my-5 px-3 grid place-items-center text-sm uppercase rounded-md'>
                            <p className='flex items-center uppercase text-sm'>
                                <UserGroupIcon className='h-6 w-6 mr-1' />
                                Akademik
                            </p>
                        </Link>
                        <Popover className="relative">
                            {({ open }) => (
                                <>
                                    <div className='grid place-items-center'>
                                        <Popover.Button
                                            className='group text-white rounded-md inline-flex items-center text-base font-medium'
                                        >
                                            <span className='text-sm uppercase'>Diğer</span>
                                            <ChevronDownIcon
                                                className='ml-2 h-5 w-5 text-gray-300'
                                                aria-hidden="true"
                                            />
                                        </Popover.Button>
                                    </div>

                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-200"
                                        enterFrom="opacity-0 translate-y-1"
                                        enterTo="opacity-100 translate-y-0"
                                        leave="transition ease-in duration-150"
                                        leaveFrom="opacity-100 translate-y-0"
                                        leaveTo="opacity-0 translate-y-1"
                                    >
                                        <Popover.Panel className="absolute w-full z-10 -ml-4 mt-3 transform px-2 max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                                            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                                                <div className="relative grid gap-6 bg-middleColor px-5 py-6 sm:gap-8 sm:p-8">
                                                    <a
                                                        target='_blank'
                                                        rel='noopener noreferrer'
                                                        href='https://obs.ksbu.edu.tr'
                                                        className="-m-3 p-3 flex items-start rounded-lg"
                                                    >
                                                        <DesktopComputerIcon className="flex-shrink-0 h-6 w-6 text-white" aria-hidden="true" />
                                                        <div className="ml-4">
                                                            <p className="text-base font-medium text-gray-300">Öğrenci Bilgi Sistemi (OBS)</p>
                                                        </div>
                                                    </a>
                                                    <a
                                                        target='_blank'
                                                        rel='noopener noreferrer'
                                                        href='https://oys.ksbu.edu.tr'
                                                        className="-m-3 p-3 flex items-start rounded-lg"
                                                    >
                                                        <DesktopComputerIcon className="flex-shrink-0 h-6 w-6 text-white" aria-hidden="true" />
                                                        <div className="ml-4">
                                                            <p className="text-base font-medium text-gray-300">Öğretim Yönetim Sistemi (ÖYS)</p>
                                                        </div>
                                                    </a>
                                                    <Link
                                                        to='/yonetmelik-ve-yonergeler'
                                                        className="-m-3 p-3 flex items-start rounded-lg"
                                                    >
                                                        <DocumentIcon className="flex-shrink-0 h-6 w-6 text-white" aria-hidden="true" />
                                                        <div className="ml-4">
                                                            <p className="text-base font-medium text-gray-300">Yönetmelik ve Yönergeler</p>
                                                        </div>
                                                    </Link>
                                                    <a
                                                        href='/akademik#DersProgrami'
                                                        className="-m-3 p-3 flex items-start rounded-lg"
                                                    >
                                                        <DocumentTextIcon className="flex-shrink-0 h-6 w-6 text-white" aria-hidden="true" />
                                                        <div className="ml-4">
                                                            <p className="text-base font-medium text-gray-300">Ders Programı</p>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        </Popover.Panel>
                                    </Transition>
                                </>
                            )}
                        </Popover>
                    </div>
                </div>
                <Transition
                    as={Fragment}
                    enter="duration-200 ease-out"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="duration-100 ease-in"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Popover.Panel focus className="absolute z-50 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
                        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-firstColor divide-y-2 divide-gray-50">
                            <div className="pt-5 pb-6 px-5 border border-secondColor rounded">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <img
                                            className="h-12 w-auto"
                                            src={ksbuLogo}
                                            alt="KSBÜ Logo"
                                        />
                                    </div>
                                    <span className='text-white font-light'><strong>KSBÜ</strong></span>
                                    <div className="-mr-2">
                                        <Popover.Button className="bg-firstColor rounded-md p-2 inline-flex items-center text-white">
                                            <span className="sr-only">Menüyü kapat</span>
                                            <XIcon className="h-6 w-6" aria-hidden="true" />
                                        </Popover.Button>
                                    </div>
                                </div>
                                <div className='mt-6'>
                                    <div className='grid gap-y-6'>
                                        <Link to='/hakkimizda' className='text-base font-medium text-white'>
                                            <p className='flex items-center uppercase text-sm'>
                                                <DesktopComputerIcon className='h-6 w-6 mr-1' />
                                                Hakkımızda
                                            </p>
                                        </Link>
                                        <Popover className="relative">
                                            {({ open }) => (
                                                <>
                                                    <Popover.Button
                                                        className='group text-white rounded-md inline-flex items-center text-base font-medium'
                                                    >
                                                        <BookOpenIcon className='h-6 w-6 text-white mr-1' />
                                                        <span className='uppercase text-sm'>Yazılar</span>
                                                        <ChevronDownIcon
                                                            className='ml-2 h-5 w-5 text-gray-300'
                                                            aria-hidden="true"
                                                        />
                                                    </Popover.Button>

                                                    <Transition
                                                        as={Fragment}
                                                        enter="transition ease-out duration-200"
                                                        enterFrom="opacity-0 translate-y-1"
                                                        enterTo="opacity-100 translate-y-0"
                                                        leave="transition ease-in duration-150"
                                                        leaveFrom="opacity-100 translate-y-0"
                                                        leaveTo="opacity-0 translate-y-1"
                                                    >
                                                        <Popover.Panel className="absolute z-10 -ml-4 mt-3 transform px-2 max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                                                            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                                                                <div className="relative grid gap-6 bg-middleColor px-5 py-6 sm:gap-8 sm:p-8">
                                                                    <Link
                                                                        to='/muhendislerden-yazilar'
                                                                        className="-m-3 p-3 flex items-start rounded-lg"
                                                                    >
                                                                        <GlobeIcon className="flex-shrink-0 h-6 w-6 text-white" aria-hidden="true" />
                                                                        <div className="ml-4">
                                                                            <p className="text-base font-medium text-white">Mühendislerden Yazılar</p>
                                                                            <p className="mt-1 text-sm text-gray-300">Bilgisayar mühendislerden bilgilendirici yazılar.</p>
                                                                        </div>
                                                                    </Link>
                                                                    <Link
                                                                        to='/blog'
                                                                        className="-m-3 p-3 flex items-start rounded-lg"
                                                                    >
                                                                        <NewspaperIcon className="flex-shrink-0 h-6 w-6 text-white" aria-hidden="true" />
                                                                        <div className="ml-4">
                                                                            <p className="text-base font-medium text-white">Öğrencilerimizden Yazılar</p>
                                                                            <p className="mt-1 text-sm text-gray-300">KSBÜ Bilgisayar Mühendisliği öğrencileri tarafından yazılan blog.</p>
                                                                        </div>
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </Popover.Panel>
                                                    </Transition>
                                                </>
                                            )}
                                        </Popover>
                                        <Link to='/aday-ogrenci' className='text-base font-medium text-white'>
                                            <p className='flex items-center uppercase text-sm'>
                                                <BookOpenIcon className='h-6 w-6 mr-1' />
                                                Aday Öğrenci
                                            </p>
                                        </Link>
                                        <Link to='/galeri' className='text-base font-medium text-white'>
                                            <p className='flex items-center uppercase text-sm'>
                                                <PhotographIcon className='h-6 w-6 mr-1' />
                                                Galeri
                                            </p>
                                        </Link>
                                        <Link to='/akdemik' className='text-base font-medium text-white'>
                                            <p className='flex items-center uppercase text-sm'>
                                                <UserGroupIcon className='h-6 w-6 mr-1' />
                                                Akademik
                                            </p>
                                        </Link>
                                        <Popover className="relative">
                                            {({ open }) => (
                                                <>
                                                    <Popover.Button
                                                        className='group text-white rounded-md inline-flex items-center text-base font-medium'
                                                    >
                                                        <span className='uppercase text-sm'>Diğer</span>
                                                        <ChevronDownIcon
                                                            className='ml-2 h-5 w-5 text-gray-300'
                                                            aria-hidden="true"
                                                        />
                                                    </Popover.Button>

                                                    <Transition
                                                        as={Fragment}
                                                        enter="transition ease-out duration-200"
                                                        enterFrom="opacity-0 translate-y-1"
                                                        enterTo="opacity-100 translate-y-0"
                                                        leave="transition ease-in duration-150"
                                                        leaveFrom="opacity-100 translate-y-0"
                                                        leaveTo="opacity-0 translate-y-1"
                                                    >
                                                        <Popover.Panel className="absolute z-10 -ml-4 mt-3 transform px-2 max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                                                            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                                                                <div className="relative grid gap-6 bg-middleColor px-5 py-6 sm:gap-8 sm:p-8">
                                                                    <a
                                                                        target='_blank'
                                                                        rel='noopener noreferrer'
                                                                        href='https://obs.ksbu.edu.tr'
                                                                        className="-m-3 p-3 flex items-start rounded-lg"
                                                                    >
                                                                        <DesktopComputerIcon className="flex-shrink-0 h-6 w-6 text-white" aria-hidden="true" />
                                                                        <div className="ml-4">
                                                                            <p className="text-base font-medium text-gray-300">Öğrenci Bilgi Sistemi (OBS)</p>
                                                                        </div>
                                                                    </a>
                                                                    <a
                                                                        target='_blank'
                                                                        rel='noopener noreferrer'
                                                                        href='https://oys.ksbu.edu.tr'
                                                                        className="-m-3 p-3 flex items-start rounded-lg"
                                                                    >
                                                                        <DesktopComputerIcon className="flex-shrink-0 h-6 w-6 text-white" aria-hidden="true" />
                                                                        <div className="ml-4">
                                                                            <p className="text-base font-medium text-gray-300">Öğretim Yönetim Sistemi (ÖYS)</p>
                                                                        </div>
                                                                    </a>
                                                                    <Link
                                                                        to='/yonetmelik-ve-yonergeler'
                                                                        className="-m-3 p-3 flex items-start rounded-lg"
                                                                    >
                                                                        <DocumentIcon className="flex-shrink-0 h-6 w-6 text-white" aria-hidden="true" />
                                                                        <div className="ml-4">
                                                                            <p className="text-base font-medium text-gray-300">Yönetmelik ve Yönergeler</p>
                                                                        </div>
                                                                    </Link>
                                                                    <a
                                                                        href='/akademik#DersProgrami'
                                                                        className="-m-3 p-3 flex items-start rounded-lg"
                                                                    >
                                                                        <DocumentTextIcon className="flex-shrink-0 h-6 w-6 text-white" aria-hidden="true" />
                                                                        <div className="ml-4">
                                                                            <p className="text-base font-medium text-gray-300">Ders Programı</p>
                                                                        </div>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </Popover.Panel>
                                                    </Transition>
                                                </>
                                            )}
                                        </Popover>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Popover.Panel>
                </Transition>
            </Popover>
        </div>
    );
};

export default Navbar;