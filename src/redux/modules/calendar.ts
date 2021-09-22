import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";


const initialState = {
    isFetching: false,
    error: null,
    holidays: []
};

export const getMonth = createAsyncThunk(
    'calendar/getMonth',
    async (arg: void, thunkAPI) => {
        const res = await axios.post("https://wozmx9dh26.execute-api.eu-west-1.amazonaws.com/api/holidays", {
            "apiKey": "ac258f2b29d09194ce6aa01a0438a8e5",
            "startDate": "2021-09-01",
            "endDate": "2021-09-30"})
        if (res.status === 200) return res.data
        return thunkAPI.rejectWithValue(res)
    }
)


export const calendarSlice = createSlice({
    name: "calendar",
    initialState,
    reducers: {},
    extraReducers: {
        [getMonth.fulfilled.type]: (state, {payload}) => {
            state.isFetching = false
            state.holidays = payload.holidays
        },
        [getMonth.rejected.type]: (state, {payload}) => {
            state.isFetching = false
            state.error = payload.error
        },
        [getMonth.pending.type]: (state) => {
            state.isFetching = true
        }
    }
})

export const calendarReducer = calendarSlice.reducer