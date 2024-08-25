import AsyncStorage from "@react-native-async-storage/async-storage";



export const storage = {
    saveData: async (key, data) => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(data)); // Chuyển đổi dữ liệu thành chuỗi JSON trước khi lưu
        } catch (error) {
            console.error(`Failed to save ${key}:`, error);
        }
    },
    getData: async (key) => {
        try {
            const data = await AsyncStorage.getItem(key);
            return data != null ? JSON.parse(data) : null; // Chuyển đổi chuỗi JSON thành dữ liệu ban đầu
        } catch (error) {
            console.error(`Failed to get ${key}:`, error);
        }
    },
    clearData: async (key) => {
        try {
            await AsyncStorage.removeItem(key); // Sử dụng removeItem để xóa dữ liệu
        } catch (error) {
            console.error(`Failed to clear ${key}:`, error);
        }
    }
}


