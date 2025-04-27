import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchHandler} from "../../utils/fetchHandler.ts";
import {Setting} from "../../dataTypes/type.ts";

export const fetchGlobalSetting = createAsyncThunk(
    'settings/fetchGlobalSetting',
    async (_, thunkAPI) => {
        try {
            const res = await fetchHandler(`/setting`, {credentials: "include", method: "GET"})
            if (!res.ok) {
                const errorText = await res.text();
                return thunkAPI.rejectWithValue(errorText || 'Failed to fetch settings');
            }
            return await res.json()
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue(error);
        }
    }
)

interface SettingState {
    settings: Setting | null;
    loading: boolean;
    error: string | null;
}

const initialState: SettingState = {
    settings: null,
    loading: false,
    error: null
}

const globalSettingSlice = createSlice({
    name: 'globalSetting',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchGlobalSetting.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGlobalSetting.fulfilled, (state, action) => {
                state.loading = false;
                state.settings = action.payload;
            })
            .addCase(fetchGlobalSetting.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string; // Assign error message here
            });
    }
});

export default globalSettingSlice.reducer;