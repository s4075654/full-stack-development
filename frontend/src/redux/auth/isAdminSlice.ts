import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

interface AdminState {
    isAdmin: boolean | null; // null is not checked yet
    loading: boolean;
    error: string | null;
}

export const fetchIsAdmin = createAsyncThunk(
    "auth/fetchIsAdmin",
    async () => {
        const res = await fetch('/user/is-admin', {
            method: "GET",
            credentials: "include"
        });
        const result = await res.json();
        return result.admin;
    }
)

const initialState: AdminState = {
    isAdmin: null,
    loading: false,
    error: null,
};

const isAdminSlice = createSlice({
    name: 'isAdmin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchIsAdmin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchIsAdmin.fulfilled, (state, action) => {
                state.isAdmin = action.payload;
                state.loading = false;
            })
            .addCase(fetchIsAdmin.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            });
    }
});

export default isAdminSlice.reducer;