import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Para animaciones de Angular Material

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

// Keycloak
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { initializeKeycloak } from './core/keycloak-init.factory';
import { AuthInterceptor } from './auth/auth.interceptor';

// Componentes
import { DashboardClienteComponent } from './components/dashboard-cliente/dashboard-cliente.component';
import { LayoutComponent } from './components/layout/layout.component';
import { PanelEntrenadorComponent } from './components/panel-entrenador/panel-entrenador.component';
import { CrearPlanComponent } from './components/crear-plan/crear-plan.component';
import { StudentDetailsComponent } from './components/student-details/student-details.component';
import { RegistroUserComponent } from './components/registro-user/registro-user.component';
import { AgregarAlumnoComponent } from './components/agregar-alumno/agregar-alumno.component';
import { PlanEntrenamientoComponent } from './components/plan-entrenamiento/plan-entrenamiento.component';
import { RegistroEntrenadorComponent } from './components/registro-entrenador/registro-entrenador.component';
import { TestBffComponent } from './components/testbff/testbff.component';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    DashboardClienteComponent,
    LayoutComponent,
    PanelEntrenadorComponent,
    CrearPlanComponent,
    StudentDetailsComponent,
    RegistroUserComponent,
    AgregarAlumnoComponent,
    PlanEntrenamientoComponent,
    RegistroEntrenadorComponent,
    TestBffComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // Necesario para Angular Material
    MatFormFieldModule, // Campo de formulario
    MatInputModule, // Inputs
    MatButtonModule, // Botones
    MatTableModule, // Tablas
    MatIconModule, // Opcional si usas iconos
    MatCardModule, // Tarjetas
    KeycloakAngularModule // Keycloak Module importado correctamente
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      deps: [KeycloakService],
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
