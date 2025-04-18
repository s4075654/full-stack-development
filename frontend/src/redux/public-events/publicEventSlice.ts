// publicEventSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { EventCard } from '../../dataTypes/type'

interface EventState {
    events: EventCard[]
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
            const res = await fetch('/event?public=true', { credentials: 'include', method: 'GET' })
            if (!res.ok) throw new Error("Failed to fetch public events")
            const events = await res.json()

            // Fetch user data (organizer details) for each event
            const eventsWithUserDetails = await Promise.all(
                events.map(async (event: EventCard) => {
                    const userRes = await fetch(`/users/${event.organiser}`, { credentials: 'include' })
                    if (!userRes.ok) throw new Error("Failed to fetch user data for event organizer")
                    const user = await userRes.json()

                    // Return event with user data
                    return {
                        ...event,
                        userName: user.username,
                        avatar: user.avatarUrl
                    }
                })
            )

            return eventsWithUserDetails
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
