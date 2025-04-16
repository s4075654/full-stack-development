import {configureStore} from "@reduxjs/toolkit";
import authReducer from './auth/authSlice.ts'
import sidebarReducer from "./components/sidebarSlice.ts";
import publicEventReducer from "./public-events/publicEventSlice.ts";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        sidebar: sidebarReducer,
        publicEvent: publicEventReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;