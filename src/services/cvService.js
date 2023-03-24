import axios from "axios"

export const fetchCvData = async () => {
    return (await axios.get('../resume/data/cv_encrypted.json')).data;
}
