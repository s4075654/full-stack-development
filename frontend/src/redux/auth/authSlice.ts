import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const login = createAsyncThunk<number,                                // return type (success)
    { username: string; password: string }, // argument type
    { rejectValue: number }>(
    "auth/login",
    async ({username, password}: {username: string; password: string}, thunkAPI) => {
            const response = await fetch("/log/in", {
                method: "POST",
                headers: {
                    m_sUsername: username,
                    m_sPassword: password,
                },
                credentials: "include",
            })
            if (response.status !== 200) {
		        return thunkAPI.rejectWithValue(response.status)
            }

            return response.status
    }
)
export const fetchCurrentUser = createAsyncThunk(
    "auth/fetchCurrentUser",
    async () => {
      const res = await fetch("/user/me", { credentials: "include" });
      if (!res.ok) throw new Error("Not authenticated");
      return await res.json();
    }
  )

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        error: null as number | null,
        user: null,
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
            .addCase(login.rejected, (state, m_oAction) => {
                state.error = m_oAction.payload ?? 400
		        state.isAuthenticated = false
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthenticated = true;
              })
    },
})

export const {logout} = authSlice.actions
export default authSlice.reducer

