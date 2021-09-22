import React, {FC} from "react";
import { useDispatch } from "react-redux";
import {Calendar} from "../components/Calendar";
import {getMonth} from "../redux/modules/calendar";

export const Dashboard: FC = () => {
    const dispatch = useDispatch()
    dispatch(getMonth())
    return (
        <div>
            <Calendar/>
        </div>
    )
}