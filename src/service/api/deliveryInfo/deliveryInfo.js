import { axiosInstance } from "../../axiosInstance"
import { BASE_URL } from "../../untils"

const deliveryInfoAPI = {
    getAll: async (id) => {
        try {
            // console.log(id);

            const res = await axiosInstance.get(`${BASE_URL}api/infoNH/getByUid/${id}`)
            // console.log(res.data.data);
            return {
                status: res.status,
                data: res.data.data
            }
        } catch (error) {
            console.log(error);

        }
    },
    add: async (data) => {
        try {
            const res = await axiosInstance.post(`${BASE_URL}api/infoNH/add`, { ...data })
            return {
                status: res.status,
                data: res.data.data
            }
        } catch (error) {
            console.log(error);

        }
    },
    delete: async (id) => {
        try {
            const res = await axiosInstance.post(`${BASE_URL}api/infoNH/delete/${id}`);
            return res
        } catch (error) {
            console.log(error);
            
        }
    }
}

export { deliveryInfoAPI }