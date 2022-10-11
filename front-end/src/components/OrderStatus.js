import propTypes from "prop-types";
import React from "react";

function OrderStatus({ status, id, userType, orderType }) {
  const index = id - 1;
  // console.log(userType); OK
  return (
    <div className="">
      {orderType === "orders" && (
        <p /* data-testid= 34(customer) e 49(seller) */
          data-testid={`${userType}_${orderType}__element-delivery-status-${id}`}
          className="font-bold"
        >
          {status}
        </p>
      )}
      {orderType === "order_details" && userType === "customer" ? (
        <p /* data-testid= 40(customer) */
          data-testid={
            `${userType}_${orderType}` +
            `__element-order-details-label-delivery-status-${index}`
          }
          className="font-bold"
        >
          {status}
        </p>
      ) : (
        ""
      )}
    </div>
  );
}

OrderStatus.propTypes = {
  status: propTypes.string.isRequired,
  id: propTypes.number.isRequired,
  userType: propTypes.string.isRequired,
  orderType: propTypes.string.isRequired,
};

export default OrderStatus;
