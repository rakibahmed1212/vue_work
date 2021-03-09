import axios from "axios";
class AppAxios {
    header(headers = '') {
        if (!localStorage.getItem('_userToken')) {
            localStorage.setItem('_userToken', '')
        }
        return axios.create({
            baseURL: 'http://localhost:8000/',
            timeout: 10000,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('_userToken'),
                ...headers
            },
        })
    }
}
export default new AppAxios();
