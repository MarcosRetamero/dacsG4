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

  getToken(): Observable<string | null> {
    return new Observable(observer => {
      const token = this.keycloakService.getKeycloakInstance().token;
      if (token) {
        this.setStoredToken(token); // Actualiza el token en localStorage (opcional)
        observer.next(token);
        observer.complete();
      } else {
        observer.error('Token is undefined');
      }
    });
  }


  // Método para decodificar el token y obtener el payload
  private getTokenPayload(): any | null {
    const token = this.keycloakService.getKeycloakInstance().token;
    if (token) {
      try {
        return JSON.parse(atob(token.split('.')[1]));
      } catch (e) {
        console.error('Error parsing token:', e);
        return null;
      }
    }
    return null;
  }


  // Obtener ID del usuario (método observable)
  getUserId(): Observable<string | null> {
    return new Observable(observer => {
      const payload = this.getTokenPayload();
      if (payload) {
        observer.next(payload.sub); // Keycloak usa 'sub' como identificador único
      } else {
        observer.next(null);
      }
      observer.complete();
    });
  }

  // Obtener ID del usuario (método síncrono)
  getUserIdSync(): string {
    const payload = this.getTokenPayload();
    return payload ? payload.sub : '';
  }

  // Obtener email del usuario
  getUserEmail(): Observable<string | null> {
    return new Observable(observer => {
      const payload = this.getTokenPayload();
      if (payload) {
        observer.next(payload.email);
      } else {
        observer.next(null);
      }
      observer.complete();
    });
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
