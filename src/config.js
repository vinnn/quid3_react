// DEV SET
const LOCAL=true
const REACT_APP_NAME='quid3_react'

// REACT APP
export const REACT_APP_ORIGIN=window.location.origin
export const REACT_ROUTER_BASENAME=LOCAL?'':`/${REACT_APP_NAME}`
console.log("REACT APP ENVIRONMENT", LOCAL?"LOCAL":"DEPLO")
console.log("REACT APP ORIGIN", REACT_APP_ORIGIN)


// API
export const REACT_APP_API_SERVER_URL='https://turning.rocks/api/v0'
// export const REACT_APP_API_SERVER_URL='http://18.134.206.88/api/v0'
// export const REACT_APP_API_SERVER_URL='http://127.0.0.1:5000/api/v0'
export const REACT_APP_API_AUDIENCE='https://quid3_api.com'

// Auth0
export const REACT_APP_AUTH0_DOMAIN='quid3.eu.auth0.com'
export const REACT_APP_AUTH0_CLIENT_ID='sbBjTrKO3hGLfnsMEAE9KLKlbhTg44eg'
export const REACT_APP_AUTH0_SCOPE="profile get:qandas post:qandas"


