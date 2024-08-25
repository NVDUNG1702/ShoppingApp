import axios from "axios";
import { axiosInstance } from "../../axiosInstance";
import { BASE_URL } from "../../untils";

const orderAPI = {
    checkOrder: async (uid, detail) => {
        try {
            const res = await axiosInstance.post(`${BASE_URL}api/cart/createCart`, { uid, detail });
            return res
        } catch (error) {
            console.log(error);

        }
    },
    addOrUpdate: async (productID, orderID, sizeID, quantity) => {
        try {
            // console.log(productID, orderID, sizeID, quantity);

            const res = await axiosInstance.post(`${BASE_URL}api/cart/addOrUpdateDetailCart`, { productID, orderID, sizeID, quantity });
            return res
        } catch (error) {

        }
    },

    getCartByID: async (uid, detail) => {
        try {
            const check = await axiosInstance.post(`${BASE_URL}api/cart/createCart`, { uid, detail });
            const { id } = check.data.data
            const data = check.data
            // console.log("id: ", id);
            if (id) {
                const res = await axiosInstance.get(`${BASE_URL}api/cart/getCartByID/${data.data.id}`);
                return res.data.data[0];
            }
        } catch (error) {
            console.log(error);

        }
    },
    pay: async (id, infoID) => {
        try {
            const res = await axiosInstance.post(`${BASE_URL}api/cart/pay`, { id, infoID });
            // console.log("status pay: ",res.status);

            return {
                status: res.status
            }
        } catch (error) {
            console.log("error: ", error);


        }

    },
    getAll: async () => {
        try {
            const res = await axiosInstance.post(`${BASE_URL}api/cart/getAll`);
            return res.data.data

        } catch (error) {
            console.log(error);

        }
    },
    cancleOrder: async (id) => {
        try {
            const res = await axiosInstance.put(`${BASE_URL}api/cart/cancelOrder`, { id });
            return res.status
        } catch (error) {
            console.log(error);

        }
    }
}

export { orderAPI }