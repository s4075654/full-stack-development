import {Invitation} from "../../dataTypes/type.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchHandler} from "../../utils/fetchHandler.ts";

interface ReceivedRequests {
    invitations: Invitation[],
    loading: boolean,
    error: string | null
}

const initialState: ReceivedRequests = {
    invitations: [],
    loading: false,
    error: null
}

export const fetchReceivedInvitations = createAsyncThunk(
    'receivedRequests/fetch',
    async (_, thunkAPI) => {
        try {
            const res = await fetchHandler(`/invitation/received`, { credentials: 'include', method: 'GET' })
            return await res.json()
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue("Something went wrong while fetching received invitations.")
        }
    }
)

const receivedInvitationsSlice = createSlice({
    name: 'receivedRequests',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchReceivedInvitations.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchReceivedInvitations.fulfilled, (state, action) => {
                state.loading = false
                state.invitations = action.payload
            })
            .addCase(fetchReceivedInvitations.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    }
})

export default receivedInvitationsSlice.reducer;