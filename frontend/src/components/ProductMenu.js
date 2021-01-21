import React from 'react'
import './ProductMenu.css'
import { Link, useHistory } from 'react-router-dom'


function ProductMenu({ imageUrl, title, price, description, productId }) {
    let history = useHistory();
    return (
        <div className="productmenu">
            <div onClick={() => history.push(`/product/${productId}`)} className="product-item">
                <div className="product-item-image">
                    <img src={imageUrl} alt={title} />
                    <div className="product-item-image-hover"></div>
                </div>
                <div className="product-item-content">
                    <div className="product-item-category">
                        Base Item
            </div>
                    <div className="product-item-title">
                        {title}
                    </div>
                    <div className="product-item-price">
                        ${price}
                    </div>
                    <Link to={`/product/${productId}`}>
                        <div className="button-pill">
                            <span>Shop Now</span>
                        </div>
                    </Link>
                </div>
            </div>


        </div>
    )
}

export default ProductMenu
