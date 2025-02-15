// import React, { useEffect, useState } from "react";
// import getCurrentUserDetails from "./getCurrentUserDetails";

// const Profile = () => {
//   const [userDetails, setUserDetails] = useState([]);

//   useEffect(() => {
//     getCurrentUser();
//   }, []);

//   const getCurrentUser = async () => {
//     const userDetailsArray = await getCurrentUserDetails();
//     setUserDetails(userDetailsArray);
//     console.log("User Details:", userDetailsArray);
//   };

//   return (
//     <div>
//       <h2>Thông tin hồ sơ</h2>
//       {userDetails.map((user, index) => (
//         <div key={index}>
//           <h3>Thông tin người dùng:</h3>
//           <p>Tên: {user.customerSName}</p>
//           <p>Email: {user.customerEmail}</p>
//           <p>Số điện thoại: {user.phoneNumber}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Profile;

import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import getCurrentUserDetails from "./getCurrentUserDetails";

const Profile = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    try {
      const userDetailsArray = await getCurrentUserDetails();
      setUserDetails(userDetailsArray);
      setIsLoggedIn(true);
    } catch (error) {
      setIsLoggedIn(false);
      console.error("Error fetching user details:", error);
    }
  };
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h2>Thông tin hồ sơ</h2>
      {userDetails.map((user, index) => (
        <div key={index}>
          <h3>Thông tin người dùng:</h3>
          <p>Tên: {user.customerSName}</p>
          <p>Email: {user.customerEmail}</p>
          <p>Số điện thoại: {user.phoneNumber}</p>
        </div>
      ))}
    </div>
  );
};

export default Profile;
