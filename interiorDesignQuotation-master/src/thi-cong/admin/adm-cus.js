import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import "./admin.css"
import { Link } from "react-router-dom";
import NavigationAdmin from './NavigationAdmin';
export default function CusAdmin() {


    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        // Get Cus
        axios.get('https://localhost:7224/api/Customer/GetAllCustomerInformation')
            .then(response => {
                setCustomers(response.data)
            })
            .catch(error => {
                console.error('Error fetching customers:', error)
            });
    }, [])


    const Deletecus = id => {
        const confirmDelete = window.confirm(
            'Bạn có muốn xóa khách hàng này?'
        )
        if (confirmDelete) {
            axios
                .delete(`https://localhost:7224/api/Customer/CustomerId/Delete?CustomerId=${id}`)
                .then(() => {
                    const updatedCustomers = customers.filter(customers => customers.customerSId !== id)
                    setCustomers(updatedCustomers)
                    toast.success("Xóa khách hàng thành công!");
                })
                .catch(error => {
                    console.error('Error deleting Customer:', error)
                })
        }
    }


    return (
        <div>
            <NavigationAdmin />
            <div className='header-container'>
                <span className="border">
                    <h6>Xin chào Admin</h6>
                    <div className="header-img">
                        <img src="./assets/img-thicong/boss.png"></img>
                    </div>
                </span>
            </div>

            <div className='content-container'>
                <h2>Quản lý danh sách Tài Khoản</h2>

                <div className='content-c Customers-container'>
                    <h4 >Khách Hàng</h4>
                    <div className="add-items">
                        <Link to={'/AddCustomer'}>
                            <button className='add-staff-btn'>Thêm Tài Khoản</button>
                        </Link>
                    </div>
                    <div>
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Họ & Tên</th>
                                    <th scope="col">Mật Khẩu</th>
                                    {/* <th scope="col">Số Điện Thoại</th> */}
                                    <th scope="col">Hoạt Động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    customers.map(
                                        (cus) => (
                                            <tr key={cus.customerSId}>
                                                <th scope='row'>{cus.customerSId}</th>
                                                <td>{cus.customerEmail}</td>
                                                <td>{cus.customerSName}</td>
                                                <td>***</td>
                                                {/* <td>{cus.phoneNumber}</td> */}
                                                <td>
                                                    <div className='action-button'>
                                                        <Link to={`/updateCustomer/${cus.customerSId}`}><button className='button-items update'>Cập Nhật</button></Link>
                                                        <button className='button-items delete' type='button' onClick={() => Deletecus(cus.customerSId)}><FontAwesomeIcon className="items-icon" icon={faTrashCan} /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <ToastContainer position='top-right' />
        </div>
    )
}
