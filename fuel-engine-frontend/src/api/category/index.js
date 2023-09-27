import axios from "axios";

import { API_URL } from '../../utils/constant';

export const createCategory = async (data) => {
    const categoryData = await axios.post(`${API_URL}/category`, data,
        {
            headers: {
                Authorization: `bearer ${localStorage.getItem('token')}`
            }
        })
    const category = categoryData.data;
    return category;

}
export const updateCategory = async (id, data) => {
    const categoryData = await axios.put(`${API_URL}/category/${id}`, data,
        {
            headers: {
                Authorization: `bearer ${localStorage.getItem('token')}`
            }
        })
    const category = categoryData.data;
    return category;
}
export const deleteCategoy = async (id, data) => {
    const categoryData = await axios.delete(`${API_URL}/category/${id}`, {
        headers: {
            Authorization: `bearer ${localStorage.getItem('token')}`
        }
    })
    const category = categoryData.data;
    return category;
}
export const getCategoryById = async (id) => {
    const categoryData = await axios.get(`${API_URL}/category/${id}`, {
        headers: {
            Authorization: `bearer ${localStorage.getItem('token')}`
        }
    })
    const category = categoryData.data;
    return category;
}
export const getCategoryList = async (data) => {
    const categoryData = await axios.get(`${API_URL}/category/list`, {
        headers: {
            Authorization: `bearer ${localStorage.getItem('token')}`
        }
    })
    const categoryList = categoryData.data;
    return categoryList;

}