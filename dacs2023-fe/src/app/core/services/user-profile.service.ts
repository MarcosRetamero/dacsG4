import { Injectable } from '@angular/core';
import { KeycloakProfile } from 'keycloak-js';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private profileKey = 'userProfile';
  private perfilUsuario: KeycloakProfile | null = null;

  setPerfilUsuario(profile: KeycloakProfile) {
    this.perfilUsuario = profile;
    localStorage.setItem(this.profileKey, JSON.stringify(profile));
  }

  getPerfilUsuario(): KeycloakProfile | null {
    if (!this.perfilUsuario) {
      const storedProfile = localStorage.getItem(this.profileKey);
      if (storedProfile) {
        this.perfilUsuario = JSON.parse(storedProfile);
      }
    }
    return this.perfilUsuario;
  }

  clearPerfilUsuario() {
    this.perfilUsuario = null;
    localStorage.removeItem(this.profileKey);
  }
}
