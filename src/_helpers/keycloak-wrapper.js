import { store, authActions } from '_store';
import Keycloak from 'keycloak-js';

const keycloakConfig = {
  url: process.env.REACT_APP_KEYCLOAK_URL,
  realm: process.env.REACT_APP_KEYCLOAK_REALM || 'aya-realm',
  clientId: process.env.REACT_APP_KEYCLOAK_CLIENT || 'web-client',
};
const keycloak = new Keycloak(keycloakConfig);

export const checkAuth = {
    get: request(),
	logout: logout()
};

function request() {
    return () => {
		return keycloak
			.init({
				onLoad: 'login-required',
				scope: 'email'
			})
			.then(authenticated => {
				if (authenticated) {
					return Promise.resolve(keycloak.token);
				}
			})
			.catch(error => {
				console.log('Failed to authorized', error);
			});
    }
}

function logout() {
	return () => {
		if(keycloak) {
			keycloak?.logout();
		}
	}
}
