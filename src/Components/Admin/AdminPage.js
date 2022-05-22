import React from 'react';
import { v4 as uuid } from 'uuid';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { LogoutIcon, ShieldCheckIcon } from '@heroicons/react/outline';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const AdminPage = (props) => {
    const navigate = useNavigate();
    const logOutEvent = () => {
        cookies.remove('auth');
        navigate('/');
    }
    return (
        <div>
            <div className="flex flex-wrap bg-gray-100 w-full h-full grid md:grid-cols-12">
                <div className="bg-white rounded p-3 shadow-lg md:col-span-2">
                    <div className="flex items-center space-x-4 p-2 mb-2 border-b">
                        <div>
                            <h4 className="font-semibold text-lg text-gray-700 capitalize font-poppins tracking-wide">{props.userData.name}</h4>
                            <span className="text-sm tracking-wide flex items-center space-x-1">
                                <ShieldCheckIcon className='text-green-500 w-6 h-6' />
                                <span className="text-gray-600">Yetkilendirilmiş</span>
                            </span>
                        </div>
                    </div>
                    <ul className="space-y-2 text-sm">
                        {
                            props.powerPages.map(item => (
                                props.userData.powers.includes(item.id) ?
                                    <li key={uuid()}>
                                        <Link to={item.route} className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 transition">
                                            <span className="text-gray-600">
                                                <item.icon className='h-6 w-6' />
                                            </span>
                                            <span>{item.text}</span>
                                        </Link>
                                    </li>
                                    :
                                    ''
                            ))
                        }
                        <div className='border-b'></div>
                        <li>
                            <button onClick={logOutEvent} className="flex w-full items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline">
                                <span className="text-gray-600">
                                    <LogoutIcon className='h-6 w-6' />
                                </span>
                                <span>Çıkış Yap</span>
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="md:col-span-10">
                    <div className="p-4 text-gray-500">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminPage