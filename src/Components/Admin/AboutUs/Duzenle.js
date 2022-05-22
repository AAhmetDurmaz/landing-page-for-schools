import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import RichTextEditor from 'react-rte';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const Duzenle = (props) => {
    const [editorState, setEditorState] = useState(() => RichTextEditor.createValueFromString((props.currentData.index !== undefined ? props.currentData.index : '<p></p>'), 'html'));
    const navigate = useNavigate();
    const [alertDisplay, setAlertDisplay] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [imageFiles, setImageFiles] = useState();
    const [uploadProgress, setUploadProgress] = useState(0);
    const updateAboutUs = () => {
        let formData = new FormData();
        if (imageFiles !== undefined) { formData.append('file', imageFiles[0]) };
        formData.append('index', editorState.toString('html'));
        axios.post(window.apiBase + '/update-about-us', formData,
            {
                headers: { 'Content-Type': 'multipart/form-data', 'Authorization': 'Bearer ' + cookies.get('auth') },
                onUploadProgress: data => {
                    setUploadProgress(Math.round((100 * data.loaded) / data.total));
                }
            }
        ).then((response, err) => {
            if (err) console.log(err);
            else {
                if (err) {
                    console.log(err);
                    setAlertText('Veri akışı sırasında bir sorun oluştu. Lütfen daha sonra tekrar deneyin.');
                    setAlertDisplay(true);
                } else {
                    console.log(response.data)
                    if (response.data.code !== 200) {
                        setAlertText('Bir sorun oluştu. Lütfen daha sonra tekrar deneyin.');
                        setAlertDisplay(true);
                    } else {
                        navigate('/admin');
                    }
                }
            }
        })
    }
    return (
        <div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
            </div>
            <div className="bg-white px-4 pt-5 pb-4">
                <div className="mt-2 text-center mx-4 sm:text-left">
                    <p className='text-5xl uppercase font-bold font-sans text-center border-b mb-3 text-firstColor'>Hakkımızda</p>
                    <div className={'max-w-5xl mx-auto border border-red-500 bg-red-100 px-5 py-3 rounded text-red-600 ' + (alertDisplay ? 'block' : 'hidden')}>{alertText}</div>
                    <label className="block text-gray-700 text-sm font-bold mt-2" htmlFor="resim">Resim</label>
                    <input
                        onChange={(e) => { setImageFiles(e.target.files); }}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name='resim'
                        type='file'
                        placeholder="Resim"
                    />
                    <RichTextEditor value={editorState} onChange={(value) => setEditorState(value)} />
                </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={updateAboutUs}
                >
                    Güncelle
                </button>
            </div>
        </div>
    )
}

export default Duzenle