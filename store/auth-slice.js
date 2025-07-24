import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: false,
    },

    reducers: {
        userLogin (state, action){
            state.isAuthenticated = !state.isAuthenticated;
        },

        userLogout(state, action){
            state.isAuthenticated= !state.isAuthenticated;
        }
    }

});

export const authActions = authSlice.actions;
export default authSlice;