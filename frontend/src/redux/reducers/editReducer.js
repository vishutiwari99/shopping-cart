import * as actionTypes from '../constants/editConstants';

export const editReducer = (state = { onEdit: [] }, action) => {
    switch (action.type) {
        case actionTypes.EDIT_REQUEST:
            return {
                onedit: true,
            }
        default:
            return state;
    }

}