import React from 'react';
import './App.scss';
import Map from './views/Map';
import store, { history } from './store.js';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch, Redirect } from 'react-router-dom';
import NavBar from './layout/NavBar';
import Favourites from './views/Favourites';
import Alerts from './layout/Alerts';
import Search from './views/Search';
import ServiceWorkerWrapper from './components/ServiceWorkerWrapper';
import Tutorial from './views/Tutorial';
import Settings from './views/Settings';

const App = () => {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Switch>
                    <Route exact path='/' component={Map} />
                    <Route exact path='/faves' component={Favourites} />
                    <Route exact path='/search' component={Search} />
                    <Route exact path='/settings' component={Settings} />
                    <Redirect to='/' />
                </Switch>
                <NavBar />
                <Alerts />
                <Tutorial />
                <ServiceWorkerWrapper />
            </ConnectedRouter>
        </Provider>
    );
};

export default App;
