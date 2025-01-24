import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { AuthGuard } from './core/guard/auth.guard';
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
import { TestBddComponent } from './components/testbdd/testbdd.component';
const routes: Routes = [
//  { path: '', canActivate: [AuthGuard]},
//{ path: '**', redirectTo: '' },
{ path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // redirige la raíz al dashboard
{ path: 'dashboard-cliente', component: DashboardClienteComponent }, // ruta para el dashboard
{ path: 'panel-entrenador', component: PanelEntrenadorComponent }, // ruta para el dashboard
{ path: 'crear-plan', component: CrearPlanComponent }, // ruta para el dashboard
{ path: 'student-details', component: StudentDetailsComponent }, // ruta para el dashboard
{ path: 'registro-user', component: RegistroUserComponent }, // ruta para el dashboard
{ path: 'agregar-alumno', component: AgregarAlumnoComponent }, // ruta para el dashboard
{ path: 'plan-entrenamiento', component: PlanEntrenamientoComponent }, // ruta para el dashboard
{ path: 'registro-entrenador', component: RegistroEntrenadorComponent }, // ruta para el dashboard
{ path: 'plan-entrenamiento/:day', component: PlanEntrenamientoComponent }, // ruta para el dashboard
{ path: 'testbff', component: TestBffComponent }, // ruta para el dashboard
{ path: 'testbdd', component: TestBddComponent }, // ruta para el dashboard
{ path: '**', redirectTo: '/dashboard-cliente' }, // wildcard al final para manejar rutas no coincidentes

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
