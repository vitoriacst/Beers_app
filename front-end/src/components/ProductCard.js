import propTypes from "prop-types";
import React, { useState } from "react";
import { convert } from "../utils/convert";
// $#zebirita#$
export default function ProductCard({
  id,
  name,
  price,
  image,
  add,
  sub,
  handleQty,
}) {
  const convertedPrice = convert(price);

  const [quantity, setQuantity] = useState(0);

  const addItem = (obj) => {
    add(obj);
    return quantity >= 0 && setQuantity(quantity + 1);
  };

  const subItem = (obj) => {
    sub(obj);
    return quantity >= 1 && setQuantity(quantity - 1);
  };

  const handleValue = ({ target: { value } }) => {
    setQuantity(Number(value));
    handleQty({ id, name, price }, Number(value));
  };

  return (
    <div
      className="
      card
      w-80
      bg-base-100
      shadow-xl
      border-2
      border-d-orange
      relative
      mb-4
    "
    >
      <span
        className="
        badge
        badge-lg
        absolute
        top-5
        left-5
        "
        data-testid={`customer_products__element-card-price-${id}`}
      >
        {convertedPrice}
      </span>
      <div className="flex justify-center">
        <img
          className="w-52 h-52"
          data-testid={`customer_products__img-card-bg-image-${id}`}
          src={image}
          alt={name}
        />
      </div>
      <div className="p-5">
        <h5
          className="
          mb-2
          text-2xl
          font-bold
          tracking-tight
          text-gray-900
          dark:text-white
          text-center"
        >
          {name}
        </h5>
        <div className="flex justify-center">
          <button
            className="btn"
            type="button"
            data-testid={`customer_products__button-card-rm-item-${id}`}
            onClick={() => subItem({ id, name, price })}
            disabled={quantity === 0}
          >
            -
          </button>
          <input
            className="
            w-8
            text-center
            appearance-none"
            type="number"
            placeholder="0"
            value={quantity}
            data-testid={`customer_products__input-card-quantity-${id}`}
            onChange={(ev) => handleValue(ev)}
          />
          <button
            className="btn"
            type="button"
            data-testid={`customer_products__button-card-add-item-${id}`}
            onClick={() => addItem({ id, name, price })}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  id: propTypes.number.isRequired,
  name: propTypes.string.isRequired,
  price: propTypes.string.isRequired,
  image: propTypes.string.isRequired,
  add: propTypes.func.isRequired,
  sub: propTypes.func.isRequired,
  handleQty: propTypes.func.isRequired,
};
