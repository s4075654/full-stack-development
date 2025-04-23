import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Event} from "../../dataTypes/type.ts";
import {fetchHandler} from "../../utils/fetchHandler.ts";

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
            const res = await fetchHandler(`/event?_id=${_id}`, { credentials: 'include', method: 'GET' })
            if (!res.ok) throw new Error("Failed to fetch public events")
            return (await res.json())[0]
        } catch (err) {
            console.error(err);
            return thunkAPI.rejectWithValue("Something went wrong while fetching public events.")
        }
    }
)
export const updateEvent = createAsyncThunk<
  Event,
  { id: string; eventName: string; eventLocation: string; eventDescription: string },
  { rejectValue: string }
>(
  'singleEvent/update',
  async ({ id, eventName, eventLocation, eventDescription }, thunkAPI) => {
    try {
      // PUT at /event/:id
      const res = await fetchHandler(`/event/${id}`, {
        credentials: 'include',
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ eventName, eventLocation, eventDescription }),
      });
   
      if (!res.ok) throw new Error('Failed to update event');
   
      return (await res.json()) as Event;
    } catch (err) {
      console.error(err);
      return thunkAPI.rejectWithValue('Update failed.');
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
        
        builder
        .addCase(updateEvent.pending, (state) => {
                state.status = 'loading';
                state.error = null;
        })
        .addCase(updateEvent.fulfilled, (state, action: PayloadAction<Event>) => {
                state.status = 'succeeded';
                state.event = action.payload; // overwrite with updated event
        })
        .addCase(updateEvent.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
        });    
        }
})

export default singleEventSlice.reducer
