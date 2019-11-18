import axios from 'axios';

const API_ROOT = '' //set the API base

class ApiService {
    constructor() {
        this.api = axios.create({
            baseURL: API_ROOT,
            withCredentials: true
        });
    }
    static setHeaders(method, requestUrl) {
        let headers = {};
        if (method !== 'get' || method !== 'delete') {
            headers = { Accept: 'application/json', 'Content-Type': 'application/json', 'withCredentials': true, 'Authorization': 'none' };
        } else
            headers = { 'withCredentials': true, 'Authorization': 'none' }
        return headers;
    }

    static _rejectOnError(err) {
        const fallbackError = 'Something has gone wrong. Please try again later.';
        if (!err || !err.response || !err.response.data || !err.response.data.message) return Promise.reject(fallbackError);

        const error = (err.response.data.message === '') ? fallbackError : err.response.data.message;
        return Promise.reject(error);
    }

    _get(url) {
        return this.api({
            url,
            headers: ApiService.setHeaders('get', url),
        }).then(r => r.data);
    }

    _delete(url, data = null) {
        return this.api({
            url,
            method: 'delete',
            headers: ApiService.setHeaders('delete', url),
            data: JSON.stringify(data),
        }).then(r => r.data);
    }

    _post(url, data) {
        return this.api({
            url,
            method: 'post',
            headers: ApiService.setHeaders('post', url),
            data: JSON.stringify(data),
        }).then(r => r.data);
    }

    _formPost(url, data) {
        return this.api({
            url,
            method: 'post',
            headers: ApiService.setHeaders('post', url),
            data: { password: data },
        }).then(r => r.data);
    }

    _put(url, data) {
        return this.api({
            url,
            method: 'put',
            headers: ApiService.setHeaders('put', url),
            data: JSON.stringify(data),
        }).then(r => r.data);
    }
}

export default ApiService;
