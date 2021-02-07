import './HomeScreen.css'

// Components
// import Products from '../components/Products'
import ProductMenu from '../components/ProductMenu'

// Actions
import { getProducts as listproducts } from '../redux/actions/productActions'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Loading from '../components/Loading'
function HomeScreen() {

    const dispatch = useDispatch();

    const getProducts = useSelector(state => state.getProducts);
    const { products, error, loading } = getProducts

    useEffect(() => {
        dispatch(listproducts())
    }, [dispatch])

    if (loading) return <div className="loading"><Loading /></div>

    return (
        <div className="homescreen">
            <h2 className="homescreen__title">Latest Products</h2>
            <div className="homescreen__products">
                {products.map(product => (
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
