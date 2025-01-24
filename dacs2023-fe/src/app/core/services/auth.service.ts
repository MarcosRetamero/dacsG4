import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Observable, of, from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'authToken';

  constructor(
    private keycloakService: KeycloakService
  ) {}

  // Verificar si el usuario está autenticado
  isAuthenticated(): Observable<boolean> {
    return from(this.keycloakService.isLoggedIn());
  }

  // Obtener el token de acceso de Keycloak
  getToken(): Observable<string | null> {
    const token = this.getStoredToken();
    if (token) {
      return of(token);  // Devuelve el token almacenado en localStorage
    } else {
      return new Observable(observer => {
        const token = this.keycloakService.getKeycloakInstance().token;
        if (token) {
          this.setStoredToken(token); // Almacena el token en localStorage
          observer.next(token);
          observer.complete();
        } else {
          observer.error('Token is undefined');
        }
      });
    }
  }

  // Obtener información del usuario (perfil)
  getUserInfo(): Observable<any> {
    const storedProfile = this.getStoredUserProfile(); // Revisa el localStorage
    if (storedProfile) {
      return of(storedProfile); // Devuelve el perfil almacenado
    } else {
      return new Observable(observer => {
        this.keycloakService.loadUserProfile()
          .then(profile => {
            this.setStoredUserProfile(profile); // Guarda el perfil en el localStorage
            observer.next(profile);
            observer.complete();
          })
          .catch(err => {
            observer.error(err);
          });
      });
    }
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
    this.clearStoredToken();
    this.clearStoredUserProfile(); // Limpiar el perfil del usuario en localStorage
    this.keycloakService.logout();
  }

  // Almacenar el token en localStorage
  private setStoredToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Obtener el token de localStorage
  private getStoredToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Limpiar el token de localStorage
  private clearStoredToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  // Almacenar el perfil del usuario en localStorage
  private setStoredUserProfile(profile: any): void {
    localStorage.setItem('userProfile', JSON.stringify(profile));
  }

  // Obtener el perfil del usuario desde localStorage
  private getStoredUserProfile(): any | null {
    const profile = localStorage.getItem('userProfile');
    return profile ? JSON.parse(profile) : null;
  }

  // Limpiar el perfil del usuario en localStorage
  private clearStoredUserProfile(): void {
    localStorage.removeItem('userProfile');
  }
}
