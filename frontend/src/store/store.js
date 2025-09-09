import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/userSlice.js";
import courseSlice from "./slice/courseSlice.js";
import lectureSlice from "./slice/lectureSlice.js";

export const store = configureStore({
    reducer: {
        user: userSlice,
        course: courseSlice,
        lecture: lectureSlice
    }
})