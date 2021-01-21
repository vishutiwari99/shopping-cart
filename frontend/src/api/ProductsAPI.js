import { useState, useEffect } from 'react'
import axios from 'axios'

function ProductsAPI() {
    const [products, setProducts] = useState([]);
    const [callback, setCallback] = useState(false);

    useEffect(() => {
        const getProducts = () => {
            const res = axios.get("/api/products");
            setProducts(res);
        }
        getProducts();
    }, [callback])
    return {
        products: [products, setProducts],
        callback: [callback, setCallback],
    }
}

export default ProductsAPI
