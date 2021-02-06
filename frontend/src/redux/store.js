import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'


// Reducers
import { cartReducer } from './reducers/cartReducers'
import { loginReducer } from './reducers/loginReducers'
import { getProductDetailsReducer, getProductsReducer } from './reducers/productReducers'
import { getAllCategoriesReducer, updateCategoryReducer, deleteCategoryReducer } from './reducers/categoryReducers'
const reducer = combineReducers({
    cart: cartReducer,
    getProducts: getProductsReducer,
    getProductDetails: getProductDetailsReducer,
    getCategories: getAllCategoriesReducer,
    updateCategory: updateCategoryReducer,
    deleteCategory: deleteCategoryReducer,
    login: loginReducer
})

const middleware = [thunk];

const cartFromLocalStorage = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
const islogin = (localStorage.getItem("authToken") ? true : false)
const INITIAL_STATE = {
    cart: {
        cartItems: cartFromLocalStorage
    },
    login: {
        isLogin: islogin

    }

}

const store = createStore(
    reducer,
    INITIAL_STATE,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;