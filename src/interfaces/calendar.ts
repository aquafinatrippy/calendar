export interface Calendar{
    isFetching: boolean,
    error: null | string,
    holidays: []
}

export interface CalendarSettings{
    startDate: string;
    endDate: string
}