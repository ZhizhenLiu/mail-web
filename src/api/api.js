import axios from 'axios';

let base = 'api';

export const requestLogin = params => { return axios.post(`/api/admin/login`, params).then(res=>{console.log(res); return res.data}); };

export const getUserListPage = params => { return axios.get(`/api/admin/list`, { params: params }); };

export const editUser = params => { return axios.get(`/api/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`/api/admin/add`, { params: params }); };

export const removeUser = params => { return axios.get(`/api/admin/delete`, { params: params }); };

export const smtp = params => { return axios.get(`/api/admin/smtp`, { params: params }); };

export const pop3 = params => { return axios.get(`/api/admin/pop3`, { params: params }); };

export const filter = params => { return axios.get(`/api/admin/filter`, { params: params }); };

export const getDiaries = params => { return axios.get(`/api/admin/diary`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

