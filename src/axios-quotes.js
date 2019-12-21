import axios from 'axios';

const quote = axios.create({
    baseURL: 'https://quote-app-exam.firebaseio.com/'
});

export default quote;