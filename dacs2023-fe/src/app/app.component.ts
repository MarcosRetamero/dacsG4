import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';
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
    private readonly authService: AuthService,
    private readonly customerService: CustomerService,
    private readonly router: Router
  ) {}

  public ngOnInit(): void {
    this.authService.isAuthenticated().subscribe(async (isLoggedIn) => {
      this.isLogueado = isLoggedIn;

      if (!isLoggedIn) {
        // Redirige al login si no hay sesión activa
        await this.authService.login();
        return;
      }

      // Obtiene el ID del usuario desde el token actual
      this.authService.getUserId().subscribe((id) => {
        this.userId = id;

        if (!this.userId) {
          console.error('No se pudo obtener el User ID desde el token.');
          return;
        }

        // Verifica si el usuario existe en la base de datos
        this.customerService.isNewUser(this.userId).subscribe({
          next: ({ isNewUser }) => {
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
            // En caso de error asumimos que es nuevo
            if (this.router.url !== '/registro-user') {
              this.router.navigate(['/registro-user']);
            }
          }
        });
      });
    });
  }

  public iniciarSesion() {
    this.authService.login();
  }

  public cerrarSesion() {
    this.authService.logout();
  }
}
