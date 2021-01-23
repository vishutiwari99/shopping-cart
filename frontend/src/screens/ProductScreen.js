import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './ProductScreen.css'

// Actions

import { getProductDetails } from '../redux/actions/productActions'
import { addToCart } from '../redux/actions/cartActions'

function ProductScreen({ match, history }) {
    const dispatch = useDispatch()
    const [qty, setQty] = useState(1)
    const item = JSON.parse(localStorage.getItem("item"));


    const addToCartHandler = () => {
        dispatch(addToCart(item._id, qty));
        history.push("/cart");
    }

    return (
        <div className="productscreen">
            <>
                <div className="productscreen__left">
                    <div className="left__image">
                        <img src={item.images.url} alt={item.title} />
                    </div>
                    <div className="left__info">
                        <p className="left__name">{item.title}</p>
                        <p>Price: ${item.price}</p>
                        <p>{item.description}</p>
                    </div>
                </div>
                <div className="productscreen__right">
                    <div className="right__info">
                        <p>
                            Price: <span>${item.price}</span>
                        </p>
                        <p>
                            Status: <span>{item.countInStock > 0 ? "In Stock" : "Out of Stock"}</span>
                        </p>
                        <p>
                            Qty   <select value={qty} onChange={(e) => setQty(e.target.value)}>
                                {[...Array(item.countInStock).keys()].map((x) => (
                                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                                ))}
                            </select>
                        </p>
                        <p>
                            <button type="button" onClick={addToCartHandler}>Add to Cart</button>
                        </p>
                    </div>
                </div>
            </>



        </div>
    )
}
export default ProductScreen
