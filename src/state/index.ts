import { AuthResponse } from '@/types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit'


export interface initialStateTypes {
    isSideBarCollapsed: boolean;
    auth: AuthResponse | null;
    studentsIds: string[];
}

const initialState: initialStateTypes = {
    isSideBarCollapsed: false,
    auth: null,
    studentsIds: []
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
        setStudentsId: (state, action: PayloadAction<string[]>) => {
            state.studentsIds = action.payload
        },
        logout: (state) => {
            state.auth = null
            state.studentsIds = []
        }
    }
})

export const  {setIsSidebarCollapsed, setAuth, logout, setStudentsId} = globalSlice.actions;
export default globalSlice.reducer;