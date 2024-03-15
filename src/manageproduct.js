import React, { useState, useEffect } from 'react';
import Adminheader from './adminheader';
import axios from 'axios';

const ManageProduct = () => {
    const [product, updateProduct] = useState([]);


    const getproduct = () => {
        axios.get("http://localhost:1234/product")
            .then(response => {
                updateProduct(response.data)
            })
    }



    useEffect(() => {
        getproduct();
    }, [true])

    const [pname, pickName] = useState("");
    const [pprice, pickPrice] = useState("");
    const [pdetails, pickDetails] = useState("");
    const [pphoto, pickPhoto] = useState("");
    const [msg, updatemsg] = useState("");
    const save = () => {
        var url = "htttp://localhost:1234/product";
        var newproduct = {
            "name": pname,
            "price": pprice,
            "details": pdetails,
            "photo": pphoto

        };
        axios.post(url, newproduct)
            .then(response => {
                updatemsg(pname + "Add Sucessfully");
                pickName(""); pickPrice(""); pickDetails(""); pickPhoto("");
                getproduct();//to reload the list after saving data
            })
        }

            const deleteItem = (index,pnameItem)=>{
                var url="htttp://localhost:1234/product/"+index;
                axios.delete(url)
                .then(response=>{ 
                updatemsg(pnameItem+"Item Deleted sucessfully from product")
                getproduct();
                })
            }
    
    return (
        <>
            <Adminheader />
            <div className="container mt-5">
                <div className='row'>
                    <div className="col-lg-12 text-center">
                        <h3 className='text-primary'> Add Product </h3>
                        <p className='text-danger'>{msg}</p>
                    </div>
                </div>

                <div className='row'>
                    <div className="col-lg-3">
                        <h4>Add product</h4>
                        <div className='p-3 shadow'>
                            <div className="mb-3">
                                <lable>Product Name</lable>
                                <input type="text" className='form-control'
                                    onChange={obj => pickName(obj.target.value)} value={pname} />


                            </div>

                            <div className="mb-3">
                                <lable>Product price</lable>
                                <input type="text" className='form-control' onChange={obj => pickPrice(obj.target.value)} value={pprice} />

                            </div>

                            <div className="mb-3">
                                <lable>Product photo</lable>
                                <input type="text" className='form-control' onChange={obj => pickPhoto(obj.target.value)} value={pphoto} />

                            </div>
                            <div className="mb-3">
                                <lable>Product Details</lable>
                                <textarea className='form-control' onChange={obj => pickDetails(obj.target.value)} value={pdetails}></textarea>

                            </div>
                            <div className='text-center'>
                                <button className='btn btn-primary m-2 ' onClick={save}>Save product</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9 text-center">
                        <h3 className='text-primary'> Available product:{product.length} </h3>
                        <table className='table table-bordered mt-3 shadow'>
                            <thead>
                                <tr className='bg-light text-primary'>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Photo</th>
                                    <th>Details</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    product.map((pdata, index2) => {
                                        return (
                                            <tr key={index2}>
                                                <td> {pdata.id} </td>
                                                <td> {pdata.name} </td>
                                                <td> {pdata.price} </td>



                                                <td>
                                                    <img src={pdata.photo} height="50" width="50" />
                                                </td>
                                                <td> {pdata.details} </td>
                                                <td>
                                                    <button ClassName='btn btn-danger btn-sm' onClick={deleteItem.bind(this,pdata.id,pdata.name)}>
                                                        <i className='fa fa-trash'></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ManageProduct;