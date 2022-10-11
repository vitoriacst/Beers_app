import React, { useState, createContext, useMemo } from 'react';

import propTypes from 'prop-types';

const context = createContext();

export default function Provider(props) {
  const [state, setState] = useState();
  const teste = useMemo(() => ({ state, setState }), [state]);
  const { children } = props;

  return (
    <context.Provider value={ teste }>
      {children}
    </context.Provider>
  );
}

Provider.propTypes = {
  children: propTypes.node.isRequired,
};
