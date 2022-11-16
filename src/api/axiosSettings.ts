import axios from 'axios';
import LS from '../utils/localStorage';
import envVariables from '../envVariables';

const token = LS.load(envVariables.tokenLSName);

axios.defaults.baseURL = 'http://localhost:5050';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

export default axios;
