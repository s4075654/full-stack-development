// publicEventSlice.ts
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {Event} from "../../dataTypes/type.ts";

interface EventState {
    events: Event[]
    loading: boolean
    error: string | null
}

const initialState: EventState = {
    events: [],
    loading: false,
    error: null
}

export const fetchPublicEvents = createAsyncThunk(
    'publicEvents/fetch',
    async (_, thunkAPI) => {
        try {
            // Fetch public events
            const res = await fetch('/event', { credentials: 'include', method: 'GET' })
            if (!res.ok) throw new Error("Failed to fetch public events")
            return await res.json()
        } catch (err) {
            console.error(err);
            return thunkAPI.rejectWithValue("Something went wrong while fetching public events.")
        }
    }
)

const publicEventSlice = createSlice({
    name: 'publicEvents',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchPublicEvents.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchPublicEvents.fulfilled, (state, action) => {
                state.loading = false
                state.events = action.payload
            })
            .addCase(fetchPublicEvents.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    }
})

export default publicEventSlice.reducer
