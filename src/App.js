import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navs from './components/Navs/Navs'
import routes from './routes';

export default function App() {
  const showContentMenus = (routes) => {
    var result = null;
    if (routes.length > 0) {
        result = routes.map((route, index) => {
            return (
                <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={route.main}
                />
            );
        });
    }
    return <Switch>{result}</Switch>;
}

  return (
    <Router>
      <div className="App">
          <Navs />
          {showContentMenus(routes)}
      </div>
    </Router>
  )
}
