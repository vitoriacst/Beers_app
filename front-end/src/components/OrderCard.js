import propTypes from 'prop-types';
import React from 'react';
import { convert, convertDate } from '../utils/convert';
import OrderStatus from './OrderStatus';

function OrderCard({ order, userType, orderType }) {
  const { id, status, saleDate, totalPrice, deliveryAddress, deliveryNumber } = order;
  const date = convertDate(saleDate);

  return (
    <div>
      <section className="card card-side bg-base-100 shadow-xl">
        <div className="card-body">
          <div>
            <p data-testid={ `${userType}_orders__element-order-id-${id}` }
             className=" text-yellow-700"
            >
              Pedido
              { id }
            </p>
          </div>
          <div>
            <OrderStatus
              status={ status }
              id={ id }
              userType={ userType }
              orderType={ orderType }
            />
          </div>
          <div>
            <p data-testid={ `${userType}_orders__element-order-date-${id}` }>
              { date }
            </p>
            <p
              data-testid={ `${userType}_orders__element-card-price-${id}` }
            >
              {convert(totalPrice)}
            </p>
          </div>
          {
            userType === 'seller'
        && (
          <div>
            <p data-testid={ `seller_orders__element-card-address-${id}` }>
              {`${deliveryAddress}, ${deliveryNumber}`}
            </p>
          </div>
        )
          }
        </div>
      </section>
    </div>
  );
}

OrderCard.propTypes = {
  order: propTypes.shape({
    id: propTypes.number,
    status: propTypes.string,
    saleDate: propTypes.string,
    totalPrice: propTypes.string,
    deliveryAddress: propTypes.string,
    deliveryNumber: propTypes.string,
  }).isRequired,
  userType: propTypes.string.isRequired,
  orderType: propTypes.string.isRequired,
};

export default OrderCard;
