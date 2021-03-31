import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Loading from '../Loading'
import './CreateProduct.css'
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../../redux/actions/categoryActions'
import { getProductDetails as listProduct } from '../../redux/actions/productActions';
import { useParams } from 'react-router';

function CreateProduct() {
    const dispatch = useDispatch();
    const edit = useSelector(state => state.edit);
    const { id } = useParams();
    const [pic, setPic] = useState({});
    const getCategories = useSelector(state => state.getCategories);
    const getProductDetails = useSelector(state => state.getProductDetails);
    const { product } = getProductDetails;
    // console.log("Product", product);
    // console.log(images)
    const { categories } = getCategories;
    const [loading, setLoading] = useState(false);
    const [callback, setCallback] = useState(false);
    console.log("Id", id);
    const [products, setProducts] = useState(
        {
            product_id: '',
            title: '',
            countInStock: 0,
            price: 0,
            description: '',
            category: '',
            _id: ''
        }
    )

    console.log("State of products", products)

    const getStateofProduct = async () => {
        const { data } = await axios.get(`/api/products/${id}`);
        setProducts(data)
        setPic(data.pic)

    }

    useEffect(() => {
        dispatch(getAllCategories());
        if (id) {
            getStateofProduct();
        }

    }, [dispatch, callback])




    const handleUpload = async e => {
        e.preventDefault()
        try {
            // if(!isAdmin) return alert("You're not an admin")
            const file = e.target.files[0]

            if (!file) return alert("File not exist.")

            if (file.size > 1024 * 1024) // 1mb
                return alert("Size too large!")

            if (file.type !== 'image/jpeg' && file.type !== 'image/png') // 1mb
                return alert("File format is incorrect.")

            let formData = new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await axios.post('/api/upload', formData, {
                headers: { 'content-type': 'multipart/form-data' }
            })
            console.log("Imaage url ", res.data)
            await setPic(res.data);
            console.log("Pic ", pic);
            setCallback(!callback)
            setLoading(false)

        } catch (err) {
            alert(err.response)
        }
    }


    const handleDestroy = async () => {
        try {
            // if (!isAdmin) return alert("You're not an admin")
            setLoading(true)
            await axios.post('/api/destroy', { public_id: pic.public_id }, {
            })
            setPic(false);
            setLoading(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleChangeInput = e => {
        const { name, value } = e.target
        setProducts({
            ...products, [name]: value
        })
    }


    const handleSubmit = async e => {
        e.preventDefault()
        try {
            //  if(!isAdmin) return alert("You're not an admin")
            if (!pic) return alert("No Image Upload Here")
            if (id) {
                await axios.put(`/api/products/${products._id}`, { ...products, pic }, {
                })
            } else {
                await axios.post('/api/products', { ...products, pic }, {
                })
            }
            setCallback(!callback)
            id ? alert("Product Updated") : alert("Product saved");
            setProducts(false)
            setPic(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }


    if (!products) return <div className="loading"><Loading /></div>
    console.log("Yaha hai product", products);


    // setCallback(!callback);
    return (
        <div className="product__main__container">
            <div className="product__header">
                <h1>Add Products</h1>
            </div>
            <div className="product__container">
                <div className="imageUpload">
                    {
                        loading ? <div id="file_img"><Loading /></div> : pic.url ? <div className="img_container"> <img className="product__img" src={pic.url} alt="Images" /> <div className="remove__image" onClick={handleDestroy}><h3>{id ? "Change Image" : "Remove Image"}</h3></div> </div> :
                            <input type="file" name="file" id="file_up" onChange={handleUpload} />

                    }
                </div>

                <form className="product__form" onSubmit={handleSubmit}>
                    <div className="product__row">
                        <input name="title" type="text" className="product__form-control" placeholder="Product Title" onChange={handleChangeInput} value={products.title} required />

                        <input name="product_id" type="text" className="product__form-control" placeholder="Product Id" onChange={handleChangeInput} value={products.product_id} required />
                    </div>
                    <div className="product__row">
                        <input name="countInStock" type="number" className="product__form-control" placeholder="No. of Stock" onChange={handleChangeInput} value={products.countInStock} required />
                        <input name="price" type="number" className="product__form-control" placeholder="Price" onChange={handleChangeInput} value={products.price} required />
                    </div>
                    <div className="product__row">
                        <label id="label" for="cars">Category :</label>
                        <select name="category" id="dropdown" onChange={handleChangeInput} value={products.category}>
                            {
                                categories && (<>
                                    <option value="" >Please select a category</option>
                                    {
                                        categories.map(category => (
                                            <option value={category._id} key={category._id}>
                                                {category.name}
                                            </option>
                                        ))
                                    }

                                </>)
                            }

                        </select>
                    </div>

                    <div className="product__row">
                        <label for="description" id="label">Product Description :</label>
                    </div>
                    <div className="product__row">
                        <textarea id="textarea" name="description" onChange={handleChangeInput} value={products.description} />
                    </div>
                    <div className="product__btn-container">
                        <button className="product__btn" type="submit">{id ? "Update" : "Save"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default CreateProduct
