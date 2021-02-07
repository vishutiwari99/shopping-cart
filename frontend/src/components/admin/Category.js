import './Category.css'

import Loading from '../../components/Loading'

import { createCategory, getAllCategories } from '../../redux/actions/categoryActions'
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
    const [callback, setCallback] = useState(false)


    useEffect(() => {
        dispatch(getAllCategories());
        console.log("yaha")
    }, [dispatch, callback])

    const createCategoryHandler = async (e) => {
        e.preventDefault();
        try {
            const config = {
                header: {
                    "Content-Type": "application/json",
                },
            };
            if (onEdit) {
                const res = await axios.put(`/api/category/${id}`, { name }, config)
                alert(res.data.msg)
            } else {
                const res = await axios.post(`/api/category`, { name }, config)
                setCallback(true);
                setName("");
                alert(res.data.msg)
            }
            setOnEdit(false)
            setName('');

        } catch (error) {
            console.log(error);
        }
    }

    const deleteCategoryHandler = (id) => {

    }

    if (!categories) return <div className="loading"><Loading /></div>

    return (
        <div className="categories">
            <form onSubmit={createCategoryHandler}>
                <label htmlFor="category">Category</label>
                <input type="text" name="category" value={name} onChange={(e) => setName(e.target.value)} required
                />

                <button type="submit">Create</button>
            </form>

            <div className="col">
                {
                    categories.map(category => (
                        <div className="row" key={category._id}>
                            <p>{category.name}</p>
                            <div>
                                <button >Edit</button>
                                <button onClick={deleteCategoryHandler(category._id)}>Delete</button>
                            </div>
                        </div>

                    ))
                }

            </div>

        </div>

    )

}

export default Category
