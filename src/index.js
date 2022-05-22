import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const Aylar = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];

window.apiBase = 'http://localhost:8080';
window.TimestampToDate = (timestamp) => {
    let date = new Date(timestamp);
    return (`${date.getDate()} ${Aylar[date.getMonth()]} ${date.getFullYear()}, ${date.toLocaleDateString('tr-TR', { weekday: 'long' })}`);
}
window.UnixToTimestamp = (unix) => {
    let date = new Date(unix);
    return date.getTime();
}
window.hrefGenerator = (string) => {
    let value = string.toLowerCase()
        .trim()
        .replaceAll('ı', 'i')
        .replaceAll('ğ', 'g')
        .replaceAll('ü', 'u')
        .replaceAll('ş', 's')
        .replaceAll('ö', 'o')
        .replaceAll('ç', 'c')
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .replaceAll(' ', '-');
    return (value + '-' + Math.floor(1000 + Math.random() * 9000));
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);