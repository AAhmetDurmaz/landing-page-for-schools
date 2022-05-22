import React, { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const Sil = (props) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const cancelButtonRef = useRef(null);
    const [alertDisplay, setAlertDisplay] = useState(false);
    const [alertText, setAlertText] = useState('');

    const removeUser = async () => {
        await axios.post((window.apiBase + '/remove-directive'), { id: props.id }, { headers: { 'Authorization': 'Bearer ' + cookies.get('auth') } }
        ).then((response, err) => {
            if (err) {
                console.log(err);
                setAlertText('Veri akışı sırasında bir sorun oluştu. Lütfen daha sonra tekrar deneyin.');
                setAlertDisplay(true);
            } else {
                if (response.data.code !== 200) {
                    setAlertText('Veri akışı sırasında bir sorun oluştu. Lütfen daha sonra tekrar deneyin.');
                    setAlertDisplay(true);
                } else {
                    setOpen(false);
                    navigate('/admin');
                }
            }
        })
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
                            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                <div className={'max-w-5xl mx-auto border border-red-500 bg-red-100 px-5 py-3 rounded text-red-600 ' + (alertDisplay ? 'block' : 'hidden')}>{alertText}</div>
                                <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900 p-6">
                                    Emin misiniz? <strong className='text-red-600'>Bu işlem geri alınamaz!</strong>
                                </Dialog.Title>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="button"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={removeUser}
                                    >
                                        Sil
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
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog >
            </Transition.Root >
            <button onClick={() => { setOpen(true); }} className='bg-red-600 hover:bg-red-800 text-white px-5 py-2 rounded transition font-sans font-bold'>Programı Sil</button>
        </div>
    )
}

export default Sil