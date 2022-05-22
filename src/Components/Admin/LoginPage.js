import React, { useState } from 'react';
import { LockClosedIcon } from '@heroicons/react/solid';
import ksbuLogo from '../../Images/logo1181.png';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const LoginPage = () => {
    const [alertText, setAlertText] = useState('');
    const [alertDisplay, setAlertDisplay] = useState(false);
    const loginEvent = (e) => {
        e.preventDefault();
        let email = e.target[0].value;
        let password = CryptoJS.SHA256(e.target[1].value).toString();
        console.log(password);
        axios.post(window.apiBase + '/login', { email: email, password: password }).then((response, err) => {
            if (err) console.log(err);
            else {
                if (response.data.auth === true) {
                    cookies.set('auth', response.data.token, { path: '/', expires: new Date(Date.now() + 2592000), sameSite: true });
                    window.document.location.reload();
                } else {
                    setAlertText('E-Posta veya Şifreniz Hatalı!');
                    setAlertDisplay(true);
                }
            }
        })
    }

    return (
        <div>
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div className={alertDisplay ? 'block' : 'hidden'}>
                        <div className='bg-firstColor border-l-4 border-red-500 text-white p-4 ' role="alert">
                            <p>{alertText}</p>
                        </div>
                    </div>
                    <div>
                        <img
                            className="mx-auto h-48 w-auto"
                            src={ksbuLogo}
                            alt=''
                        />
                        <h2 className="mt-6 text-center text-xl font-extrabold text-gray-900">Yönetici Paneline Giriş Yap</h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={(e) => loginEvent(e)}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <input
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-firstColor focus:border-firstColor focus:z-10 sm:text-sm"
                                    placeholder="E-Posta"
                                />
                            </div>
                            <div>
                                <input
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-firstColor focus:border-firstColor focus:z-10 sm:text-sm"
                                    placeholder="Şifre"
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-bold font-sans rounded-md text-white bg-firstColor hover:bg-middleColor"
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <LockClosedIcon className="h-5 w-5 text-white group-hover:text-gray-300 transition" aria-hidden="true" />
                                </span>
                                Giriş Yap
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage