import propTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { MdShoppingCart } from 'react-icons/md';
import Header from '../../components/Header';
import ProductCard from '../../components/ProductCard';
import { requestData, setToken } from '../../services/requests';

function Products({ history }) {
  let carrinho = [];
  const [products, setProducts] = useState([]);
  const [userName, setUserName] = useState('');
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      const { token, name } = JSON.parse(localStorage.getItem('user'));
      setUserName(name);
      setToken(token);
      const response = await requestData('/customer/products');
      setProducts(response);
    };
    getProducts();
  }, []);
  useEffect(() => {
    localStorage.setItem('carrinho', JSON.stringify(cart));
  }, [cart]);
  const addItem = (obj) => {
    const { id: productId, name, price } = obj;
    const convertedPrice = parseFloat(price);
    let [newOrder] = cart.filter((el) => el.productId === productId);
    if (newOrder) {
      newOrder.quantity += 1;
      newOrder.subTotal = (convertedPrice * newOrder.quantity).toFixed(2);
    } else {
      newOrder = { productId, name, price, quantity: 1, subTotal: price };
    }
    carrinho = [...cart.filter((el) => el.productId !== productId), newOrder];
    setCart(carrinho);
  };
  const subItem = (obj) => {
    const { id: productId, price } = obj;
    const convertedPrice = parseFloat(price);
    const [newOrder] = cart.filter((el) => el.productId === productId);
    if (newOrder) {
      if (newOrder.quantity > 0) {
        newOrder.quantity -= 1;
      } else {
        newOrder.quantity = 0;
      }
      newOrder.subTotal = (convertedPrice * newOrder.quantity).toFixed(2);
    }
    if (newOrder.quantity === 0) {
      carrinho = [...cart.filter((el) => el.productId !== productId)];
      return setCart(carrinho);
    }
    carrinho = [...cart.filter((el) => el.productId !== productId), newOrder];
    setCart(carrinho);
  };
  const handleQuantity = (obj, quantity) => {
    const { id: productId, name, price } = obj;
    const convertedPrice = parseFloat(price);
    if (carrinho.length === 0) {
      const newOrder = {
        productId,
        name,
        price,
        quantity,
        subTotal: (convertedPrice * quantity).toFixed(2),
      };
      carrinho.push(newOrder);
      setCart(carrinho);
    }
    const idx = carrinho.findIndex((el) => el.productId === productId);
    if (quantity === 0) {
      carrinho = [...cart.filter((el) => el.productId !== productId)];
      return setCart(carrinho);
    }
    carrinho[idx].quantity = quantity;
    setCart(carrinho);
  };
  const renderProducts = () => products.map(
    ({ id, name, urlImage, price }) => products.length > 0 && (
      <ProductCard
        key={ id }
        id={ id }
        name={ name }
        image={ urlImage }
        price={ price }
        add={ addItem }
        sub={ subItem }
        handleQty={ handleQuantity }
      />
    ),
  );
  const totalPrice = () => cart.reduce((acc, curr) => acc + parseFloat(curr.subTotal), 0);
  return (
    <>
      <Header screenType="products" userName={ userName } userType="customer" />
      <div className="w-full">
        <div className="flex justify-center items-center mb-4">
          <button
            type="button"
            data-testid="customer_products__button-cart"
            onClick={ () => history.push('/customer/checkout') }
            disabled={ cart.length === 0 }
            className="btn btn-warning gap-10 w-96 mt-10"
          >
            <div
              className="badge bg-black w-36 h-10 rounded"
              data-testid="customer_products__checkout-bottom-value"
            >
              {`${totalPrice().toFixed(2).replace('.', ',')}`}
            </div>
            <MdShoppingCart className="text-4xl" />
          </button>
        </div>
        <div className="flex flex-wrap gap-6 justify-center">
          {renderProducts()}
        </div>
      </div>
    </>
  );
}
export default Products;
Products.propTypes = {
  history: propTypes.shape({
    push: propTypes.func,
  }).isRequired,
};
