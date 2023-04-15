import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaMarcaComponent } from './components/Marca/lista-marca/lista-marca.component';
import { ListaTipodevehiculosComponent } from './components/tipodevehiculo/lista-tipodevehiculos/lista-tipodevehiculos.component';
import { ListaModeloComponent } from './components/Modelo/lista-modelo/lista-modelo.component';
import { ListaCombustibleComponent } from './components/Combustibles/lista-combustible/lista-combustible.component';
import { ListaClientesComponent } from './components/Cliente/lista-clientes/lista-clientes.component';
import { ListaDocumentosComponent } from './components/Documento/lista-documentos/lista-documentos.component';
import { ListVehiculosComponent } from './components/Vehiculo/list-vehiculos/list-vehiculos.component';
import { ListEmpleadosComponent } from './components/Empleado/list-empleados/list-empleados.component';
import { ListRentasComponent } from './components/Renta/list-rentas/list-rentas.component';
import { ListInspeccionesComponent } from './components/Inspeccion/list-inspecciones/list-inspecciones.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrouserComponent } from './components/registrouser/registrouser.component';
import { RecuperarpasswComponent } from './components/recuperarpassw/recuperarpassw.component';
import { NavComponent } from './components/Navegacion/nav/nav.component';
import { DashboardComponent } from './components/Dash/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo:'login',pathMatch:'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registrar', component: RegistrouserComponent},
  { path: 'recuperar', component: RecuperarpasswComponent},
  { path: 'dash', component: DashboardComponent},
    { path: 'marcas', component: ListaMarcaComponent },
    { path: 'tiposdeVehiculo', component: ListaTipodevehiculosComponent },
    { path: 'modelos', component: ListaModeloComponent },
    { path: 'combustibles', component: ListaCombustibleComponent },
    { path: 'clientes', component: ListaClientesComponent },
    { path: 'documentos', component: ListaDocumentosComponent },
    { path: 'vehiculos' , component: ListVehiculosComponent },
    { path: 'empleados' , component: ListEmpleadosComponent },
    { path: 'rentas' , component: ListRentasComponent },
    { path: 'inspecciones' , component: ListInspeccionesComponent },
  { path: '**', redirectTo:'login',pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
