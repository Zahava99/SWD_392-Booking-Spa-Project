import React from 'react'
import './App.css'
import Header from './component/khang-components/Header'
import HomePageBody from './component/khang-components/HomePageBody'
import Footer from './component/khang-components/Footer'
import InteriorDesignApartment from './component/khang-components/InteriorDesignApartment'
import { Routes, Route, useNavigate } from 'react-router-dom'
import TownhouseInteriorDesign from './component/khang-components/TownhouseInteriorDesign'
import OfficeInteriorDesign from './component/khang-components/OfficeInteriorDesign'
import VillaInteriorDesign from './component/khang-components/VillaInteriorDesign'
import Blog from './component/quan-components/Blog'
import LoginForm from './component/dung-components/LoginForm'
import ProjectDone from './component/dung-components/ProjectDone'
import BaoGia from './component/quan-components/BaoGia'
import BlogApartment from './component/quan-components/BlogApartment'
import BlogHotel from './component/quan-components/BlogHotel'
import BlogOffice from './component/quan-components/BlogOffice'
import BlogVilla from './component/quan-components/BlogVilla'
import BlogTownHouse from './component/quan-components/BlogTownHouse'
import Staff from './component/quan-components/staff'
import BaoGiaRequestCustomer from './component/quan-components/BaoGiaRequestCustomer'
import ConfirmBaoGiRequestCustomer from './component/khang-components/ConfirmBaoGiRequestCustomer'
import Hpthicong from './thi-cong/task-thuong/hp-thicong'
import Hpchungcu from './thi-cong/task-thuong/hp-chungcu'
import Hpnhapho from './thi-cong/task-thuong/hp-nhapho'
import Hpvanphong from './thi-cong/task-thuong/hp-vanphong'
import Hpbietthu from './thi-cong/task-thuong/hp-bietthu'
import Lienhe from './thi-cong/task-thuong/lienhe1'
import Admin from './thi-cong/admin/admin'
import Adminbackup from './thi-cong/admin/adm-backup'
import ProjectDoneDetails from './component/khang-components/ProjectDoneDetails'
import NotFoundPage from './component/khang-components/NotFoundPage'
import Profile from './component/khang-components/Profile'
import CusAdmin from './thi-cong/admin/adm-cus'
import AddStaff from './thi-cong/admin/add-staff'
import CustomerRequestManager from './component/khang-components/CustomerRequestManager'
import RequestDoneDetails from './component/khang-components/RequestDoneDetails'
import ProductDesignDetails from './component/khang-components/ProductDesignDetails'
import ProtectedRoute from './component/khang-components/ProtectedRoute'
function App () {
  const [loggedIn, setLoggedIn] = React.useState(false)
  const navigate = useNavigate()
  function handleLogin () {
    setLoggedIn(true)
  }

  function handleLogout () {
    setLoggedIn(false)
    navigate('/')
  }

  return (
    <div className='App'>
      <Header isLoggedIn={loggedIn} onLogout={handleLogout} />

      <Routes>
        <Route path='/' element={<HomePageBody />} />
        <Route path='/Blog' element={<Blog />} />
        <Route
          path='/Thiết_kế_nội_thất_chung_cư'
          element={<InteriorDesignApartment />}
        />
        <Route
          path='/Thiết_kế_nội_thất_nhà_phố'
          element={<TownhouseInteriorDesign />}
        />
        <Route
          path='/Thiết_kế_nội_thất_biệt_thự'
          element={<VillaInteriorDesign />}
        />
        <Route
          path='/Thiết_kế_nội_thất_văn_phòng'
          element={<OfficeInteriorDesign />}
        />
        <Route path='/Tổng_quan' element={<Hpthicong />} />
        <Route path='/Thi_Công_nội_thất_chung_cư' element={<Hpchungcu />} />
        <Route path='/Thi_Công_nội_thất_nhà_phố' element={<Hpnhapho />} />
        <Route path='/Thi_Công_nội_thất_văn_phòng' element={<Hpvanphong />} />
        <Route path='/Thi_Công_nội_thất_biệt_thự' element={<Hpbietthu />} />
        <Route path='/Liên_Hệ' element={<Lienhe />} />
        <Route
          path='/Đăng_nhập'
          element={<LoginForm setIsLoggedIn={setLoggedIn} />}
        />
        <Route path='/Dự_án_đã_thi_công' element={<ProjectDone />} />
        <Route path='/Báo_Giá' element={<BaoGia />} />
        <Route path='/Báo_Giá/:id' element={<BaoGia />} />
        <Route path='/profile' element={<Profile />} />
        <Route
          path='/Bao_Gia_Request_Customer'
          element={<BaoGiaRequestCustomer />}
        />
        <Route
          path='/Confirm_Bao_Gia_Request_Customer'
          element={<ConfirmBaoGiRequestCustomer />}
        />
        <Route
          path='/Confirm_Bao_Gia_Request_Customer/:id'
          element={<ConfirmBaoGiRequestCustomer />}
        />
        <Route path='/Blog_Chung_Cư' element={<BlogApartment />} />{' '}
        <Route path='/Blog_Văn_Phòng' element={<BlogOffice />} />{' '}
        <Route path='/Blog_Biệt_Thự' element={<BlogVilla />} />{' '}
        <Route path='/Blog_Khách_Sạn' element={<BlogHotel />} />{' '}
        <Route path='/Blog_Nhà_Phố' element={<BlogTownHouse />} />{' '}
        <Route path='/staff' element={<Staff />} />{' '}
        <Route path='/Bao_Gia_Request_CustomerP' element={<ProtectedRoute />} />
        <Route
          path='/Customers_Request_Management'
          element={<CustomerRequestManager />}
        />{' '}
        <Route
          path='/ProjectDoneDetails/:postId'
          element={<ProjectDoneDetails />}
        />
        <Route
          path='/ProductDesignDetails/:ProuctDetailsID'
          element={<ProductDesignDetails />}
        />
        <Route path='/RequestDetails/:id' element={<RequestDoneDetails />} />
        <Route
          path='/Customers_Request_Management/:customerId'
          element={<RequestDoneDetails />}
        />
        <Route path='/Admin' element={<Admin />} />
        <Route path='/Admin_staff' element={<Adminbackup />} />
        <Route path='/Admin_Cus' element={<CusAdmin />} />
        <Route path='/NotFoundPage' element={<NotFoundPage />} />
        <Route path='/update/:id' element={<AddStaff />}></Route>
      </Routes>
      <Footer />
    </div>
  )
}
export default App
