import './HomeScreen.css'

// Components
// import Products from '../components/Products'
import ProductMenu from '../components/ProductMenu'

// Actions
import { getProducts as listproducts } from '../redux/actions/productActions'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
function HomeScreen() {

    const dispatch = useDispatch();

    const getProducts = useSelector(state => state.getProducts);
    const { products, loading, error } = getProducts

    useEffect(() => {
        dispatch(listproducts())
    }, [dispatch])
    return (
        <div className="homescreen">
            <h2 className="homescreen__title">Latest Products</h2>
            <div className="homescreen__products">
                {loading ? <h2>Loading...</h2> : error ? <h2>{error}</h2> : products.map(product => (
                    <ProductMenu key={product._id} productId={product._id}
                        title={product.title}
                        price={product.price}
                        // category={product.category}
                        imageUrl={product.images.url} />
                ))}
            </div>
        </div>
    )
}

export default HomeScreen
