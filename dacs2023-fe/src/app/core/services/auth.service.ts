import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private keycloakService: KeycloakService) {}

  // Verificar si el usuario está autenticado
  isAuthenticated(): Observable<boolean> {
    return of(this.keycloakService.isLoggedIn());
  }

  // Obtener el token de acceso de Keycloak
  getToken(): Observable<string | null> {
    return new Observable(observer => {
      this.keycloakService
        .getKeycloakInstance()
        .token
        .then(token => {
          observer.next(token);
          observer.complete();
        })
        .catch(err => {
          observer.error(err);
        });
    });
  }

  // Obtener información del usuario
  getUserInfo(): Observable<any> {
    return new Observable(observer => {
      this.keycloakService
        .loadUserProfile()
        .then(profile => {
          observer.next(profile);
          observer.complete();
        })
        .catch(err => {
          observer.error(err);
        });
    });
  }

  // Obtener roles del usuario
  getUserRoles(): Observable<string[]> {
    return of(this.keycloakService.getUserRoles());
  }

  // Iniciar sesión (Redirige al login de Keycloak)
  login(): void {
    this.keycloakService.login();
  }

  // Cerrar sesión
  logout(): void {
    this.keycloakService.logout();
  }
}
