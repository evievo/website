import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import { Helmet } from 'react-helmet';
import Home from './home';
import Archive from './archive';
import Main from './main.js';
import ProjectPage from './Projects.js';

//import NotFound from './notfound'





class App extends React.Component {


  render() {
    return (

      <BrowserRouter>
        <Helmet>
          <title>Evan Vollick-Offer x Design</title>
          <meta name="description" content="Evan Vollick-Offer's Portfolio" />
        </Helmet>

        <Switch>
          <Route exact path="/" component={Main} />
          <Route path='/archive' render = {() => <Archive init = {false}/>}/>
          <Route path={`/projects/:projectId`} component={ProjectPage}/>
          <Route component = {Main} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
