import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {User} from "../../dataTypes/type.ts";
import {fetchHandler} from "../../utils/fetchHandler.ts";

interface UserState {
    users: User[]
    loading: boolean
    error: string | null
}

const initialState: UserState = {
    users: [],
    loading: false,
    error: null
}

export const fetchUsers = createAsyncThunk(
    'users/fetch',
    async (_, thunkAPI) => {
        try {
            // Fetch public events
            const res = await fetchHandler('/user', { credentials: 'include', method: 'GET' })
            if (!res.ok) throw new Error("Failed to fetch users")
            return await res.json()
        } catch (err) {
            console.error(err);
            return thunkAPI.rejectWithValue("Something went wrong while fetching users.")
        }
    }
)

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchUsers.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false
                state.users = action.payload
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    }
})

export default userSlice.reducer
