import axios from "axios"
import CryptoJS from "crypto-js";

const CV_DATA_KEY = "CV_DATA"
const CV_DATA_DECRYPT_KEY = "CV_DATA_DECRYPT"

// Here for reference
// const encrypt = (data, secret) => {
//     try {
//         return CryptoJS.AES.encrypt(data, secret).toString();
//     } catch(e) {
//         console.log("encrypt error", e.message);
//     }
// }

const decrypt = (secret, data) => {
    if (!secret || !data
        || (typeof data === "object" && Object.keys(data).length === 0)) return null;
    try{
        const bytes = CryptoJS.AES.decrypt(data, secret);
        return bytes.toString(CryptoJS.enc.Utf8);
    } catch(e) {
        console.log("Wrong password");
    }
}

const decryptCvData = async (password, data) => {
    if (!password) return null;

    const response = decrypt(password, data);
    if (!response) {
        return null;
    }

    try {
        data = {data: JSON.parse(response)};
    } catch(e) {
        console.log(e.message);
    }

    return data;
}

const executeWithSessionCache = async (key, aSyncFn) => {
    if (window.sessionStorage) {
        let results = window.sessionStorage.getItem(key) || null;
        if (!results) {
            results = await aSyncFn();
            if (results) {
                window.sessionStorage.setItem(key, JSON.stringify(results));
            }
            return results;
        }
        return JSON.parse(results);
    }

    return await aSyncFn();
}

const fetchCvDataFromServerAndCache = async () => {
    return await executeWithSessionCache(CV_DATA_KEY, async () => {
        return (await axios.get('../resume/data/cv_encrypted.json')).data;
    })
}

export const fetchCvData = async (password) => {
    const data = await fetchCvDataFromServerAndCache();
    if (!data) return null;
    return await executeWithSessionCache( CV_DATA_DECRYPT_KEY, () => decryptCvData(password, data.data));
}
