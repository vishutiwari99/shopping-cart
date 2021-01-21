import * as actionTypes from "../constants/categoryConstants";

export const getAllCategoriesReducer = (state = { category: [] }, action) => {
    switch (action.type) {
        case actionTypes.GET_CATEGORY_REQUEST:
            return {
                loading: true,
                category: [],
            };
        case actionTypes.GET_CATEGORY_SUCCESS:
            return {
                loading: false,
                category: action.payload,
            };

        case actionTypes.GET_CATEGORY_FAIL:
            return {
                loading: true,
                category: action.payload,
            };

        default:
            return state;
    }
};


export const deleteCategoryReducer = (state = { category: [] }, action) => {
    switch (action.type) {
        case actionTypes.DELETE_CATEGORY_REQUEST:
            return {
                loading: true,
                category: [],
            };
        case actionTypes.DELETE_CATEGORY_SUCCESS:
            return {
                loading: false,
                category: action.payload,
            };

        case actionTypes.DELETE_CATEGORY_FAIL:
            return {
                loading: false,
                category: action.payload,
            };

        default:
            return state;
    }
};


export const updateCategoryReducer = (state = { category: [] }, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_CATEGORY_REQUEST:
            return {
                loading: true,
                category: [],
            };
        case actionTypes.UPDATE_CATEGORY_SUCCESS:
            return {
                loading: false,
                category: action.payload,
            };

        case actionTypes.UPDATE_CATEGORY_FAIL:
            return {
                loading: false,
                category: action.payload,
            };

        default:
            return state;
    }
};


