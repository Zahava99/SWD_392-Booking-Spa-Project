import React, { useEffect, useState } from "react";
import "./Counter.css";
import { Input, notification } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import {
  useAddCounterMutation,
  useEditCounterMutation,
  useGetCountersQuery,
  useInactiveCounterMutation,
  useActiveCounterMutation,
} from "../../services/counterAPI";
import CounterList from "./CounterManage/CounterList";
import CreateCounterModal from "./CounterManage/CreateCounterModal";
import UpdateCounterModal from "./CounterManage/UpdateCounterModal";
import { CircularProgress } from "@mui/material";
import { RiAddFill } from "@remixicon/react";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "../../slices/auth.slice";

export default function Counter() {
  const { data: counters, isLoading, refetch } = useGetCountersQuery();
  const [counterData, setCounterData] = useState([]);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [selectedCounter, setSelectedCounter] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const auth = useSelector(selectAuth);
  const [editCounterMutation, { isLoading: isLoadingEdit }] =
    useEditCounterMutation();
  const [addCounterMutation, { isLoading: isLoadingAdd }] =
    useAddCounterMutation();
  const [activeCounterMutation, { isLoading: isLoadingActive }] =
    useActiveCounterMutation();
  const [inactiveCounterMutation, { isLoading: isLoadingInactive }] =
    useInactiveCounterMutation();

  useEffect(() => {
    if (counters) {
      const indexedCounters = counters.map((counter, index) => ({
        ...counter,
        index: index + 1,
      }));
      setCounterData(indexedCounters);
    }
  }, [counters]);

  useEffect(() => {
    if (counters) {
      const sortedCounters = [...counters].sort((a, b) => a.id - b.id);
      const filteredCounters = sortedCounters.filter(
        (counter) =>
          counter.counterName &&
          counter.counterName.toLowerCase().includes(searchValue.toLowerCase())
      );

      const indexedCounters = filteredCounters.map((counter, index) => ({
        ...counter,
        index: index + 1,
      }));

      setCounterData(indexedCounters);
    }
  }, [counters, searchValue]);

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const onChangeSearch = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const handleCreateCounter = (values) => {
    addCounterMutation(values)
      .unwrap()
      .then((data) => {
        setIsCreateModalVisible(false);
        refetch();
        notification.success({
          message: "Create counter successfully",
        });
      })
      .catch((error) => {
        console.error("Error creating counter: ", error);
      });
  };

  const handleUpdateCounter = (values) => {
    editCounterMutation(values)
      .unwrap()
      .then((data) => {
        setIsUpdateModalVisible(false);
        refetch();
        notification.success({
          message: "Update counter successfully",
        });
      })
      .catch((error) => {
        console.error("Error updating counter: ", error);
      });
  };

  const handleActiveCounter = async (counterId) => {
    const result = await activeCounterMutation(counterId);
    if (result.error.originalStatus == 200) {
      refetch();
      notification.success({
        message: "Counter activated successfully",
      });
    } else {
      notification.error({
        message: "Counter activated unsuccessfully",
      });
    }
  };

  const handleInactiveCounter = async (counterId) => {
    const result = await inactiveCounterMutation(counterId);
    if (result.error.originalStatus == 200) {
      refetch();
      notification.success({
        message: "Counter inactivated successfully",
      });
    } else {
      notification.error({
        message: "Counter inactivated unsuccessfully",
      });
    }
  };

  const handleEditCounter = (counter) => {
    setSelectedCounter(counter);
    setIsUpdateModalVisible(true);
  };

  const navigate = useNavigate();

  const handleViewCounterDetail = (counter) => {
    navigate(`/counter-detail/${counter.id}`, {
      state: { counterName: counter.counterName, location: counter.location },
    });
  };

  return (
    <div className="counter-manage-page">
      <div className="header">
        <h1 className="title">Counter Management</h1>
      </div>
      <div className="action">
        <div className="action-left">
          <Input
            style={{ borderRadius: 20, width: "350px" }}
            size="large"
            placeholder="Search by counter name"
            prefix={<SearchOutlined />}
            value={searchValue}
            onChange={onChangeSearch}
            onPressEnter={() => handleSearch(searchValue)}
          />
        </div>
        <div className="action-right">
          {auth?.roles?.some((role) => role === "ROLE_ADMIN") ? (
            <CustomButton
              icon={RiAddFill}
              text="Add Counter"
              iconSize="16px"
              iconColor="white"
              textColor="white"
              containerStyle={{
                backgroundColor: "#333333",
                marginBottom: "10px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              hoverStyle={{
                opacity: 0.6,
              }}
              iconPosition="left"
              fontSize="16px"
              padding="10px 20px"
              onClick={() => setIsCreateModalVisible(true)}
            />
          ) : null}
        </div>
      </div>
      <div className="counter-list">
        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <CounterList
            counterData={counterData}
            onEditCounter={handleEditCounter}
            onViewCounterDetail={handleViewCounterDetail}
            handleActiveCounter={handleActiveCounter}
            handleInactiveCounter={handleInactiveCounter}
          />
        )}
      </div>
      <CreateCounterModal
        visible={isCreateModalVisible}
        onCreate={handleCreateCounter}
        loading={isLoadingAdd}
        onCancel={() => setIsCreateModalVisible(false)}
      />
      {selectedCounter && (
        <UpdateCounterModal
          visible={isUpdateModalVisible}
          onUpdate={handleUpdateCounter}
          onCancel={() => setIsUpdateModalVisible(false)}
          loading={isLoadingEdit}
          counter={selectedCounter}
        />
      )}
    </div>
  );
}
