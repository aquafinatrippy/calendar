import React, {FC, useState, useEffect} from "react";
import './calendar.scss'
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux";
import {getMonth} from "../../redux/modules/calendar";
import {Loading} from "../Loading";

export const Calendar: FC = () => {
    const [startDate, setStartDate] = useState(moment().startOf("week"))
    const [dates, setDates] = useState<any[]>([])
    const dispatch = useDispatch()
    const holidays = useSelector((state: RootState) => {
        return state.calendar.holidays
    })
    const start = useSelector((state: RootState) => {
        return state.calendar.start
    })
    const end = useSelector((state: RootState) => {
        return state.calendar.end
    })
    const fetching =  useSelector((state: RootState) => {
        return state.calendar.isFetching
    })
    useEffect(() => {
        const tempDates = []
        for (let i = 0; i < 7; i++) {
            tempDates.push(moment(startDate).add(i, "days"))
        }
        setDates(tempDates)
        if(start && end){
            if(!startDate.clone().isBetween(start, end)){
                dispatch(getMonth({
                    startDate: startDate.clone().format('YYYY-MM-DD'),
                    endDate: startDate.clone().add(30,  'days').format('YYYY-MM-DD')
                }))
            }
        }
    }, [startDate, dispatch, end, start])



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
                {fetching && <Loading isLoading={fetching}/>}
                {!fetching && (
                    <div className="calendar">
                        {
                            dates.map((date: any) => (
                                <div className="dateCont" key={date.format('YYYY-MM-DD')}>
                                    <div className="day">
                                        <div>{date.format('ddd')}</div>
                                        <div>{date.format('D')}</div>
                                    </div>

                                    {Object.keys(holidays).includes(date.format('YYYY-MM-DD')) ?
                                        (<div><p>{holidays[date.format('YYYY-MM-DD')][0]['name'] }</p> </div>) :
                                        (<div className="empty"/>)}
                                </div>
                            ))
                        }
                    </div>
                )}

            </div>
        </>

    )
}