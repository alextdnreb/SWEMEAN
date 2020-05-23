export const HOME_PATH = 'home';
// siehe proxy.conf.json und angular.json
const SCHEME = 'https';
const PORT = 443;
const SERVERNAME = 'localhost';
const BASE_PATH = '/rest/api';

// CORS statt Proxy:
// const SCHEME = 'https'
// const PORT = 8443
// const SERVERNAME = 'localhost'
// const BASE_PATH = '/'

/**
 * Basis-URI fuer den REST-Server
 */
export const BASE_URI = `${SCHEME}://${SERVERNAME}:${PORT}${BASE_PATH}`;
