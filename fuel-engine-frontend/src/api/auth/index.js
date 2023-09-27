import axios from "axios";

import { API_URL } from '../../utils/constant';

export const profile = async () => {

  return {

    displayName: 'Admin',
    email: 'demo@minimals.cc',
    photoURL: '/assets/images/avatars/avatar_default.jpg',
  }
}
export const login = async (data) => {
  const loginData = await axios.post(`${API_URL}/login`, data);

  return loginData.data;

}