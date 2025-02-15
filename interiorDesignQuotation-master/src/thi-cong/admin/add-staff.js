import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import './formAddEdit.css'

const URL = 'https://localhost:7224/api/Staff/StaffId/Update?staffId=';

const initialState = {
    staffSId: '',
    staffSName: '',
    staffSEmail: '',
    staffPassword: '',
}

const error_init = {
    staffSName_err: '',
    staffSEmail_err: '',
    staffPassword_err: '',
}

const AddStaff = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [state, setState] = useState(initialState);
    const { staffSId, staffSName, staffSEmail, staffPassword } = state;
    const [errors, setErrors] = useState(error_init);
    const [showIdInput, setShowIdInput] = useState(false);

    const getOneSection = async (id) => {
        const res = await axios.get(`https://localhost:7224/api/Staff/GetStaffById?StaffId=${id}`);
        if (res.status === 200) {
            setState(res.data);
        }
    }

    useEffect(() => {
        if (id) getOneSection(id);
        else setShowIdInput(true);
    }, [id]);

    const updateStaff = async (staffID, data) => {
        const res = await axios.put(`${URL}${id}`, data);
        if (res.status === 204) {
            toast.success(`Đã cập nhật thông tin nhân viên: ${staffID}`, data);
            toast.success('Quay lại trang trong 1s nữa');
            setTimeout(() => {
                navigate('/Admin_staff');
            }, 1500);
        }
    }

    const addNewSection = async (data) => {
        try {
            const res = await axios.post(`https://localhost:7224/api/Staff/Create`, data);
            if (res.status === 200 || res.status === 204) {
                toast.success("Thêm thành công ");
                toast.success('Quay lại trang trong 1s nữa');
                setTimeout(() => {
                    navigate('/Admin_staff');
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

        if (staffSName.trim() === '' || staffSName.length < 2) {
            errors.staffSName_err = 'Bạn cần nhập Tên';
            if (staffSName.length < 2) {
                errors.staffSName_err = 'Tên phải có ít nhất 2 tự';
            }
            isValid = false;
        }else if (!onlyCharactersRegex.test(staffSName)) {
            errors.staffSName_err = 'Tên không được chứa ký tự đặc biệt';
            isValid = false;
        }

        if (staffSEmail.trim() === '') {
            errors.staffSEmail_err = 'Bạn cần nhập Email';
            isValid = false;
        } else if (!staffSEmail.includes('@') || !staffSEmail.endsWith('.com')) {
            errors.staffSEmail_err = 'Thiếu cú pháp @ hoặc .com';
            isValid = false;
        }

        if (staffPassword.trim() === '' || staffPassword.length < 2) {
            errors.staffPassword_err = 'Bạn cần nhập Mật Khẩu';
            if (staffPassword.length < 2) {
                errors.staffPassword_err = 'Mật khẩu phải có ít nhất 2 ký tự';
            }
            isValid = false;
        }


        setErrors(errors);
        return isValid;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            if (!id && staffSId.trim() === '') {
                toast.error("Bạn cần nhập staffSId");
                return;
            }
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
                {showIdInput && (
                        <div className='contents-form'>
                            <label htmlFor='staffSId' >ID: </label>
                            <input type='text' name='staffSId' value={state.staffSId} onChange={handleInputChange} />
                        </div>
                    )}

                    <div className='contents-form'>
                        <label htmlFor='staffSName' >Tên Nhân Viên: </label>
                        <input type='text' name='staffSName' value={state.staffSName} onChange={handleInputChange} />
                        {errors.staffSName_err && <span className='error'>{errors.staffSName_err}</span>}
                    </div>
                    <div className='contents-form' >
                        <label htmlFor='staffSEmail' >Email: </label>
                        <input type='text' name='staffSEmail' value={state.staffSEmail} onChange={handleInputChange} />
                        {errors.staffSEmail_err && <span className='error'>{errors.staffSEmail_err}</span>}
                    </div>
                    <div className='contents-form' >
                        <label htmlFor='staffPassword' >Mật Khẩu: </label>
                        <input type='password' name='staffPassword' value={state.staffPassword} onChange={handleInputChange} />
                        {errors.staffPassword_err && <span className='error'>{errors.staffPassword_err}</span>}
                    </div>

                    <button type='submit' className='form-button'>{id ? "Cập Nhật" : "Tạo Mới"}</button>
                </form>
            </div>
            <ToastContainer position='top-right' />
        </div>
    );
};

export default AddStaff;