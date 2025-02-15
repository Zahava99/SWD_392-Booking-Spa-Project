import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import "./admin.css"
import NavigationAdmin from './NavigationAdmin';
export default function Admin() {


    const [admins, setAdmins] = useState([]);
    

    useEffect(() => {
        //Get admin
        axios.get('https://localhost:7224/api/Admin/GetAll')
            .then(response => {
                setAdmins(response.data)
            })
            .catch(error => {
                console.error('Error fetching admins:', error)
            });
    }, [])



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
                <div className='content-c admin-container'>
                    <h4>Nhà Quản Trị</h4>
                    <div>
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Mật Khẩu</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    admins.map((ad) => (
                                        <tr key={ad.adminSId}>
                                            <th scope='row'>{ad.adminSId}</th>
                                            <td>{ad.adminSMail}</td>
                                            <td>***</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <ToastContainer position='top-right' />
        </div>
    )
}
