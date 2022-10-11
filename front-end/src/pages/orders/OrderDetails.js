import propTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import OrderHeader from '../../components/OrderHeader';
import OrderProduct from '../../components/OrderProduct';
import { requestData, setToken } from '../../services/requests';
import { convert } from '../../utils/convert';

function OrderDetails(props) {
  const [order, setOrder] = useState();
  const [userName, setUserName] = useState('');
  const [totalPrice, setTotalPrice] = useState([]);
  const { history: { location: { pathname } } } = props;
  const screenType = pathname.includes('products') ? 'products' : 'order';
  const userType = pathname.includes('customer') ? 'customer' : 'seller';
  const orderType = 'order_details';

  function totalPriceCount(orderArray) {
    const pricesArray = orderArray.products
      .map((product) => (product.SalesProduct.quantity * (+product.price)));

    setTotalPrice(pricesArray);
  }

  async function getOrder() {
    const pathnameArray = pathname.split('/');
    const orderId = pathnameArray[pathnameArray.length - 1];
    const response = await requestData(`/${userType}/orders/${Number(orderId)}`);
    setOrder(response);
    totalPriceCount(response);
  }

  useEffect(() => {
    const { token, name } = JSON.parse(localStorage.getItem('user'));
    if (name) { setUserName(name); }
    setToken(token);
    getOrder();
  }, []);

  return (
    <>
      <Header screenType={ screenType } userName={ userName } userType={ userType } />
      <div>
        { order
        && <OrderHeader userType={ userType } order={ order } orderType={ orderType } /> }
        <div className="p-2 flex flex-col">
          <div className='flex flex-col justify-center'>
            { order && order.products.map((product, index) => (
              <tr key={ index }>
                <OrderProduct
                  userType={ userType }
                  item={ index }
                  id={ product.id }
                  name={ product.name }
                  quantity={ product.SalesProduct.quantity }
                  price={ product.price }
                  orderType={ orderType }
                />
              </tr>
            ))}
          </div>
          <span data-testid={ `${userType}_${orderType}__element-order-total-price` }
           className="btn btn-warning mb-10 mt-2"
          >
            { (totalPrice.length > 0) && convert(totalPrice.reduce((acc, cur) => acc + cur)) }
          </span>
        </div>
      </div>
    </>
  );
}

OrderDetails.propTypes = {
  history: propTypes.shape({
    location: propTypes.shape({
      pathname: propTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default OrderDetails;
