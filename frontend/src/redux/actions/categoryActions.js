import * as actionTypes from '../constants/categoryConstants'
import axios from 'axios';



export const getAllCategories = () => async (dispatch) => {
    try {
        dispatch({
            type: actionTypes.GET_CATEGORY_REQUEST
        })
        const { data } = await axios.get("/api/categories");

        dispatch({
            type: actionTypes.GET_CATEGORY_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: actionTypes.GET_CATEGORY_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })

    }

}
// delete a category actions
export const deleteCategory = (id) => async (dispatch) => {
    try {
        dispatch({
            type: actionTypes.DELETE_CATEGORY_REQUEST
        })
        const data = await axios.delete(`/api/category/${id}`);
        dispatch({
            type: actionTypes.DELETE_CATEGORY_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: actionTypes.DELETE_CATEGORY_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })

    }

}

export const updateCategory = (id) => async (dispatch) => {
    try {
        dispatch({
            type: actionTypes.UPDATE_CATEGORY_REQUEST
        })
        const data = await axios.put(`/api/category/${id}`);
        dispatch({
            type: actionTypes.UPDATE_CATEGORY_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: actionTypes.DELETE_CATEGORY_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })

    }

}

