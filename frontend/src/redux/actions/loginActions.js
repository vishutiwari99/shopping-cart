import * as actionTypes from '../constants/loginConstants'
import axios from 'axios';

export const loginUser = (object) => async (dispatch) => {
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

export const signupUser = (object) => async (dispatch) => {
    try {
        dispatch({
            type: actionTypes.SIGNUP_REQUEST,
        })
        const config = {
            header: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.post(
            "/api/auth/register",
            { object },
            config
        );
        dispatch({
            type: actionTypes.SIGNUP_SUCCESS,
            payload: data.success
        })
        localStorage.setItem("authToken", data.token);
        alert("Registered");

    } catch (error) {
        dispatch({
            type: actionTypes.SIGNUP_FAILED,
            payload: "Invalid Credentials",
        })

    }
}

export const forgetUserPassword = (object) => async (dispatch) => {
    try {
        dispatch({
            type: actionTypes.FORGET_PASSWORD_REQUEST,
        })
        const config = {
            header: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.post(
            "/api/auth/forgotpassword",
            {
                object,
            },
            config
        );

        dispatch({
            type: actionTypes.FORGET_PASSWORD_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: actionTypes.FORGET_PASSWORD_FAILED,
            payload: 'Email does not exist ',
        })

    }
}


export const logoutUser = () => (dispatch) => {
    localStorage.removeItem("authToken");
    dispatch({
        type: actionTypes.LOGOUT_USER,
    })
}