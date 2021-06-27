import * as Types from '../contants/action-types';


export const requestDataLoading = () => {
    return {
        type: Types.REQUEST_DATA_LOADING,
        payload: { isLoading: true }
    }
}

export const requestDataSuccess = (data) => {
    return {
        type: Types.REQUEST_DATA_SUCCESS,
        payload: data
    }
}

export const requestDataFailure = () => {
    return {
        type: Types.REQUEST_DATA_FAILURE,
        payload: { error: true }
    }
}