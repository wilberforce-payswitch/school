import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface initialStateTypes {
    isSideBarCollapsed: boolean;
}

const initialState: initialStateTypes = {
    isSideBarCollapsed: false
}

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setIsSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
            state.isSideBarCollapsed = action.payload
        }
    }
})

export const  {setIsSidebarCollapsed} = globalSlice.actions;
export default globalSlice.reducer;