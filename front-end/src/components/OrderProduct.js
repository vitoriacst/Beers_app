import propTypes from "prop-types";
import React from "react";
import { convert } from "../utils/convert";

function OrderProduct({
  userType,
  item,
  id,
  name,
  quantity,
  price,
  orderType,
}) {
  const index = id - 1;

  return (
    <div className="p-4">
      <div className="card card-side bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex justify-between gap-6">
            <h3 className="font-bold">Item</h3>
            <p
              data-testid={`${userType}_${orderType}__element-order-table-item-number-${index}`}
            >
              {item}
            </p>
          </div>
          <div className="flex justify-between gap-6">
            <h3 className="font-bold">Descrição</h3>
            <p
              data-testid={`${userType}_${orderType}__element-order-table-name-${index}`}
              className="bg-white"
            >
              {name}
            </p>
          </div>
          <div className="flex justify-between gap-6">
            <h3 className="font-bold">Quantidade</h3>
            <p
              data-testid={`${userType}_${orderType}__element-order-table-quantity-${index}`}
              className="bg-white"
            >
              {quantity}
            </p>
          </div>
          <div className="flex justify-between gap-6">
            <h3 className="font-bold">Valor Unitário</h3>
            <p
              data-testid={`${userType}_${orderType}__element-order-table-unit-price-${index}`}
              className="bg-white"
            >
              {convert(price)}
            </p>
          </div>
          <div className="flex justify-between gap-6">
            <h3 className="font-bold">Sub-total</h3>
            <p
              data-testid={`${userType}_${orderType}__element-order-table-sub-total-${index}`}
              className="bg-white"
            >
              {convert(quantity * price)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 25.654

OrderProduct.propTypes = {
  userType: propTypes.string.isRequired,
  item: propTypes.number.isRequired,
  id: propTypes.number.isRequired,
  name: propTypes.string.isRequired,
  quantity: propTypes.number.isRequired,
  price: propTypes.number.isRequired,
  // totalPrice: propTypes.func.isRequired,
  orderType: propTypes.string.isRequired,
};

export default OrderProduct;
