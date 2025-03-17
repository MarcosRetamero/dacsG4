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
      this.isLogueado = await this.keycloak.isLoggedIn();

      if (this.isLogueado) {
        this.userId =
          this.keycloak.getKeycloakInstance().tokenParsed?.sub ?? null;
        console.log('User ID:', this.userId);

        if (!this.userId) {
          console.error('No se pudo obtener el User ID de Keycloak.');
          return;
        }

        this.customerService.getCustomerById(this.userId).subscribe({
          next: (customer) => {
            console.log('Usuario encontrado:', customer);

            if (this.router.url !== '/dashboard-cliente') {
              this.router.navigate(['/dashboard-cliente']); // Redirigir si no está en la ruta ya
            }
          },
          error: (err) => {
            if (err.status === 404) {
              console.warn(
                'Usuario no encontrado en la BD, redirigiendo a registro-user'
              );

              if (this.router.url !== '/registro-user') {
                this.router.navigate(['/registro-user']);
              }
            } else {
              console.error('Error al verificar usuario:', err);
            }
          },
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
