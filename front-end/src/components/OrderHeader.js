import propTypes from "prop-types";
import React from "react";
import { convertDate } from "../utils/convert";
import OrderStatus from "./OrderStatus";

function OrderHeader({ userType, order, orderType }) {
  const {
    id,
    status,
    saleDate,
    sellers: { name },
  } = order;
  const sellerName = name;
  const date = convertDate(saleDate);

  return (
    <section className="mt-4 mb-4 bg-white flex justify-between items-center gap-2 p-2 flex-wrap">
      <p
        data-testid={`${userType}_${orderType}__element-order-details-label-order-id`}
        className="font-bold"
      >
        {`Pedido ${id}`}
      </p>
      <p /* data-testid= 39(customer) e 55(seller) */
        data-testid={`${userType}_${orderType}__element-order-details-label-order-date`}
        className="font-bold"
      >
        {date}
      </p>
      {userType === "customer" && (
        <p /* data-testid= 38(customer) */
          className="font-bold"
          data-testid="customer_order_details__element-order-details-label-seller-name"
        >
          {sellerName}
        </p>
      )}
      <OrderStatus
        status={status}
        id={id}
        userType={userType}
        orderType={orderType}
      />
      {userType === "customer" ? (
        <button
          type="button"
          /* data-testid= 47(customer) */
          data-testid="customer_order_details__button-delivery-check"
          className="btn btn-warning mt-2"
        >
          MARCAR COMO ENTREGUE
        </button>
      ) : (
        <div className="flex gap-2">
          <button
            type="button"
            /* data-testid= 56(seller) */
            data-testid="seller_order_details__button-preparing-check"
            className="btn btn-warning"
          >
            PREPARAR PEDIDO
          </button>
          <button
            type="button"
            /* data-testid= 57(seller) */
            data-testid="seller_order_details__button-dispatch-check"
            disabled
            className="btn btn-warning"
          >
            SAIU PARA ENTREGA
          </button>
        </div>
      )}
    </section>
  );
}

OrderHeader.propTypes = {
  order: propTypes.shape({
    id: propTypes.number,
    status: propTypes.string,
    saleDate: propTypes.string,
    sellers: propTypes.shape({
      name: propTypes.string,
    }).isRequired,
  }).isRequired,
  userType: propTypes.string.isRequired,
  orderType: propTypes.string.isRequired,
};

export default OrderHeader;
