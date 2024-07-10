import axios from 'axios';
import { Buffer } from 'buffer';
export const urlBase = 'https://api.repuestosangel.net/api/';
export const urlBaseAsset = 'https://api.repuestosangel.net/';
export const http = () => {
    let token = "";
    if(localStorage.getItem('token') != null){  /* si el token existe iniciaraa y si no nos votara */
        token = Buffer.from(localStorage.getItem('token'), 'base64').toString('ascii');  /* Lo desincriptamos  */
    }
  
    const interceptor = axios.create({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        timeout: 15000,
    });
    interceptor.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
      }, function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        console.log(error);
        if (error.response.status == 401) {
            localStorage.clear();
            window.location.href = '/login';
        }
        return Promise.reject(error);
      });
    return interceptor; /*  */
}
export const httpAsset = () => {
    let token = "";
    if(localStorage.getItem('token') != null){  /* si el token existe iniciaraa y si no nos votara */
        token = Buffer.from(localStorage.getItem('token'), 'base64').toString('ascii');  /* Lo desincriptamos  */
    }
  
    const interceptor = axios.create({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        },
        timeout: 15000,
    });
    interceptor.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
      }, function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        console.log(error);
        if (error.response.status == 401) {
            localStorage.clear();
            window.location.href = '/login';
        }
        return Promise.reject(error);
      });
    return interceptor; /*  */
}