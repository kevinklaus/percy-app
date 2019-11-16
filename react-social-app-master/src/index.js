/* eslint-disable no-restricted-globals */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import allReducers from './reducers';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './Components/login/Login.component';
import 'typeface-roboto';
import CreateGroup from './Components/groups/createGroup/CreateGroup.component';
import Onboarding from './Components/Onboarding/Onboarding.component';
import ContactViewComponent from './Components/Common/ContactView.component';
import Register from './Components/register/Register.component';
import { fetchGroupsIfNeeded } from './actions/groups.action';
import { fetchContactsIfNeeded } from './actions/contacts.action';
import { PrivateRoute } from './Components/Common/PrivateRoute.component';
import { createBrowserHistory } from 'history';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';
import PrivacyPolicy from './Components/Privacy/privacy.component';
import GroupSettingsComponent from './Components/groups/settings/GroupSettings.component';
import DemoControls from './Components/demoControls/DemoControls.component';
import PresentationRoutes from './Components/Presentation/PresentationRoutes.component';
import { groupIntervalFinish } from './actions';
import ErrorSnackbar from './Components/Error-Message/error-message.component';

const history = createBrowserHistory();
const loggerMiddleware = createLogger();

const store = createStore(
  allReducers,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  )
);

if (location.protocol !== 'https:' && location.href.includes('percy-app')) {
  location.href =
    'https:' + window.location.href.substring(window.location.protocol.length);
}

// checken ob online
// im store muss es eine variable isOnline geben
// navigator.online changes on go online/offline
// daran muss gelistened werden und isOnline im store gesetzt werden
// if(navigator.online); RX js, observable ODER eventlistener
store.dispatch(fetchGroupsIfNeeded('reactjs'));
store.dispatch(fetchContactsIfNeeded());
let finished = false;

// check if group interval has finished every 15 minutes
const karmaCheckInterval = setInterval(() => {
  if (store.getState().groups) {
    store.getState().groups.forEach(group => {
      if (group.timerStartDate) {
        const now = new Date().getTime();
        const distance = new Date(group.timerStartDate).getTime() - now;
        let maxDistance, days;

        days = Math.floor(distance / (1000 * 60 * 60 * 24)) * -1;
        finished = false;

        switch (group.frequencyUnit) {
          case 'day':
            maxDistance = 24;
            const hours =
              Math.floor(
                (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
              ) * -1;
            if (hours > maxDistance) {
              finished = true;
            }
            console.log(hours + ' hours of ' + maxDistance + ' passed.');
            break;
          case 'week':
            maxDistance = 7;
            if (days > maxDistance) {
              finished = true;
            }
            console.log(days + ' days of ' + maxDistance + ' passed.');
            break;
          case 'month':
            maxDistance = 30;
            if (days > maxDistance) {
              finished = true;
            }
            console.log(days + ' days of ' + maxDistance + ' passed.');
            break;
          case 'year':
            maxDistance = 12;
            const months = days / 30;
            if (months > maxDistance) {
              finished = true;
            }
            console.log(months + ' months of ' + maxDistance + ' passed.');
            break;
          default:
            break;
        }

        if (finished) {
          store.dispatch(
            groupIntervalFinish(group, {
              title: 'Interval restart',
              options: {
                body:
                  'Interval for ' +
                  group +
                  ' has finished and restarted. Click to update interval.',
                icon: 'icon.ico',
                badge: 'icon.ico',
              },
            })
          );

          finished = false;
        }
      }
    });
  }
}, 900000);

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter history={history}>
        <PrivateRoute path="/" exact component={App} />
        <PrivateRoute path="/groups/create" component={CreateGroup} />
        <PrivateRoute
          path="/groups/:name/settings"
          component={GroupSettingsComponent}
        />
        <PrivateRoute path="/onboarding" component={Onboarding} />
        <PrivateRoute path="/privacy" component={PrivacyPolicy} />
        <PrivateRoute
          path="/groups/contact/:id"
          component={ContactViewComponent}
        />
        <PrivateRoute path="/demo" component={DemoControls} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <PresentationRoutes />
      </BrowserRouter>
      <ErrorSnackbar />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
