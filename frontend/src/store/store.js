import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/userSlice.js";
import courseSlice from "./slice/courseSlice.js";

export const store = configureStore({
    reducer: {
        user: userSlice,
        course: courseSlice
    }
})