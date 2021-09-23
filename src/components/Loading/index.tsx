import React, {FC} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../redux";

type LoadingProps = {
    isLoading: boolean
}

export const Loading: FC<LoadingProps> = ({isLoading}) => {
    const error = useSelector((state: RootState) => {
        return state.calendar.error
    })

    return (
        <div>
            {isLoading && !error && (
                <h1>Loading...</h1>
            )}
            {error && (
                <p>
                    {error}
                </p>
            )}

        </div>
    )
}