import React from 'react';
import Error from 'components/Error/error';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <Error
      title="Ups! No encontramos esa página"
      subtitle="Parece que la página que buscas se ha quemado en la cocina."
      homeLink={<p>Vuelve al <Link className='link link--bold link--hoverUnderline' to='/'>Inicio</Link> y trata de buscar otra</p>}
    />
  );
};

export default NotFound;
