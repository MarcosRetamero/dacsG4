import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private keycloakService: KeycloakService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const keycloakInstance = this.keycloakService.getKeycloakInstance();
    const token = keycloakInstance.token;

    // Logs para depurar
    console.log('Interceptando solicitud HTTP...');
    console.log('Token obtenido desde Keycloak:', token);

    if (keycloakInstance.idTokenParsed) {
      console.log('Información del usuario desde idTokenParsed:');
      console.log('Usuario autenticado:', keycloakInstance.idTokenParsed['preferred_username']);
      console.log('Email del usuario:', keycloakInstance.idTokenParsed['email']);
    } else {
      console.log('No se encontró información de usuario en idTokenParsed.');
    }

    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Encabezado Authorization agregado:', cloned.headers.get('Authorization'));
      return next.handle(cloned);
    }

    console.warn('No se encontró un token. Enviando solicitud sin encabezado Authorization.');
    return next.handle(req);
  }
}
