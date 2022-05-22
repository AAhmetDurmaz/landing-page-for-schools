import React, { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const YeniEkle = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const cancelButtonRef = useRef(null);
    const [alertDisplay, setAlertDisplay] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [files, setFiles] = useState();
    const [uploadProgress, setUploadProgress] = useState(0);

    const create = async (e) => {
        e.preventDefault();
        if (files !== undefined) {
            let formData = new FormData();
            formData.append('name', e.target[0].value);
            formData.append('file', files[0]);
            await axios.post((window.apiBase + '/add-timetable'), formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data', 'Authorization': 'Bearer ' + cookies.get('auth') },
                    onUploadProgress: data => {
                        setUploadProgress(Math.round((100 * data.loaded) / data.total));
                    }
                }
            ).then((response, err) => {
                if (err) {
                    console.log(err);
                    setAlertText('Veri akışı sırasında bir sorun oluştu. Lütfen daha sonra tekrar deneyin.');
                    setAlertDisplay(true);
                } else {
                    console.log(response.data);
                    if (response.data.code === 200) {
                        setOpen(false);
                        navigate('/admin');
                    } else {
                        setAlertText('Bir sorun oluştu. Lütfen daha sonra tekrar deneyin.');
                        setAlertDisplay(true);
                    }
                }
            })
        } else {
            setAlertText('Dosya seçmelisiniz!');
            setAlertDisplay(true);
        }
    }

    return (
        <div>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full">
                                <div className={'max-w-5xl mx-auto border border-red-500 bg-red-100 px-5 py-3 rounded text-red-600 ' + (alertDisplay ? 'block' : 'hidden')}>{alertText}</div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                                </div>
                                <form onSubmit={(e) => create(e)}>
                                    <div className="bg-white px-4 pt-5 pb-4">
                                        <div className="mt-2 text-center mx-4 sm:text-left">
                                            <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                                Yeni Program Oluştur
                                            </Dialog.Title>
                                            <div className="mt-2 font-light">
                                                <label className="block text-gray-700 text-sm font-bold mt-2">İsim</label>
                                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    name='ad'
                                                    type="text"
                                                    placeholder="Ad"
                                                />
                                                <label className="block text-gray-700 text-sm font-bold mt-2" htmlFor="resim">Resim</label>
                                                <input
                                                    onChange={(e) => { setFiles(e.target.files); }}
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    name='dosya'
                                                    type='file'
                                                    placeholder="Dosya"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                        <button
                                            type="submit"
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                                        >
                                            Ekle
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                            onClick={() => setOpen(false)}
                                            ref={cancelButtonRef}
                                        >
                                            Vazgeç
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog >
            </Transition.Root >
            <button onClick={() => { setOpen(true); }} className='bg-green-600 hover:bg-green-800 text-white px-5 py-2 rounded transition font-sans font-bold'>Yeni program oluştur</button>
        </div>
    )
}

export default YeniEkle;