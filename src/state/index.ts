import { AuthResponse } from '@/types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface initialStateTypes {
    isSideBarCollapsed: boolean;
    auth: AuthResponse | null;
}

const initialState: initialStateTypes = {
    isSideBarCollapsed: false,
    auth: null
}

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setIsSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
            state.isSideBarCollapsed = action.payload
        },
        setAuth: (state, action: PayloadAction<AuthResponse | null>) => {
            state.auth = action.payload
        },
        logout: (state) => {
            state.auth = null}
    }
})

export const  {setIsSidebarCollapsed, setAuth, logout} = globalSlice.actions;
export default globalSlice.reducer;