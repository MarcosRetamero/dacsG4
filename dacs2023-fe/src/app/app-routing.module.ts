import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { DashboardClienteComponent } from './components/dashboard-cliente/dashboard-cliente.component';
import { PanelEntrenadorComponent } from './components/panel-entrenador/panel-entrenador.component';
import { CrearPlanComponent } from './components/crear-plan/crear-plan.component';
import { StudentDetailsComponent } from './components/student-details/student-details.component';
import { RegistroUserComponent } from './components/registro-user/registro-user.component';
import { AgregarAlumnoComponent } from './components/agregar-alumno/agregar-alumno.component';
import { PlanEntrenamientoComponent } from './components/plan-entrenamiento/plan-entrenamiento.component';
import { RegistroEntrenadorComponent } from './components/registro-entrenador/registro-entrenador.component';
import { TestBffComponent } from './components/testbff/testbff.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard-cliente', pathMatch: 'full' }, // Redirige la raíz al dashboard

  // Rutas protegidas por AuthGuard
  { path: 'dashboard-cliente', component: DashboardClienteComponent, canActivate: [AuthGuard] },
  { path: 'panel-entrenador', component: PanelEntrenadorComponent, canActivate: [AuthGuard] },
  { path: 'crear-plan', component: CrearPlanComponent, canActivate: [AuthGuard] },
  { path: 'student-details', component: StudentDetailsComponent, canActivate: [AuthGuard] },
  { path: 'agregar-alumno', component: AgregarAlumnoComponent, canActivate: [AuthGuard] },
  { path: 'plan-entrenamiento', component: PlanEntrenamientoComponent, canActivate: [AuthGuard] },
  { path: 'registro-entrenador', component: RegistroEntrenadorComponent, canActivate: [AuthGuard] },
  { path: 'plan-entrenamiento/:day', component: PlanEntrenamientoComponent, canActivate: [AuthGuard] },
  { path: 'testbff', component: TestBffComponent, canActivate: [AuthGuard] },

  // Ruta no encontrada (Wildcard)
  { path: '**', redirectTo: '/dashboard-cliente' }, // Redirige a dashboard-cliente en caso de ruta no encontrada
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
