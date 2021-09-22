import React, {FC, useState, useEffect} from "react";
import './calendar.scss'
import moment from "moment";
import {useSelector} from "react-redux";
import {RootState} from "../../redux";

export const Calendar: FC = () => {
    const [startDate, setStartDate] = useState(moment().startOf("week"))
    const [dates, setDates] = useState<any[]>([])
    const holidays = useSelector((state: RootState) => {
        return state.calendar.holidays
    })

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

    const changeStartDay = (nr: number) => {
        setStartDate(startDate.clone().day(nr))
    }

    return (
        <>
            <div className="calendarComp">
                <div className="navigation">
                    <p onClick={weekBack}> {"<"}</p>
                    <div>
                        <h3>
                            {startDate.format('MMMM YYYY')}
                        </h3>
                    </div>
                    <p onClick={nextWeek}>{">"}</p>
                </div>
                <div className="startDay">
                    <select onChange={(e: any) => changeStartDay(parseInt(e.target.value) )}>
                        <option value="0">Sunday</option>
                        <option value="1">Monday</option>
                        <option value="2">Tuesday</option>
                        <option value="3">Wed</option>
                        <option value="4">Thu</option>
                        <option value="5">Fri</option>
                        <option value="6">Sat</option>
                    </select>
                </div>
                <div className="calendar">
                    {
                        dates.map((date: any) => (
                            <div key={date.format('YYYY-MM-DD')}>
                                <div className="day">
                                    <div>{date.format('ddd')}</div>
                                    <div>{date.format('D')}</div>
                                </div>

                                {Object.keys(holidays).includes(date.format('YYYY-MM-DD')) ?
                                    (<div>{holidays[date.format('YYYY-MM-DD')][0]['name'] }</div>) :
                                    (<div></div>)}
                            </div>
                        ))
                    }
                </div>
            </div>
        </>

    )
}