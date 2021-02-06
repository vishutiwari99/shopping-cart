import * as actionTypes from '../constants/loginConstants';

export const loginReducer = (state = { login: [] }, action) => {

    switch (action.type) {
        case actionTypes.LOGIN_REQUEST:
            return {
                isLogin: false,
                loading: true,
            }
        case actionTypes.LOGIN_SUCCESS:
            return {
                isLogin: true,
                loading: false,
                auth: action.payload
            }
        case actionTypes.LOGIN_FAILED:
            return {
                isLogin: false,
                loading: false,
                error: action.payload
            }

        case actionTypes.SIGNUP_REQUEST:
            return {
                isLogin: false,
                loading: true,
            }
        case actionTypes.SIGNUP_SUCCESS:
            return {
                isLogin: true,
                loading: false,
                auth: action.payload
            }
        case actionTypes.SIGNUP_FAILED:
            return {
                isLogin: false,
                loading: false,
                error: action.payload
            }

        // reset

        case actionTypes.FORGET_PASSWORD_REQUEST:
            return {
                loading: true,
            }
        case actionTypes.FORGET_PASSWORD_SUCCESS:
            return {
                loading: false,
                emailsent: 'Email Sent'
            }
        case actionTypes.FORGET_PASSWORD_FAILED:
            return {
                loading: false,
                error: action.payload
            }

        case actionTypes.LOGOUT_USER:
            return {
                isLogin: false,
                loading: false,
            }

        default:
            return state;
    }
}

