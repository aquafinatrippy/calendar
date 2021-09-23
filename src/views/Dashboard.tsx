import React, {FC} from "react";
import { useDispatch } from "react-redux";
import {Calendar} from "../components/Calendar";
import {getMonth} from "../redux/modules/calendar";

export const Dashboard: FC = () => {
    const dispatch = useDispatch()
    dispatch(getMonth({
        "startDate": "2021-09-01",
        "endDate": "2021-09-30"
    }))
    return (
        <div>
            <Calendar/>
        </div>
    )
}