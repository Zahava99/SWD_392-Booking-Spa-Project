import { useState, useEffect } from "react";
import { Button, Input, message } from "antd";
import CustomerTable from "./CustomerTable";
import CustomerForm from "./CustomerForm";
import CustomerDetail from "./CustomerDetail";
import CustomerUpdateForm from "./CustomerUpdateForm";
import PromotionForm from "./PromotionForm";
import "./Customer.css";
import {
  useGetAllCustomerQuery,
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} from "../../services/customerAPI";
import CustomButton from "../../components/CustomButton/CustomButton";
import { RiFilter3Line } from "@remixicon/react";

export default function Customer() {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openPromotion, setOpenPromotion] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const { data: customers, isLoading, refetch } = useGetAllCustomerQuery();
  const [createCustomer] = useCreateCustomerMutation();
  const [updateCustomer] = useUpdateCustomerMutation();
  const [deleteCustomer] = useDeleteCustomerMutation();

  useEffect(() => {
    if (customers) {
      const indexedUsers = customers.map((user, index) => ({
        ...user,
        index: index + 1,
      }));
      // Sort the customers by id in ascending order
      const sortedUsers = indexedUsers.slice().sort((a, b) => a.id - b.id);
      setRows(sortedUsers);
      setFilteredRows(sortedUsers);
    }
  }, [customers]);

  useEffect(() => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filteredData = rows.filter((item) => {
      return item.phone.toLowerCase().includes(lowercasedFilter);
    });

    // Sort filteredData by id in ascending order
    const sortedFilteredData = filteredData.sort((a, b) => a.id - b.id);

    setFilteredRows(sortedFilteredData);
  }, [searchTerm, rows]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseDetail = () => setOpenDetail(false);
  const handleCloseUpdate = () => setOpenUpdate(false);
  const handleClosePromotion = () => setOpenPromotion(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer({ ...newCustomer, [name]: value });
  };

  const handleAddCustomer = async () => {
    try {
      await createCustomer(newCustomer).unwrap();
      refetch();
      handleClose();
    } catch (error) {
      console.error("Error adding customer: ", error);
      message.error(error.data);
    }
  };

  const handleViewDetail = (customerId) => {
    const customer = rows.find((row) => row.id === customerId);
    setSelectedCustomer(customer);
    setOpenDetail(true);
  };

  const handleUpdateCustomer = (customerId) => {
    const customer = rows.find((row) => row.id === customerId);
    setSelectedCustomer(customer);
    setOpenUpdate(true);
  };

  const handleSaveUpdate = async () => {
    if (!selectedCustomer || !selectedCustomer.id) {
      console.error("Selected customer or its ID is undefined");
      return;
    }

    try {
      await updateCustomer({
        id: selectedCustomer.id,
        ...selectedCustomer,
      }).unwrap();
      refetch();
      handleCloseUpdate();
    } catch (error) {
      console.error("Error updating customer: ", error);
      message.error(error.data);
    }
  };

  const handleDeleteCustomer = async (customerId) => {
    try {
      await deleteCustomer(customerId).unwrap();
      refetch();
    } catch (error) {
      console.error("Error deleting customer: ", error);
      message.error(error.data);
    }
  };

  const handleCreatePromotion = (customerId) => {
    const customer = rows.find((row) => row.id === customerId);
    setSelectedCustomer(customer);
    setOpenPromotion(true);
  };

  const handleSavePromotion = () => {
    // Logic to save promotion for the customer
    handleClosePromotion();
  };

  return (
    <div className="customerWrapper">
      <div className="customerTitle">
        <h1 className="titleCustomer">Customer List</h1>
        <div className="controls">
          <div className="searchFilter">
            <Input
              type="text"
              className="searchInput"
              placeholder="Search by phone number"
              value={searchTerm}
              onChange={handleSearch}
              style={{
                width: 400,
              }}
            />
          </div>
          <Button
            style={{
              backgroundColor: "#333",
              color: "#fff",
              fontWeight: "bold",
            }}
            onClick={handleOpen}
          >
            Add Customer
          </Button>
        </div>
      </div>

      <div className="tb_customer">
        <div style={{ height: 400, width: "100%" }}>
          <CustomerTable
            loading={isLoading}
            data={filteredRows}
            handleViewDetail={handleViewDetail}
            handleUpdateCustomer={handleUpdateCustomer}
            handleDeleteCustomer={handleDeleteCustomer}
            handleCreatePromotion={handleCreatePromotion}
          />
        </div>
      </div>

      <CustomerForm
        open={open}
        handleClose={handleClose}
        handleInputChange={handleInputChange}
        handleAddCustomer={handleAddCustomer}
        newCustomer={newCustomer}
        setNewCustomer={setNewCustomer}
      />

      <CustomerDetail
        openDetail={openDetail}
        handleCloseDetail={handleCloseDetail}
        selectedCustomer={selectedCustomer}
      />

      <CustomerUpdateForm
        openUpdate={openUpdate}
        handleCloseUpdate={handleCloseUpdate}
        selectedCustomer={selectedCustomer}
        setSelectedCustomer={setSelectedCustomer}
        handleSaveUpdate={handleSaveUpdate}
      />

      <PromotionForm
        openPromotion={openPromotion}
        handleClosePromotion={handleClosePromotion}
        selectedCustomer={selectedCustomer}
        handleSavePromotion={handleSavePromotion}
      />
    </div>
  );
}
