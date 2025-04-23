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

export const fetchOwnedEvents = createAsyncThunk(
    'ownedEvents/fetch',
    async (_, thunkAPI) => {
        try {
            // Fetch public events
            const res = await fetchHandler(`/event/owned`, { credentials: 'include', method: 'GET' })
            if (!res.ok) throw new Error("Failed to fetch organiser's events")
            return await res.json()
        } catch (err) {
            console.error(err);
            return thunkAPI.rejectWithValue("Something went wrong while fetching organiser's events.")
        }
    }
)

const ownedEventsSlice = createSlice({
    name: 'ownedEvents',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchOwnedEvents.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchOwnedEvents.fulfilled, (state, action) => {
                state.loading = false
                state.events = action.payload
            })
            .addCase(fetchOwnedEvents.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    }
})

export default ownedEventsSlice.reducer
