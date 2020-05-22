import axios from 'axios';
import qs from 'qs'

let base = '/api';

// export const requestLogin = params => { return axios.post(`/api/admin/login`, qs.stringify(params)).then(res=>{console.log(res); return res.data}); };
export const requestLogin = params => { return axios.post(base+`/admin/login`, qs.stringify(params)).then(res=>{console.log(res); return res.data}); };

export const getUserListPage = params => { return axios.get(base+`/admin/list`); };

export const editUser = params => { return axios.post(base+`/admin/edit`, qs.stringify(params)); };

export const addUser = params => { return axios.post(base+`/admin/add`, qs.stringify(params)); };

export const removeUser = params => { return axios.get(base+`/admin/delete`, { params: params }); };

export const smtp = params => { return axios.get(base+`/admin/smtp`, { params: params }); };

export const pop3 = params => { return axios.get(base+`/admin/pop3`, { params: params }); };

export const filter = params => { return axios.get(base+`/admin/filter`, { params: params }); };

export const getDiaries = params => { return axios.get(base+`/admin/diary`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

