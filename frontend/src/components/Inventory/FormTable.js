import React from 'react'
import "../../App.css"
const FormTable = ({ handleOnchange, handleSubmit, handleClose,rest ,id}) => {
    return (
        <div>
            <div className='card card-container'>
                <input type="text" placeholder='Enter Product Name : ' name='productName' value={rest.productName} style={{ "color": "white" }} onChange={handleOnchange}
                />
                <input type="text" placeholder='Enter Category : ' name='category'value={rest.category}  style={{ "color": "white" }} onChange={handleOnchange}
                />
                <input type="text" placeholder='Enter Stock :' name='stock'value={rest.stock} style={{ "color": "white" }} onChange={handleOnchange} />
                <input type="text" placeholder='Enter Price :' name='price'value={rest.price} style={{ "color": "white" }} onChange={handleOnchange} />
                <button className="waves-effect waves-light btn #3949ab indigo darken-1" style={{ "margin-left": "285px", "margin-top": "15px" }} type='submit' onClick={handleSubmit(id)}>Submit</button>

                <button className="waves-effect waves-light btn #f44336 red" style={{ "margin-top": "15px" }} type='submit' onClick={handleClose}>Cancel</button>
            </div>

        </div>
    )
}

export default FormTable
