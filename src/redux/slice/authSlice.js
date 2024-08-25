import { createSlice } from "@reduxjs/toolkit";


export const authSlice = createSlice({
    name: 'authSlice',
    initialState: {
        userLogin: {}
    },
    reducers: {

        setUserLogin: (state, action) => {
            state.userLogin = action.payload;
        },
        clearUserLogin: (state, action) => {
            state.userLogin = {}
        },
        update: (state, action) => {
            // console.log(action.payload);
            state.userLogin = action.payload

        }
    }
})