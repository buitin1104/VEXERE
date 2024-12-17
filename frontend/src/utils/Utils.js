import moment from 'moment';
import regex from './regex';
const timeZone = 'Asia/Ho_Chi_Minh';
// import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
// import { db } from '../firebase'
import { toast } from 'react-toastify';
// import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
// import { storage } from '../firebase'
import clsx from 'clsx';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { twMerge } from 'tailwind-merge';
import { v4 } from 'uuid';
import { storage } from '../config/firebaseConfig';

export const convertStringToNumber = (value, delimiter = '.') => {
    if (value || value === 0) {
        return `${value.toString().replace(regex.formatMoney, delimiter)} đ`;
    }
    return '0';
};

export const partStringToNumber = (value, delimiter = '.') => {
    if (value || value === 0) {
        return `${value.toString().replace(regex.formatMoney, delimiter)}`;
    }
    return '0';
};

export const ToastInfo = (mes = 'Thông báo mới') => {
    toast.info(mes, {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
    });
};

export const ToastNoti = (mes = 'Lưu dữ liệu thành công') => {
    toast.success(mes, {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
    });
};
export const ToastUpdate = (mes = 'Thay đổi dữ liệu thành công') => {
    toast.success(mes, {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
    });
};
export const ToastDel = (mes = 'Đã xoá dữ liệu thành công') => {
    toast.success(mes, {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
    });
};
export const ToastNotiError = (mes = 'Hệ thống lỗi') => {
    toast.error(mes, {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
    });
};

export const getDate = (timestamp, type = 1) => {
    if (timestamp == null) {
        return null;
    }
    let result = null;
    switch (type) {
        case 1:
            result = moment(timestamp).format('DD/MM/YYYY');
            break;
        case 2:
            result = moment(timestamp).format('YYYY-MM-DD');
            break;
        case 3:
            result = moment(timestamp).format('yyyy-MM-DD');
            break;
        case 4:
            result = dayjs(timestamp);
            break;
        case 5:
            result = moment(timestamp).format('DD.MM.yyyy - HH:mm');
            break;
        case 6:
            result = moment(timestamp).format('HH:mm');
            break;
        case 7:
            result = moment(timestamp).format('HH:mm  DD.MM.yyyy');
            break;
        case 8:
            result = moment(timestamp).format('MM/DD/YYYY');
            break;
        case 9:
            result = moment(timestamp).format('YYYY');
            break;
        case 10:
            result = moment(timestamp).format('MM');
            break;
        case 11:
            result = moment(timestamp).format('MM/YYYY');
            break;
        case 12:
            result = moment(timestamp).format('DD.MM.yyyy - HH:mm');
            break;
        case 13:
            const newDate =
                timestamp.year + '/' + timestamp.month + '/' + timestamp.day;
            result = moment(newDate, 'YYYY/MM/DD').format('YYYY-MM-DD');
            break;
        case 14:
            result = result = new Date(
                timestamp.year,
                timestamp.month - 1, // Tháng bắt đầu từ 0
                timestamp.day,
                timestamp.hour,
                timestamp.minute,
                timestamp.second,
                timestamp.millisecond
            );
            break;
        case 15:
            const formatter = new Intl.DateTimeFormat('en-US', {
                timeZone,
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: false,
                fractionalSecondDigits: 3,
            });
            const parts = formatter.formatToParts(timestamp);
            const dateObj = {};
            parts.forEach(part => {
                if (part.type !== 'literal') {
                    dateObj[part.type] = parseInt(part.value, 10);
                }
            });
            const offset = -date.getTimezoneOffset() * 60 * 1000;
            result = {
                year: dateObj.year,
                month: dateObj.month,
                day: dateObj.day,
                hour: dateObj.hour,
                minute: dateObj.minute,
                second: dateObj.second,
                millisecond: date.getMilliseconds(),
                timeZone: timeZone,
                offset: offset,
                era: dateObj.year >= 1 ? 'AD' : 'BC',
                calendar: { identifier: 'gregory' },
            };
            break;
        case 16: {
            const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
            // Định dạng ngày giờ theo múi giờ và ngôn ngữ
            result = new Intl.DateTimeFormat('vi-VN', {
                timeZone,
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false, // Sử dụng 24 giờ
            }).format(date);

        }
        default:
            break;
    }
    return result;
};

// Hàm loại bỏ dấu tiếng Việt
export function removeVietnameseAccent(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export function searchNameWithoutVietnameseAccent(listData, keyword) {
    // Chuẩn hóa keyword tìm kiếm và tên trong mảng
    const normalizedKeyword = removeVietnameseAccent(keyword.toLowerCase());
    const normalizedNames = listData.map((item) =>
        removeVietnameseAccent(item.fullName.toLowerCase()),
    );

    // Tìm kiếm tên không phân biệt dấu
    const result = listData.filter((item, index) => {
        const normalizedFullName = normalizedNames[index];
        return normalizedFullName.includes(normalizedKeyword);
    });

    return result;
}

export const getTime = (inputTime) => {
    if (inputTime || inputTime === '0:00') {
        return moment(inputTime, 'HH:mm:ssZ').format('H:mm');
    }
    return '0';
};

export function uploadFirebase(file) {
    return new Promise((resolve, reject) => {
        if (!file) {
            console.log('No file selected.');
            reject(new Error('No file selected.'));
            return;
        }

        const uniqueFileName = `${v4()}_${file.name}`;
        const imageRef = ref(storage, `avatar/${uniqueFileName}`);

        uploadBytes(imageRef, file)
            .then((snapshot) => {
                getDownloadURL(snapshot.ref)
                    .then((downloadURL) => {
                        resolve(downloadURL);
                    })
                    .catch((error) => {
                        console.error('Error getting download URL:', error);
                        reject(error);
                    });
            })
            .catch((error) => {
                console.error('Error uploading file:', error);
                reject(error);
            });
    });
}

export function cn(...args) {
    return twMerge(clsx(args));
}
