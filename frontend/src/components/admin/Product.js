import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Loading from '../Loading'
import './Product.css'
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../../redux/actions/categoryActions'


function Product() {
    const dispatch = useDispatch()
    const [images, setImages] = useState(false);
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState({
        product_id: '',
        title: '',
        price: 0,
        description: 'How to and tutorial videos of cool CSS effect, Web Design ideas,JavaScript libraries, Node.',
        content: 'Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.',
        category: '',
        _id: ''
    });
    const getCategories = useSelector(state => state.getCategories);
    const { categories } = getCategories;

    const [onEdit, setOnEdit] = useState(false)
    const [callback, setCallback] = useState(false);

    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch, callback])

    const initialState = {
        product_id: '',
        title: '',
        price: 0,
        description: 'How to and tutorial videos of cool CSS effect, Web Design ideas,JavaScript libraries, Node.',
        content: 'Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.',
        category: '',
        _id: ''
    }


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
            setLoading(false)
            setImages(res.data);

        } catch (err) {
            alert(err.response.data.msg)
        }
    }


    const handleDestroy = async () => {
        try {
            // if (!isAdmin) return alert("You're not an admin")
            setLoading(true)
            await axios.post('/api/destroy', { public_id: images.public_id }, {
            })
            setLoading(false)
            setImages(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleChangeInput = e => {
        const { name, value } = e.target
        setProduct({ ...product, [name]: value })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            // if(!isAdmin) return alert("You're not an admin")
            if (!images) return alert("No Image Upload")

            if (onEdit) {
                await axios.put(`/api/products/${product._id}`, { ...product, images }, {
                })
            } else {
                await axios.post('/api/products', { ...product, images }, {
                })
            }
            setCallback(!callback)
            alert("Product saved");
            setProduct({});
            setImages(false);
        } catch (err) {
            alert(err.response.data.msg)
        }
    }





    return (
        <div className="product__main__container">
            <div className="product__header">
                <h1>Add Products</h1>
            </div>
            <div className="product__container">
                <div className="imageUpload">
                    {
                        loading ? <div id="file_img"><Loading /></div> : images ? <div className="img_container"> <img className="product__img" src={images.url} alt="Images" /> <div className="remove__image" onClick={handleDestroy}><h3>Remove Image</h3></div> </div> :
                            <input type="file" name="file" id="file_up" onChange={handleUpload} />

                    }
                </div>

                <form className="product__form" onSubmit={handleSubmit}>
                    <div className="product__row">
                        <input name="title" type="text" className="product__form-control" placeholder="Product Title" onChange={handleChangeInput} value={product.title} required />

                        <input name="product_id" type="text" className="product__form-control" placeholder="Product Id" onChange={handleChangeInput} value={product.product_id} required />
                    </div>
                    <div className="product__row">
                        <input name="countInStock" type="number" className="product__form-control" placeholder="No. of Stock" onChange={handleChangeInput} value={product.countInStock} required />
                        <input name="price" type="number" className="product__form-control" placeholder="Price" onChange={handleChangeInput} value={product.price} required />
                    </div>
                    <div className="product__row">
                        <label id="label" for="cars">Category :</label>
                        <select name="category" id="dropdown" onChange={handleChangeInput} value={product.category}>
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
                        <textarea id="textarea" name="description" value={product.description} />
                    </div>
                    <div className="product__btn-container">
                        <button className="product__btn" type="submit" >Save</button>
                    </div>
                </form>

            </div>

        </div>
    )
}


export default Product
