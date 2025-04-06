import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  
  menuAbierto = false;
  constructor(private keycloakService: KeycloakService) {}


  logout(): void {    
    this.keycloakService.logout(window.location.origin + '/login');
    console.log('cerrar sesión');
  }
}
