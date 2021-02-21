import React from 'react'
import './Category.css'
import Loading from '../Loading'


import { getAllCategories, deleteCategory } from '../../redux/actions/categoryActions'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Category() {
    const getCategories = useSelector(state => state.getCategories);
    const { categories, loading } = getCategories;
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [onEdit, setOnEdit] = useState(false);
    const [id, setId] = useState("");
    const [callback, setCallback] = useState(false);
    const [error, setError] = useState(false);


    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch, callback])

    const editCategory = async (id, name) => {
        setId(id)
        setName(name)
        setOnEdit(true)
    }


    const createCategoryHandler = async (e) => {
        e.preventDefault();
        try {
            const config = {
                header: {
                    "Content-Type": "application/json",
                },
            };
            if (onEdit) {
                const res = await axios.put(`/api/category/${id}`, { name }, config);
                setCallback(!callback);
                setName("");
                alert(res.data.msg)
            } else {
                const res = await axios.post(`/api/category`, { name }, config)
                setCallback(!callback);
                setName("");
                alert(res.data.msg)
            }
            setOnEdit(false)
            setName('');

        } catch (er) {
            setError(true);
            setName("");
            console.log(er);
        }
    }

    const deleteCategoryHandler = async (id) => {
        try {
            const res = await axios.delete(`/api/category/${id}`);
            // alert(res.data.msg);
            setCallback(!callback);
        } catch (err) {
            alert(err.response.data.msg)
        }
    }



    if (!categories) return <div className="loading"><Loading /></div>

    return (

        <div className='category_conatiner'>
            <h2>{error ? `Category already exist` : "Categories"} </h2>
            <form className="category_form" onSubmit={createCategoryHandler}>
                <input type="text" className="category-form-control" id="addProductTextBox" placeholder="Enter Category Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <button className="category-btn category-btn-primary" id="addProductBtn" type='submit'>{onEdit ? "UPDATE" : "ADD CATEGORY"}</button>
            </form>
            <ul id="productList">{
                categories.map(category => (
                    <li className="category_row" key={category._id}>
                        <span className="text">{category.name}</span>
                        <div className="category-btn-conatiner">
                            <button className="category-btn category-btn-primary" onClick={() => editCategory(category._id, category.name)}>Edit</button>
                            <button className="category-btn category-delete" onClick={() => deleteCategoryHandler(category._id)}> delete</button>
                        </div>
                    </li>
                ))
            }

            </ul>


        </div>

    )
}

export default Category
