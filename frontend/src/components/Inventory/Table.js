import React, { useEffect, useState } from 'react'
import plus from '../../images/plus.svg'
import M from "materialize-css";
import FormTable from './FormTable';
import { useNavigate } from 'react-router-dom';
const Table = () => {
    const navigate = useNavigate()
    const [dataList, setDatalist] = useState([])
    const [data, setData] = useState({
        productName: "",
        category: "",
        stock: "",
        price: ""
    })
    const [formDataEdit, setformDataEdit] = useState({
        productName: "",
        category: "",
        stock: "",
        price: ""
    })
    const [showForm, setShowForm] = useState(false)
    const [editsec, setEditSec] = useState(false)


    const handleOnchange = (e) => {
        const { value, name } = e.target
        setData((prevData) => {
            return {
                ...prevData, [name]: value
            }
        })
    }
    const handleEditOnchange = (e) => {
        const { value, name } = e.target
        setformDataEdit((prevData) => {
            return {
                ...prevData, [name]: value
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(data)
        fetch("/createinventory", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.error) {
                    return M.toast({
                        html: result.error,
                        classes: "#d50000 red accent-4",
                    });
                } else {
                    console.log(result);
                    setShowForm(false)

                }
            });
    }



    const getfetchData = (e) => {
        fetch("/getinventory", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            }
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.error) {
                    return M.toast({
                        html: result.error,
                        classes: "#d50000 red accent-4",
                    });
                } else {
                    setDatalist(result.message)
                }
            });
        console.log(dataList);
    }
    useEffect(() => {
        getfetchData()
    }, [])


    const updateData = (id) => {
        console.log(formDataEdit);
        // e.preventDefault()
        fetch(`/updateinventory/${id}`, {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt"),
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formDataEdit),
        })
            .then((res) => res.json())
            .then((result) => {
                getfetchData()
                setEditSec(false)
            });
    };




    const deleteItem = (id) => {
        fetch("/deleteinventory", {
            method: "delete",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt"),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ _id: id }),
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result.user._id)
                getfetchData()

            });
    };
    const handleEdit = (product) => {
        setformDataEdit(product)
        setEditSec(true)
    }
    return (
        <div className='' >
            <div className='tab-cont '>
                <table className=''>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>Stock</th>
                            <th>Price</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {dataList[0] ?
                            dataList.map((product) => {
                                return (<tr >
                                    <td>{product.productName}</td>
                                    <td>{product.category}</td>
                                    <td>{product.stock}</td>
                                    <td>{product.price}</td>
                                    <td >
                                        <button className='waves-effect waves-light btn #00c853 green accent-4' onClick={() => { handleEdit(product) }} >edit</button>
                                        <button className='waves-effect waves-light btn #f44336 red' onClick={() => { deleteItem(product._id) }}>delete</button>
                                    </td>
                                </tr>)
                            }) : <p style={{
                                "text-align": "center",
                                "font-size": "large"
                            }}>No data</p>
                        }
                    </tbody>
                </table>
            </div>
            <img src={plus} alt="plus.svg" onClick={() => setShowForm(true)} style={{
                "position": "fixed",
                "left": "946px",
                "margin": "25px",
                "height": "52px",
                "width": "52px",
                "top": "85px"

            }} />
            <div className=''>
                {
                    showForm && (
                        <FormTable
                            handleClose={() => setShowForm(false)}
                            handleOnchange={handleOnchange}
                            handleSubmit={handleSubmit}
                            rest={data}
                        />
                    )
                }
                {
                    editsec && (
                        <FormTable
                            handleClose={() => setEditSec(false)}
                            handleOnchange={handleEditOnchange}
                            handleSubmit={updateData}
                            rest={formDataEdit}
                            id={product.id}
                        />
                    )
                }

            </div>
        </div>
    )
}

export default Table


