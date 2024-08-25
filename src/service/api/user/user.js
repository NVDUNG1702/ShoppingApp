import { axiosInstance } from "../../axiosInstance";
import { BASE_URL } from "../../untils";

const userAPI = {
    senOTP: async (email) => {
        try {
            const res = await axiosInstance.post(`${BASE_URL}api/users/senOTP`, { email });
            // console.log("status: ",res.status);

            if (res.status === 200) {
                // console.log('OTP sent successfully:', res.data);
                return res.status; // Trả về dữ liệu từ phản hồi
            } else {
                console.error('Failed to send OTP, status code:', res.status);
                return null;
            }
        } catch (error) {
            if (error.response) {
                console.error('Error response from server:', error.response.data);
            } else if (error.request) {
                console.error('No response received from server:', error.request);
            } else {
                console.error('Error creating request:', error.message);
            }

            return null;

        }
    },

    update: async (fullName, email, phoneNumber, mailSen, otp) => {
        try {
            // console.log(fullName, email, phoneNumber, mailSen, otp);

            const res = await axiosInstance.put(`${BASE_URL}api/users/update`, { fullName, email, phoneNumber, mailSen, otp });
            // console.log(res);

            return res;

        } catch (error) {
            console.log(error);
        }

    },
    uploadImage: async (formData) => {
        try {


            const res = await axiosInstance.post(`${BASE_URL}api/users/uploadAvatar`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            if (res.status == 201) {
                console.log(res.data);

                return res.data
            }
            return false
        } catch (error) {
            console.log(error);
            return false
        }
    }
}

export { userAPI }