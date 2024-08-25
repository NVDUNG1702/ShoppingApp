import axios from "axios"
import { storage } from "../helper/storage";
import { BASE_URL } from "./untils";


const axiosInstance = axios.create({
    baseURL: BASE_URL,
    // timeout: 4000,
    headers: {
        "Content-Type": 'application/json'
    }
});


const refreshToken = async () => {
    const refToken = await storage.getData('refreshToken');
    const response = await axiosInstance.post('/api/users/refresh_token', { refreshToken: refToken },);

    return response;
}

axiosInstance.interceptors.request.use(
    async (config) => {

        const token = await storage.getData('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
            // console.log(token);
        };


        return config;
    },
    error => {
        console.log("error request: ", error);
        
        Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    response => response,
    async (err) => {
        const originalRequest = err.config;
        const { name } = err.response?.data || {};
        const { status } = err.response || {};
        console.log('status: ', status, 'name: ', err);
        // Kiểm tra xem có phải lỗi do token hết hạn không
        if (status == 401 && name == 'TokenExpiredError') {
            // console.log('log2');
            originalRequest._retry = true;
            try {
                const data = await refreshToken();
                // console.log("data rf: ", await data);
                const { token, timeExpired } = data.data?.ACCESS_TOKEN; // Lấy accessToken từ phản hồi
                if (token) {
                    // Cập nhật header Authorization và lưu token mới
                    axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
                    await storage.saveData('accessToken', token);
                    await storage.saveData('timeExpired_accessToken', timeExpired);

                    // Cập nhật header của yêu cầu gốc và gửi lại
                    originalRequest.headers['Authorization'] = `Bearer ${token}`;
                    return axiosInstance(originalRequest);
                }
            } catch (refreshError) {
                // console.error('Error refreshing token:', refreshError);
                // Nếu có lỗi khi làm mới token, bạn có thể trả về phản hồi lỗi hoặc xử lý thêm
                return Promise.resolve({ data: { status: 'error', message: 'Unable to refresh token' } });
            }
        }

        // Trả về lỗi gốc nếu không phải lỗi token hết hạn hoặc đã retry rồi
        console.log("Error response: ", err);
        return Promise.reject(err);
    }
);



export { axiosInstance }