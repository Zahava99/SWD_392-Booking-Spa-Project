import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import "./admin.css"
import { Link } from "react-router-dom";
import NavigationAdmin from './NavigationAdmin';
export default function Adminbackup() {


    const [staff, setStaff] = useState([]);


    useEffect(() => {
        //Get Staff
        axios
            .get('https://localhost:7224/api/Staff/GetAllStaff')
            .then(response => {
                setStaff(response.data)
            })
            .catch(error => {
                console.error('Error fetching students:', error)
            })
    }, [])

    const handleDelete = id => {
        const confirmDelete = window.confirm(
            'Bạn có muốn xóa nhân viên?'
        )
        if (confirmDelete) {
            axios
                .delete(`https://localhost:7224/api/Staff/StaffId/Delete?staffId=${id}`)
                .then(() => {
                    const updatedStaff = staff.filter(staff => staff.staffSId !== id)
                    setStaff(updatedStaff)
                    toast.success('Đã xóa tài khoản Nhân Viên thành công! ')
                })
                .catch(error => {
                    console.error('Lỗi rồi!!', error)
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

                <div className=' content-c staff-container'>
                    <h4>Nhân Viên</h4>
                    <div className="add-items">
                        <Link to={'/AddStaff/'}>
                            <button className='add-staff-btn'>Thêm Tài Khoản</button>
                        </Link>
                    </div>
                    <div>
                        <table class="table table-striped">
                            <thead>
                                <tr >
                                    <th scope="col">#</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Họ & Tên</th>
                                    <th scope="col">Mật Khẩu</th>
                                    <th scope="col">Hoạt Động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {staff.map((s) => (
                                    <tr key={s.staffSId}>
                                        <th scope="row">{s.staffSId}</th>
                                        <td>{s.staffSEmail}</td>
                                        <td>{s.staffSName}</td>
                                        <td>***</td>
                                        <td>
                                            <div className='action-button'>
                                                <Link to={`/update/${s.staffSId}`}><button className='button-items update'>Cập Nhật</button></Link>
                                                <button className='button-items delete' type='button' onClick={() => handleDelete(s.staffSId)}><FontAwesomeIcon className="items-icon" icon={faTrashCan} /></button>
                                            </div>
                                        </td>
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
