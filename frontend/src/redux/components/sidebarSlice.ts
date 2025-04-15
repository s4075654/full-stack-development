import { createSlice } from "@reduxjs/toolkit"

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: { isOpen: true },
    reducers: {
        toggle: state => {
            state.isOpen = !state.isOpen
        },
        setOpen: (state, action) => {
            state.isOpen = action.payload
        }
    }
})

export const { toggle, setOpen } = sidebarSlice.actions
export default sidebarSlice.reducer