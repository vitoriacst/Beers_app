import React, { useEffect, useState } from 'react';
import CheckoutCard from '../../components/CheckoutCard';
import Header from '../../components/Header';
import { requestData, requestPost, setToken } from '../../services/requests';
import { convert } from '../../utils/convert';

export default function Checkout() {
  const [userName, setUserName] = useState('');
  const [sellers, setSellers] = useState([]);
  const [sellerId, setSellerId] = useState();
  const [address, setAddress] = useState();
  const [number, setNumber] = useState();
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  // console.log(cart);
  const totalPrice = () => cart
    .reduce((acc, curr) => acc + parseFloat(curr.subTotal), 0);

  const handleSubmit = async () => {
    // enviar objeto do cart para o body e realizar a requisição POST
    // para o back
    if (!cart) return null;
    const items = cart.map((prod) => ({
      productId: prod.productId,
      quantity: prod.quantity,
    }));
    const body = {
      sellerId,
      totalPrice: total,
      deliveryAddress: address,
      deliveryNumber: number,
      items,
    };
    const { token } = JSON.parse(localStorage.getItem('user'));
    setToken(token);
    const response = await requestPost('/customer/orders', body);
    window.location.href = `/customer/orders/${response.id}`;
  };

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('carrinho')));
    const getSellers = async () => {
      const { token, name } = JSON.parse(localStorage.getItem('user'));
      setUserName(name);
      setToken(token);
      const response = await requestData('/customer/checkout');
      console.log(response);
      setSellerId(response[0].id);
      setSellers(response);
    };
    getSellers();
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      setTotal(totalPrice());
    } else {
      setTotal(0);
    }
  }, [cart]);

  const handleRemove = (id) => {
    const carrinho = cart.filter((el) => el.productId !== id);

    setCart(carrinho);
  };

  const renderOption = ({ id, name }) => (
    <option key={ id } value={ id }>{ name }</option>
  );

  return (
    <div>
      {/* <Header screenType="products" userName={ userName } userType="customer" /> */}
      <hr />
      <div className="p-6">
        <h2 className="text-d-orange my-5 font-bold">Meus Pedidos</h2>
        {
          cart && (cart.map(({ productId, name, quantity, price }, index) => (

            <CheckoutCard
              key={ index }
              index={ index }
              productId={ productId }
              name={ name }
              quantity={ quantity }
              price={ price }
              handleRemove={ handleRemove }
            />
          )))
        }

      </div>
      <div className="p-4">
        <div className="my-5">
          <span className="text-d-orange mr-4 font-bold">Total:</span>
          <span
            data-testid="customer_checkout__element-order-total-price"
            className="text-white"
          >
            { convert(total) }
          </span>
        </div>
        <hr />
        <h3 className="text-white my-5 font-bold">Detalhes e Endereço para entrega</h3>
        <p className="text-d-orange my-5">Vendedora Responsável</p>
        <select
          id="seller"
          name="seller"
          value={ sellerId }
          data-testid="customer_checkout__select-seller"
          onChange={ (event) => setSellerId(event.target.value) }
          className="select select-bordered w-full max-w-xs"
        >
          { sellers.length && sellers.map((seller) => renderOption(seller)) }
        </select>
        <p className="text-d-orange my-5">Endereço</p>
        <input
          type="text"
          data-testid="customer_checkout__input-address"
          id="address"
          value={ address }
          onChange={ (event) => setAddress(event.target.value) }
          className="input input-bordered w-full max-w-xs"
          placeholder="Alameda dos Anjos"
        />
        <p className="text-d-orange my-5">Número</p>
        <input
          type="number"
          data-testid="customer_checkout__input-address-number"
          id="number"
          value={ number }
          onChange={ (event) => setNumber(event.target.value) }
          className="input input-bordered w-full max-w-xs"
          placeholder="504"
        />
        <br />
        <div className="flex justify-start">
          <button
            type="submit"
            data-testid="customer_checkout__button-submit-order"
            onClick={ handleSubmit }
            className="
      border-2
      border-d-orange
      rounded
      px-3
      py-2
      my-10
      text-d-orange
      transition-all
      hover:border-black
      hover:bg-d-orange
      hover:text-black
      "
          >
            Finalizar Pedido
          </button>
        </div>
      </div>
    </div>
  );
}
