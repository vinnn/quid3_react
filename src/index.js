import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';
import { REACT_APP_API_AUDIENCE, REACT_APP_AUTH0_SCOPE, REACT_APP_AUTH0_DOMAIN, REACT_APP_AUTH0_CLIENT_ID, REACT_ROUTER_BASENAME } from "./config"


const AUTH_DOMAIN = REACT_APP_AUTH0_DOMAIN;
const AUTH_CLIENT_ID = REACT_APP_AUTH0_CLIENT_ID;
const AUTH_SCOPE = REACT_APP_AUTH0_SCOPE;
const API_AUDIENCE = REACT_APP_API_AUDIENCE;
const REACT_APP_REDIRECT_URI=window.location.origin + REACT_ROUTER_BASENAME

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={AUTH_DOMAIN}  
      clientId={AUTH_CLIENT_ID}
      authorizationParams={{
        redirect_uri: REACT_APP_REDIRECT_URI, // where we want redirection after authentication
        audience:API_AUDIENCE, 
        scope:AUTH_SCOPE
      }}
      >
      <Provider store={store}>
        <App />
      </Provider>


    </Auth0Provider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();




