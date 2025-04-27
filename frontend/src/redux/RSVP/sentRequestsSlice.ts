import {Request} from "../../dataTypes/type.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchHandler} from "../../utils/fetchHandler.ts";

interface SentRequestState {
    requests: Request[],
    loading: boolean,
    error: string | null
}

const initialState: SentRequestState = {
    requests: [],
    loading: false,
    error: null
}

export const fetchSentRequests = createAsyncThunk(
    'sentRequests/fetch',
    async (_, thunkAPI) => {
        try {
            const res = await fetchHandler(`/request`, { credentials: 'include', method: 'GET' }) //errornous code
            return await res.json()
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue("Something went wrong while fetching sent requests.")
        }
    }
)

const sentRequestsSlice = createSlice({
    name: 'sentRequests',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchSentRequests.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchSentRequests.fulfilled, (state, action) => {
                state.loading = false
                state.requests = action.payload
            })
            .addCase(fetchSentRequests.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    }
})

export default sentRequestsSlice.reducer;