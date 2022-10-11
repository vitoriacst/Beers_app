import propTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import OrderCard from "../../components/OrderCard";
import { requestData, setToken } from "../../services/requests";

function Orders(props) {
  const [orders, setOrders] = useState([]);
  const [userName, setUserName] = useState("");
  const { history } = props;
  const {
    history: {
      location: { pathname },
    },
  } = props;
  const screenType = pathname.includes("products") ? "products" : "orders";
  const userType = pathname.includes("customer") ? "customer" : "seller";
  const orderType = "orders";

  console.log(userType);
  async function handleClick(id) {
    const orderPath = `/${userType}/orders/${id}`;
    history.push(orderPath);
  }

  async function getOrders() {
    const response = await requestData(`/${userType}/orders`);
    setOrders(response);
  }

  useEffect(() => {
    const { token, name } = JSON.parse(localStorage.getItem("user"));
    if (name) {
      setUserName(name);
    }
    setToken(token);
    getOrders();
  }, []);

  return (
    <div>
      <Header screenType={screenType} userName={userName} userType={userType} />
      <div className="flex justify-center flex-col p-6 gap-3 mb-2">
        {orders.map((order, index) => (
          <button
            type="button"
            key={index}
            onClick={() => handleClick(order.id)}
          >
            <OrderCard
              order={order}
              userType={userType}
              orderType={orderType}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

Orders.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
    location: propTypes.shape({
      pathname: propTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Orders;
