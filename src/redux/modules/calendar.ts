import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";
import {CalendarSettings} from "../../interfaces/calendar";


const initialState = {
    isFetching: false,
    error:  '',
    holidays: [],
    start: null,
    end: null
};

export const getMonth = createAsyncThunk(
    'calendar/getMonth',
    async ({startDate, endDate}: CalendarSettings, thunkAPI) => {
        try {
            const res = await axios.post("https://wozmx9dh26.execute-api.eu-west-1.amazonaws.com/api/holidays", {
                "apiKey": "ac258f2b29d09194ce6aa01a0438a8e5",
                "startDate": startDate,
                "endDate": endDate})
            if (res.status === 200) return {data: res.data, start: startDate, end: endDate}
        }catch (e){
            return thunkAPI.rejectWithValue((e as any).response.data.reason)
        }


    }
)


export const calendarSlice = createSlice({
    name: "calendar",
    initialState,
    reducers: {},
    extraReducers: {
        [getMonth.fulfilled.type]: (state, {payload}) => {
            state.isFetching = false
            state.holidays = payload.data.holidays
            state.start = payload.start
            state.end = payload.end
        },
        [getMonth.rejected.type]: (state, {payload}) => {
            state.isFetching = true
            state.error = payload
        },
        [getMonth.pending.type]: (state) => {
            state.isFetching = true
        }
    }
})

export const calendarReducer = calendarSlice.reducer