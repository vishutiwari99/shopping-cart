import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './ManageProduct.css'

// compoenents
import Loading from '../Loading'
// ACTIONS
import { getProductDetails } from '../../redux/actions/productActions';
import { edit } from '../../redux/actions/editActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';

function ManageProduct({ imageUrl, title, price, description, productId }) {
    const [reload, setReload] = useState(false)

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
    }, [reload])



    const onEditHandler = (productId) => {
        dispatch(getProductDetails(productId));
        dispatch(edit())
        localStorage.setItem('edit', true);
        history.push(`/admin/pro/${productId}`);
    }

    const deleteProductHandler = async (id) => {
        const { data } = await axios.delete(`/api/product/${id}`);
        alert('Product Deleted');
        setReload(!reload)
    }


    return (
        <div className="product_card">
            <img src={imageUrl} alt="" />

            <div className="product_box">
                <h2 title={title}>{title}</h2>
                <span>${price}</span>
                <p>{description}</p>
            </div>
            <button className="edit_btn" key={productId} onClick={() => onEditHandler(productId)}>
                Edit</button>

            <button className="delete_btn" key={productId} onClick={() => deleteProductHandler(productId)}>
                Delete</button>
        </div>
    )
}

export default ManageProduct
