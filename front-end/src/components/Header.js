import React from 'react';
import propTypes from 'prop-types';
import caneca from '../images/caneca.svg';

function Header({ screenType, userName, userType }) {
  const handleToLeave = async () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  const handleToCustomerOrders = async () => {
    window.location.href = '/customer/orders';
  };

  const handleToProducts = async () => {
    window.location.href = '/customer/products';
  };

  return (
    <div className='w-full'>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-2.5">
          <div className="flex items-center">

            <img src={ caneca } alt="caneca" className="mr-3 h-6 sm:h-9" />

            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              {
                screenType === 'products'
                  ? (
                    <button
                      type="submit"
                      data-testid="customer_products__element-navbar-link-products"
                      onClick={ handleToProducts }
                    >
                      PRODUTOS
                    </button>
                  )
                  : (
                    <span data-testid="customer_products__element-navbar-link-orders">
                      {userType === 'administrator' ? 'GERENCIAR USUÁRIO' : 'PEDIDOS'}
                    </span>
                  )
              }
            </span>
          </div>
          <div className="flex items-center">

            <span
              href="#"
              className="text-sm font-medium
             text-yellow-600 dark:text-yellow-500 hover:underline"
            >
              { userName }
            </span>
          </div>
        </div>
      </nav>
      <nav className="bg-gray-50 dark:bg-gray-700">
        <div className="py-3 px-4 mx-auto max-w-screen-xl md:px-6">
          <div className="flex items-center">

            <div className="flex flex-row mt-0 mr-6 space-x-8 text-sm font-medium">
              {
                userType === 'customer'
          && (
            <button
              type="submit"
              data-testid="customer_products__element-navbar-link-orders"
              onClick={ handleToCustomerOrders }
              className="text-gray-900 dark:text-white hover:underline"
            >
              meus pedidos
            </button>
          )
              }
              <button
                type="submit"
                data-testid="customer_products__element-navbar-link-logout"
                onClick={ handleToLeave }
                className="text-gray-900 dark:text-white hover:underline"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

Header.propTypes = {
  screenType: propTypes.string.isRequired,
  userName: propTypes.string.isRequired,
  userType: propTypes.string.isRequired,
};

export default Header;
