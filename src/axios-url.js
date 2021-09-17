import * as axios from 'axios'

const instance = axios.create({
    baseURL: 'https://core-5f8c5.firebaseio.com/'
});

export default instance;