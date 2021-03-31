import React, { useEffect } from 'react'
import ManageProduct from './ManageProduct'
import './ManageProductScreen.css'

// compoenents
import Loading from '../Loading'
// ACTIONS
import { getProducts } from '../../redux/actions/productActions';
import { useDispatch, useSelector } from 'react-redux';

function ManageProductScreen() {
    const dispatch = useDispatch();
    const getProduct = useSelector(state => state.getProducts);
    const { products, error, loading } = getProduct;

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch])




    if (!products) return <div className="loading"><Loading /></div>
    return (
        <div className="manage_product">
            <h2 className="manage_product_title">All Products</h2>
            <div className="manage_product_grid">
                {products.map(product => (
                    <ManageProduct key={product._id}
                        productId={product._id}
                        price={product.price}
                        description={product.description}
                        imageUrl={product.pic.url}
                    />
                ))}

            </div>

        </div>
    )
}

export default ManageProductScreen
