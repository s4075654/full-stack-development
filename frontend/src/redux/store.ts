import {configureStore} from "@reduxjs/toolkit";
import authReducer from './auth/authSlice.ts'
import sidebarReducer from "./components/sidebarSlice.ts";
import publicEventReducer from "./event/publicEventSlice.ts";
import singleEventReducer from "./event/singleEventSlice.ts";
import ownedEventsReducer from "./event/ownedEventsSlice.ts";
import joinedEventReducer from "./event/joinedEventSlice.ts";
import sentRequestsReducer from "./RSVP/sentRequestsSlice.ts";
import receivedInvitationsReducer from "./RSVP/receivedInvitationsSlice.ts";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        sidebar: sidebarReducer,
        publicEvent: publicEventReducer,
        singleEvent: singleEventReducer,
        ownedEvents: ownedEventsReducer,
        joinedEvents: joinedEventReducer,
        sentRequests: sentRequestsReducer,
        receivedInvitations: receivedInvitationsReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;