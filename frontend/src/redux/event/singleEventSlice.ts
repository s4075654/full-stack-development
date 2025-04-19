import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {Event} from "../../dataTypes/type.ts";

interface SingleEventState {
    event: Event | null
    loading: boolean
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null
}

const initialState: SingleEventState = {
    event: null,
    loading: false,
    status: 'idle',
    error: null
}

export const fetchSingleEvent = createAsyncThunk(
    'singleEvent/fetch',
    async (_id: string, thunkAPI) => {
        try {
            // Fetch public events
            const res = await fetch(`/event?_id=${_id}`, { credentials: 'include', method: 'GET' })
            if (!res.ok) throw new Error("Failed to fetch public events")
            return (await res.json())[0]
        } catch (err) {
            console.error(err);
            return thunkAPI.rejectWithValue("Something went wrong while fetching public events.")
        }
    }
)

const singleEventSlice = createSlice({
    name: 'singleEvent',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchSingleEvent.pending, state => {
                state.status = 'loading';
                state.loading = true
                state.error = null
            })
            .addCase(fetchSingleEvent.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.loading = false
                state.event = action.payload
            })
            .addCase(fetchSingleEvent.rejected, (state, action) => {
                state.status = 'failed';
                state.loading = false
                state.error = action.payload as string
            })
    }
})

export default singleEventSlice.reducer
