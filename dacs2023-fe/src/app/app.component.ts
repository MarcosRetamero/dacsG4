import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { ApiService } from './core/services/apiservice.service';
import { CustomerService } from './core/services/customer.service';
import { TrainerService } from './core/services/trainer.service';
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
  public userId: string | null = null; // Agregar el userId

  constructor(
    private readonly keycloak: KeycloakService,
    private apiService: ApiService,
    private customerService: CustomerService,  // Inyectar CustomerService
    private trainerService: TrainerService    // Inyectar TrainerService
  ) {}

  public async ngOnInit() {
    try {
      this.isLogueado = await this.keycloak.isLoggedIn();
      console.log('Is logged in:', this.isLogueado);

      if (this.isLogueado) {
        // Obtener el `sub` de Keycloak
        this.userId = this.keycloak.getKeycloakInstance().tokenParsed?.sub ?? null;
        //this.userId = this.keycloak.getKeycloakInstance().tokenParsed.sub;
        console.log('User ID (sub) from Keycloak:', this.userId);

        this.perfilUsuario = await this.keycloak.loadUserProfile();
        console.log('User profile:', this.perfilUsuario);

        // Verificar si el usuario tiene algún rol
        this.role = await this.keycloak.isUserInRole("ROLE-A");
        console.log('Has ROLE-A:', this.role);

        // Mostrar el token JWT
        const token = await this.keycloak.getToken();
        console.log('JWT Token:', token);

        // Llamar a la API para registrar o asociar al usuario con `trainer` o `customer`
        this.registrarUsuarioSiEsNecesario();

        // Realizar las llamadas a la API
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

  private registrarUsuarioSiEsNecesario() {
    if (this.userId) { // Verificamos que userId no sea null
      // Verificar si el usuario es un entrenador
      this.trainerService.getTrainerByUserId(this.userId).subscribe({
        next: (trainer) => {
          if (!trainer) {
            console.log('User is not a trainer, checking if user is a customer');
            // Si no es entrenador, verificar si es un cliente
            this.customerService.getCustomerByUserId(this.userId!).subscribe({
              next: (customer) => {
                if (!customer) {
                  console.log('User is neither a trainer nor a customer');
                  // Si el usuario no es ni entrenador ni cliente, registrar al usuario
                  const customerData = { user_id: this.userId!, name: this.perfilUsuario?.firstName };
                  this.customerService.addCustomer(customerData).subscribe();
                }
              },
              error: (err) => console.error('Error fetching customer:', err)
            });
          }
        },
        error: (err) => console.error('Error fetching trainer:', err)
      });
    }
  }
  

  public iniciarSesion() {
    this.keycloak.login();
  }

  public cerrarSesion() {
    this.keycloak.logout();
  }
}
