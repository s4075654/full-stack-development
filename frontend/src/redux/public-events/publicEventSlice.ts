// publicEventSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Event } from '../../../dataTypes/type'

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
            const res = await fetch('http://localhost:58888/event?public=true', { credentials: 'include'})
            if (!res.ok) throw new Error("Failed to fetch public events")

            return res.json()
        } catch (err) {
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
