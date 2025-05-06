import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {Event} from "../../dataTypes/type.ts";
import {fetchHandler} from "../../utils/fetchHandler.ts";

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

export const fetchEvents = createAsyncThunk(
    'events/fetch',
    async (_, thunkAPI) => {
        try {
            // Fetch public events
            const res = await fetchHandler('/event', { credentials: 'include', method: 'GET' })
            if (!res.ok) throw new Error("Failed to fetch events")
            return await res.json()
        } catch (err) {
            console.error(err);
            return thunkAPI.rejectWithValue("Something went wrong while fetching events.")
        }
    }
)

const eventSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchEvents.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchEvents.fulfilled, (state, action) => {
                state.loading = false
                state.events = action.payload
            })
            .addCase(fetchEvents.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    }
})


export default eventSlice.reducer