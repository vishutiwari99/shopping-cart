import React from 'react'
import './ProductMenu.css'
import { Link, useHistory, Redirect } from 'react-router-dom'
import { createHashHistory } from 'history'

import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails } from '../redux/actions/productActions'


function ProductMenu({ imageUrl, title, price, category, productId }) {
    let dispatch = useDispatch();
    const hashHistory = createHashHistory();

    const detailsProductHandler = () => {
        dispatch(getProductDetails(productId));
        hashHistory.push(`/product`)
    }

    return (
        <div className="productmenu">
            <div className="product-item">
                <div className="product-item-image">
                    <img src={imageUrl} alt={title} />
                    <div className="product-item-image-hover"></div>
                </div>
                <div className="product-item-content">
                    <div className="product-item-category">
                        {category}
                    </div>
                    <div className="product-item-title">
                        {title}
                    </div>
                    <div className="product-item-price">
                        ${price}
                    </div>
                    <div onClick={detailsProductHandler}>
                        <div className="button-pill">
                            <span>Shop Now</span>
                        </div>
                    </div>
                    {/* <div className="button-pill" type='button' onClick={detailsProductHandler}>Shop Now</div> */}
                </div>
            </div>


        </div >
    )
}

export default ProductMenu
