import { createSelector } from "@reduxjs/toolkit";

export const userLoginSelector = (state) => state.authSlice.userLogin;