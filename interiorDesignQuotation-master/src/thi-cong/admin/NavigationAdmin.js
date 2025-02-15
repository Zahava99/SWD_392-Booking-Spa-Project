import React from 'react'
import './admin.css'
import {Link} from "react-router-dom"
export default function NavigationAdmin() {
    return (
        <div>
            <div className='container-nav'>
                <ul>
                    <Link style={{ textDecoration: 'none' }} to={'/Admin'}><li className="cont-nav">Nhà Quản Trị</li></Link>
                    <Link style={{ textDecoration: 'none' }} to={'/Admin_staff'}><li className="cont-nav">Nhân Viên</li></Link>
                    <Link style={{ textDecoration: 'none' }} to={'/Admin_Cus'}><li className="cont-nav">Khách hàng</li></Link>
                </ul>
            </div>
        </div>
    )
}
