import axios from 'axios';
import {TOKEN_KEY} from "./index";

const {REACT_APP_API_BASE} = process.env;

const token = localStorage.getItem(TOKEN_KEY);
const headers = {};

if (token) {
    headers.auth = token;
}
export default axios.create({
    baseURL: `${REACT_APP_API_BASE}/`,
    headers
});

export const AuthHeader = {
    'auth': localStorage.getItem(TOKEN_KEY)
}