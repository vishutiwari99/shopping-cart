import './HomeScreen.css'

// Components
import Products from '../components/Products'

// Actions
import { getProducts as listproducts } from '../redux/actions/productActions'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
function HomeScreen() {

    const dispatch = useDispatch()

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
                    <Products key={product._id} productId={product._id}
                        name={product.name}
                        price={product.price}
                        description={product.description}
                        imageUrl={product.imageUrl} />
                ))}
            </div>
        </div>
    )
}

export default HomeScreen
