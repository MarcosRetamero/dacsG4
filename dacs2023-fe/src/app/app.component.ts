import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { CustomerService } from './core/services/customer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public isLogueado = false;
  public userId: string | null = null;

  constructor(
    private readonly keycloak: KeycloakService,
    private customerService: CustomerService,
    private router: Router
  ) {}

  public async ngOnInit() {
    try {
      // Wait for Keycloak to be initialized
      this.isLogueado = await this.keycloak.isLoggedIn();

      if (this.isLogueado) {
        // Get user ID from Keycloak
        const userInfo = await this.keycloak.loadUserProfile();
        this.userId = userInfo.id || null;

        if (!this.userId) {
          console.error('No se pudo obtener el User ID de Keycloak.');
          return;
        }

        // Check if user exists in our database
        this.customerService.isNewUser(this.userId).subscribe({
          next: (response) => {
            const { isNewUser } = response;

            if (isNewUser) {
              console.log('Usuario nuevo, redirigiendo a registro');
              if (this.router.url !== '/registro-user') {
                this.router.navigate(['/registro-user']);
              }
            } else {
              console.log('Usuario existente, redirigiendo a dashboard');
              if (this.router.url !== '/dashboard-cliente') {
                this.router.navigate(['/dashboard-cliente']);
              }
            }
          },
          error: (err) => {
            console.error('Error al verificar usuario:', err);
            // En caso de error, asumimos que es un usuario nuevo
            if (this.router.url !== '/registro-user') {
              this.router.navigate(['/registro-user']);
            }
          }
        });
      } else {
        await this.keycloak.login({ redirectUri: window.location.origin });
      }
    } catch (error) {
      console.error('Error en ngOnInit:', error);
    }
  }

  public iniciarSesion() {
    this.keycloak.login();
  }

  public cerrarSesion() {
    this.keycloak.logout();
  }
}
