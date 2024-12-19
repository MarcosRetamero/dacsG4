import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { ApiService } from './core/services/apiservice.service';
import { ITestResponse } from './core/models/response.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'dacs2023';
  public isLogueado = false;
  public testResponse: ITestResponse | null = null;
  public apiPing = "";
  public apiConectorPing = "";
  public perfilUsuario: KeycloakProfile | null = null;
  public role = false;

  constructor(private readonly keycloak: KeycloakService, private apiService: ApiService) {}

  public async ngOnInit() {
    try {
      this.isLogueado = await this.keycloak.isLoggedIn();
      console.log('Is logged in:', this.isLogueado);

      if (this.isLogueado) {
        this.perfilUsuario = await this.keycloak.loadUserProfile();
        console.log('User profile:', this.perfilUsuario);
        
        this.role = await this.keycloak.isUserInRole("ROLE-A");
        console.log('Has ROLE-A:', this.role);

        // API calls with error handling
        this.apiService.getTest().subscribe({
          next: (resp) => this.testResponse = resp,
          error: (err) => console.error('Error in getTest:', err)
        });
        
        this.apiService.getPing().subscribe({
          next: (resp) => this.apiPing = resp,
          error: (err) => console.error('Error in getPing:', err)
        });
        
        this.apiService.getConectorPing().subscribe({
          next: (resp) => this.apiConectorPing = resp,
          error: (err) => console.error('Error in getConectorPing:', err)
        });
      } else {
        await this.keycloak.login({
          redirectUri: window.location.origin
        });
      }
    } catch (error) {
      console.error('Error in ngOnInit:', error);
    }
  }

  public iniciarSesion() {
    this.keycloak.login();
  }

  public cerrarSesion() {
    this.keycloak.logout();
  }
}
