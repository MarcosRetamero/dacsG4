import { KeycloakService } from "keycloak-angular";

function initializeKeycloak(keycloak: KeycloakService): () => Promise<boolean> {
  return () =>
    keycloak
      .init({
        config: {
          url: 'http://localhost:8080/auth', 
          realm: 'master', 
          clientId: 'dacs2023-bff',
        },
        initOptions: {
          onLoad: 'login-required',
          checkLoginIframe: false,
        },
        bearerExcludedUrls: ['/assets'],
      })
      .then((authenticated: any) => {
        if (authenticated) {
          // Ensure user roles are an array
          const userRoles = keycloak.getUserRoles();
          if (!Array.isArray(userRoles)) {
            console.error('User roles are not an array:', userRoles);
            return false;
          }
          console.log('User roles:', userRoles);
        }
        return authenticated;
      })
      .catch((error: any) => {
        console.error('Keycloak initialization failed', error);
        return false;
      });
}
