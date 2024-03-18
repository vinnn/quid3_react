import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';
import { REACT_APP_API_AUDIENCE, REACT_APP_AUTH0_SCOPE, REACT_APP_AUTH0_DOMAIN, REACT_APP_AUTH0_CLIENT_ID } from "./config"

// const auth_domain = process.env.REACT_APP_AUTH0_DOMAIN;
// const auth_clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
// const auth_scope = process.env.REACT_APP_AUTH0_SCOPE;
// const api_audience = process.env.REACT_APP_API_AUDIENCE;


const auth_domain = REACT_APP_AUTH0_DOMAIN;
const auth_clientId = REACT_APP_AUTH0_CLIENT_ID;
const auth_scope = REACT_APP_AUTH0_SCOPE;
const api_audience = REACT_APP_API_AUDIENCE;

console.log("auth_domain", auth_domain)
console.log("auth_clientId", auth_clientId)
console.log("auth_scope", auth_scope)
console.log("api_audience", api_audience)

console.log("window.location.origin", window.location.origin)


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={auth_domain}  
      clientId={auth_clientId}
      authorizationParams={{
        redirect_uri: window.location.origin, // + "/quid3_react", // where we want redirection after authentication
        audience:api_audience, 
        scope:auth_scope 
      }}
      >

        <App />

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




