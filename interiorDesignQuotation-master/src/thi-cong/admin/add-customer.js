import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import './formAddEdit.css'

const URL = 'https://localhost:7224/api/Customer/CustomerId/Update?customerId=';

const initialState = {
    customerSName: '',
    customerEmail: '',
    password: '',
}

const error_init = {
    customerSName_err: '',
    customerEmail_err: '',
    password_err: '',
}

const AddCustomers = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [state, setState] = useState(initialState);
    const { customerSName, customerEmail, password } = state;
    const [errors, setErrors] = useState(error_init);
    const [showIdInput, setShowIdInput] = useState(false);

    const getOneSection = async (id) => {
        const res = await axios.get(`https://localhost:7224/api/Customer/Customerid?customerid=${id}`);
        if (res.status === 200) {
            setState(res.data);
        }
    }

    useEffect(() => {
        if (id) getOneSection(id);
        else setShowIdInput(true);
    }, [id]);

    const updateStaff = async (customerSId, data) => {
        const res = await axios.put(`${URL}${id}`, data);
        if (res.status === 200) {
            toast.success(`Đã cập nhật thông tin khách hàng: ${customerSId}`, data);
            toast.success('Quay lại trang trong 1s nữa');
            setTimeout(() => {
                navigate('/Admin_Cus');
            }, 1500);
        }
    }

    const addNewSection = async (data) => {
        try {
            const res = await axios.post(`https://localhost:7224/api/Customer/Create`, data);
            if (res.status === 200 || res.status === 204) {
                toast.success("Thêm thành công ");
                toast.success('Quay lại trang trong 1s nữa');
                setTimeout(() => {
                    navigate('/Admin_Cus');
                }, 1500);
            }
        } catch (error) {
            if (error.response.status === 422) {
                toast.error("Trùng tên hoặc email!!!");
            } else {
                toast.error("Đã xảy ra lỗi khi thêm nhân viên");
            }
        }
    }


    //validate
    const validateForm = () => {
        let isValid = true;
        let errors = { ...error_init };
        const onlyCharactersRegex = /^[a-zA-Z\sÀ-Ỹà-ỹ]*$/;

        if (customerSName.trim() === '' || customerSName.length < 2) {
            errors.customerSName_err = 'Bạn cần nhập Tên';
            if (customerSName.length < 2) {
                errors.customerSName_err = 'Tên phải có ít nhất 2 tự';
            }
            isValid = false;
        } else if (!onlyCharactersRegex.test(customerSName)) {
            errors.customerSName_err = 'Tên không được chứa ký tự đặc biệt';
            isValid = false;
        }

        if (customerEmail.trim() === '') {
            errors.customerEmail_err = 'Bạn cần nhập Email';
            isValid = false;
        } else if (!customerEmail.includes('@') || !customerEmail.endsWith('.com')) {
            errors.customerEmail_err = 'Thiếu cú pháp @ hoặc .com';
            isValid = false;
        }

        if (password.trim() === '' || password.length < 2) {
            errors.password_err = 'Bạn cần nhập Mật Khẩu';
            if (password.length < 2) {
                errors.password_err = 'Mật khẩu phải có ít nhất 2 ký tự';
            }
            isValid = false;
        }


        setErrors(errors);
        return isValid;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            if (id) updateStaff(id, state);
            else addNewSection(state);
        } else {
            toast.error("Oops!! Bạn đang gặp vấn đề!");
        }
    }

    const handleInputChange = (event) => {
        let { name, value } = event.target;
        setState((state) => ({ ...state, [name]: value }));
    }

    return (
        <div className='container'>
            <div className='form'>
                <h2>{id ? "Cập Nhật Thông Tin:" : "Thêm Tài Khoản"}</h2>
                <form onSubmit={handleSubmit}>

                    <div className='contents-form'>
                        <label htmlFor='customerSName' >Tên Khách Hàng: </label>
                        <input type='text' name='customerSName' value={state.customerSName} onChange={handleInputChange} />
                        {errors.customerSName_err && <span className='error'>{errors.customerSName_err}</span>}
                    </div>
                    <div className='contents-form' >
                        <label htmlFor='customerEmail' >Email: </label>
                        <input type='text' name='customerEmail' value={state.customerEmail} onChange={handleInputChange} />
                        {errors.customerEmail_err && <span className='error'>{errors.customerEmail_err}</span>}
                    </div>
                    <div className='contents-form' >
                        <label htmlFor='password' >Mật Khẩu: </label>
                        <input type='password' name='password' value={state.password} onChange={handleInputChange} />
                        {errors.password_err && <span className='error'>{errors.password_err}</span>}
                    </div>

                    <button type='submit' className='form-button'>{id ? "Cập Nhật" : "Tạo Mới"}</button>
                </form>
            </div>
            <ToastContainer position='top-right' />
        </div>
    );
};

export default AddCustomers;