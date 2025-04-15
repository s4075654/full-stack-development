import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const login = createAsyncThunk(
    "auth/login",
    async ({username, password}: {username: string; password: string}, thunkAPI) => {
        try {
            const response = await fetch("/log/in", {
                method: "POST",
                headers: {
                    m_sUsername: username,
                    m_sPassword: password,
                },
                credentials: "include",
            })
            if (response.status !== 200) {
                throw new Error(response.statusText);
            }

            return true
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response?.status);
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        error: null
    },
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state) => {
                state.isAuthenticated = true
                state.error = null
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.payload as number
            })
    },
})

export const {logout} = authSlice.actions
export default authSlice.reducer