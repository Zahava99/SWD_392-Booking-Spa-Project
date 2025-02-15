import axios from "axios";

const getCurrentUserDetails = async () => {
  let userDetails = null;

  const apiUrl = `https://localhost:7224/api/Customer`;

  try {
    const response = await axios.get(apiUrl);
    userDetails = response.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
  }

  return userDetails;
};

export default getCurrentUserDetails;
