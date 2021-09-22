import React, {FC, useState, useEffect} from "react";
import './calendar.scss'
import moment from "moment";

export const Calendar: FC = () => {
    const [startDate, setStartDate] = useState(moment().startOf("week"))
    const [dates, setDates] = useState<any>([])

    useEffect(() => {
        const tempDates = []
        for (let i = 0; i < 7; i++) {
            tempDates.push(moment(startDate).add(i, "days"))
        }
        setDates(tempDates)
    }, [startDate])

    const weekBack = () => {
        setStartDate(startDate.clone().subtract(7, 'days'))
    }

    const nextWeek = () => {
        setStartDate(startDate.clone().add(7, 'days'))
    }

    return (
        <>
            <div>
                <div className="navigation">
                    <p onClick={weekBack}> {"<"}</p>
                    <div>{startDate.format('MMMM YYYY')}</div>
                    <p onClick={nextWeek}>{">"}</p>
                </div>
                <div className="calendar">
                    {
                        dates.map((date: any) => (
                            <div className="day">
                                <div>{date.format('ddd')}</div>
                                <div>{date.format('D')}</div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>

    )
}