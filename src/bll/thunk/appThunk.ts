import {Dispatch} from "redux";
import {appApi} from "../../dal/api/app-api";
import {setAppStatus, setIsInitializedAC} from "../actions/appActions";
import {handleNetworkAppError, handleServerAppError} from "../../utils/error-utils/error-utils";

export const isAuthTC = () => (dispatch: Dispatch) => {
    appApi.authMe()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsInitializedAC(true))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleNetworkAppError(error, dispatch)
        })
        .finally(() => {
                dispatch(setAppStatus('idle'))
            }
        )
}