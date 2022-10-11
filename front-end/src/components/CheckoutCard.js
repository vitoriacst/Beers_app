import React from 'react';
import propTypes from 'prop-types';
import { convert } from '../utils/convert';

function CheckoutCard({
  index,
  productId,
  name,
  quantity,
  price,
  handleRemove,
}) {
  // const prefix = 'customer_checkout__element-order-table';
  const convertedPrice = convert(price);
  return (
    <div className="p-2">
      <div className="card card-side bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-yellow-700">{`${index + 1} ${name}`}</h2>
          <div className="flex justify-between gap-6">
            <h3 className="font-medium">Quantidade</h3>
            <span className="text-center">{quantity}</span>
          </div>
          <div className="flex justify-between gap-6">
            <h3 className="font-medium">Preço Unitário</h3>
            <span className="text-center w-3">{convertedPrice}</span>
          </div>
          <div className="flex justify-between gap-6">
            <h3 className="font-medium">Sub Total</h3>
            <span className="text-center w-3">{convert(price * quantity)}</span>
          </div>
          <div className="card-actions justify-center">
            <button
              type="button"
              className="btn btn-outline btn-warning"
              onClick={ () => handleRemove(productId) }
            >
              Remover

            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

CheckoutCard.propTypes = {
  index: propTypes.number.isRequired,
  productId: propTypes.number.isRequired,
  name: propTypes.string.isRequired,
  price: propTypes.string.isRequired,
  quantity: propTypes.number.isRequired,
  handleRemove: propTypes.func.isRequired,
};

export default CheckoutCard;
