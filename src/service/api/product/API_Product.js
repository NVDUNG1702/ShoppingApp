import axios from "axios";
import { axiosInstance } from "../../axiosInstance";
import { BASE_URL } from "../../untils";


const ProductAPI = {
    getAllProduct: async (setLoading) => {
        try {
            setLoading(true)
            const response = await axios.get(`${BASE_URL}api/product/getall`);
            return response
        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false)
        }
    },

    getByID: async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}api/product/getbyid/${id}`)
            const sizeResponse = await axios.get(`${BASE_URL}api/product/getSizeProductById/${id}`)
            return {
                resProduct: response,
                resSize: sizeResponse
            }
        } catch (error) {
            console.log(error);

        } finally {
        }
    },
    checkFavorite: async (idProduct, uid) => {
        try {
            const response = await axios.get()
        } catch (error) {

        }
    },

    checkFavorite: async (data) => {
        try {
            const { uid, productID } = data
            const res = await axiosInstance.post(`${BASE_URL}api/product/checkFavorite`, { uid, productID });
            return res;
        } catch (error) {
            console.log("error: ", error)

        }
    },
    addOrDelete: async (data) => {
        try {
            const { uid, productID } = data
            const res = await axiosInstance.post(`${BASE_URL}api/product/addOrDeleteFavorite`, { uid, productID });
            return res;
        } catch (error) {
            console.log("error: ", error)

        }
    },
    getFavoriteProduct: async (id) => {
        try {
            const res = await axiosInstance.get(`${BASE_URL}api/product/favorite/${id}`);
            
            return res
        } catch (error) {
            console.log(error);

        }
    },
    deleteFavorite: async (id) => {
        try {
            const res = await axiosInstance.delete(`${BASE_URL}api/product/deleteFavorite/${id}`);
            return res.data;
        } catch (error) {
            console.log(error);

        }
    }
}

export { ProductAPI }