import React from 'react';
import { Helmet } from 'react-helmet';
import Main from './main.js';


class Home extends React.Component {
render() {
  return (

    <div>
      <Helmet>
        <title>Evan Vollick-Offer</title>
        <meta name="description" content="Evan Vollick-Offer's Portfolio" />
      </Helmet>

      <Main />
    </div>

  );
}
}

export default Home;
