import axios from "axios"

const G_NAME_ID = "entry.781292045"
const G_EMAIL_ID = "entry.1363004477"
const G_SUBJECT_ID = "entry.2140901298"
const G_MESSAGE_ID = "entry.905280267"
const PROXY = 'https://cors-anywhere.herokuapp.com/'
const G_FORM_URL = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSeeSuJ6Fv6TEZSfMp_O3odrMa3FHCxKy7p0L-VUjncXF2w-OQ/formResponse"

export const submitForm = async (data) => {
    const formData = new FormData()
    formData.append(G_NAME_ID, data.name)
    formData.append(G_EMAIL_ID, data.email)
    formData.append(G_SUBJECT_ID, data.subject)
    formData.append(G_MESSAGE_ID, data.message)

    return await axios.post(PROXY + G_FORM_URL, formData)
}


