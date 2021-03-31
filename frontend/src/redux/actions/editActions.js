import * as actionTypes from '../constants/editConstants';
export const edit = () => (dispatch) => {
    dispatch({
        type: actionTypes.EDIT_REQUEST,
        payload: true
    })
    localStorage.setItem("onEdit", true);

}