import axios from 'axios';

// import { axiosInstance } from "../config";
const { storage } = require('../../helper/storage');
const { axiosInstance } = require('../axiosInstance');

export const IP = '192.168.1.10'

const auth = {
    register: async (data, setLoading, cb) => {
        setLoading(true);
        setTimeout(async () => {
            try {
                const response = await axiosInstance.post('/api/users/register', data);
                // console.log(response.data);
                cb(response);
            } catch (error) {
                console.log("Error: ", error);
            } finally {
                setLoading(false);
            }
        }, 2000);
    },

    login: async (data, setLoading, cb) => {
        setLoading(true);
        setTimeout(async () => {
            try {
                const response = await axiosInstance.post('/api/users/login', data);
                cb(response);
            } catch (error) {
                console.log("Error Login: ", error);
            } finally {
                setLoading(false);
            }
        }, 2000)
    },
    loginWithToken: async (setLoading) => {
        setLoading(true);
        try {
            const response = await axiosInstance.post('/api/users/login_with_token')

            const data = await response.data;
            if (response.status == 200) {
                return data.user;
            } else {
                return false
            }

        } catch (error) {
            console.log(error);
            return false;
        } finally {
            setLoading(false);
        }
    },

    checkAvatar: async (linkUrl) => {
        try {
            const res = await axios.get(`${linkUrl}`, {
                responseType: 'arraybuffer'  // Đảm bảo nhận dữ liệu dưới dạng nhị phân
            });

            if (res.status == 200) {
                return linkUrl;

            }
            return false
        } catch (error) {
            // console.log("error", error);
            return false

        }
    },
    
}

export { auth };