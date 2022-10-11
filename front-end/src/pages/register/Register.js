import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { requestPost } from '../../services/requests';
import validate from '../../utils/validate';
import image from '../../images/memeLogo.png';

export default function Register(props) {
  const { history } = props;
  const [register, setRegister] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [button, setButton] = useState(true);
  const [error, setError] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setRegister({ ...register, [name]: value });
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    try {
      await requestPost('/register', register);
      history.push('/login');
      setError(false);
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  const validateRegister = () => {
    const { name, email, password } = register;
    const isRegisterValid = validate.register(name, email, password);

    if (isRegisterValid) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    validateRegister();
  }, [register]);

  return (
    <>
      <div className="flex justify-center flex-col items-center h-full gap-2 mt-48">
        <h2 className="text-white text-xl font-mono mb-2 ">Cadastro</h2>
        <form
          onSubmit={ handleSubmit }
          className="flex justify-center flex-col
      items-center gap-6 h-full"
        >
          <label
            htmlFor="name"
            className="text-white"
          >
            Nome
            <input
              type="text"
              data-testid="common_register__input-name"
              name="name"
              value={ register.name }
              onChange={ handleChange }
              className="input-borderedput
          w-full max-w-xs bg-transparent border-b-2"
              id="name"
            />
          </label>
          <label htmlFor="email" className="text-white">
            Email
            <input
              type="email"
              data-testid="common_register__input-email"
              name="email"
              value={ register.email }
              onChange={ handleChange }
              className="input-borderedput
          w-full max-w-xs bg-transparent border-b-2 "
              id="email"
            />
          </label>
          <label htmlFor="password" className="text-white">
            Senha
            <input
              type="password"
              data-testid="common_register__input-password"
              name="password"
              value={ register.password }
              onChange={ handleChange }
              className="input-borderedput
          w-full max-w-xs bg-transparent border-b-2"
              id="password"
            />
          </label>
          <button
            type="submit"
            data-testid="common_register__button-register"
            disabled={ button }
            className="hover:bg-yellow-500 bg-yellow-400
           text-white font-semibold
            hover:text-white py-2 px-4 border border-yellow-400
            hover:border-transparent rounded w-full font-mono "
          >
            Cadastrar
          </button>
        </form>
        {
        // Refatorar span com a biblioteca de "alert"
          error && (
            <span
              className="error"
              data-testid="common_register__element-invalid_register"
            >

              Usuário já existe

            </span>
          )
        }
      </div>
      <div className="mt-8 mb-0">
        <img src={ image } alt="logo" className="" />
      </div>
    </>
  );
}

Register.propTypes = {
  history: propTypes.shape({
    push: propTypes.func,

  }).isRequired,
};
