import * as actionTypes from '../constants/loginConstants'
import axios from 'axios';

export const loginUser = (object) => async (dispatch, getState) => {
    try {
        dispatch({
            type: actionTypes.LOGIN_REQUEST,
        })

        const config = {
            header: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.post("/api/auth/login", { object }, config
        );
        dispatch({
            type: actionTypes.LOGIN_SUCCESS,
            payload: data.success
        })
        localStorage.setItem("authToken", data.token);
    } catch (error) {
        dispatch({
            type: actionTypes.LOGIN_FAILED,
            payload: "Invalid Credentials",
        })

    }

}


export const logoutUser = () => (dispatch) => {
    localStorage.removeItem("authToken");
    dispatch({
        type: actionTypes.LOGOUT_USER,
    })
}