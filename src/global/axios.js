import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://efreshgo.com/app/api' //'https://efreshgo.finestudiotest.com/api/' // process.env.SERVER_URL_ADMIN ||
});

export default instance;
