import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './ProductDetailsScreen.css';

// Screens
import ProductMenu from '../components/ProductMenu'

// compoenents
import Loading from '../components/Loading'
// ACTIONS
import { getProducts } from '../redux/actions/productActions';



import { addToCart } from '../redux/actions/cartActions'
function ProductDetailsScreen({ history }) {

    const dispatch = useDispatch();

    const getProduct = useSelector(state => state.getProducts);
    const { products, error, loading } = getProduct;
    const [qty, setQty] = useState(1)
    const [reload, setReload] = useState(false);
    const item = JSON.parse(localStorage.getItem("item"));

    useEffect(() => {
        setReload(!reload);
        // dispatch(getProducts())
    }, [reload])

    const addToCartHandler = () => {
        dispatch(addToCart(item._id, qty));
        history.push("/cart");
    }
    if (loading) return <div className="loading"><Loading /></div>

    return (
        <>
            <div className="detail">
                <img src={item.images.url} alt={item.title} />
                <div className="box-detail">
                    <div className="row">
                        <h2>{item.title}</h2>
                        <h6>#id: {item.product_id}</h6>
                    </div>
                    <span>$ {item.price}</span>
                    <p>{item.description}</p>
                    <p>{item.content}</p>
                    <p> Status: <span>{item.countInStock > 0 ? "In Stock" : "Out of Stock"}</span></p>
                    <button className="cart"
                        onClick={addToCartHandler}>
                        Buy Now</button>
                </div>
            </div>

            {/* <div className="related">
                <h2>Related products</h2>
                <div className="products">
                    {
                        products.map(product => {
                            return product.category === item.category
                                ? <ProductMenu key={product._id} productId={product._id}
                                    title={product.title}
                                    price={product.price}
                                    // category={product.category}
                                    imageUrl={product.images.url} /> : null
                        })
                    }
                </div>
            </div> */}

        </>

    )
}

export default ProductDetailsScreen
