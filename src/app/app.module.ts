import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//services
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//Formularios
import {ReactiveFormsModule} from '@angular/forms'
//Peticiones
import {HttpClientModule} from '@angular/common/http'
//Matrial UI
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MomentDateModule } from '@angular/material-moment-adapter';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
//componentes
import { NavComponent } from './components/Navegacion/nav/nav.component'; 
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './components/Dash/dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { ListaMarcaComponent } from './components/Marca/lista-marca/lista-marca.component';
import { AddEditMarcaComponent } from './components/Marca/add-edit-marca/add-edit-marca.component';
import { DeleteComponent } from './components/Marca/delete/delete.component';
import { ListaTipodevehiculosComponent } from './components/tipodevehiculo/lista-tipodevehiculos/lista-tipodevehiculos.component';
import { AddEditTipoVehivuloComponent } from './components/tipodevehiculo/add-edit-tipo-vehivulo/add-edit-tipo-vehivulo.component';
import { DeleteTipovehiculoComponent } from './components/tipodevehiculo/delete-tipovehiculo/delete-tipovehiculo.component';
import { ListaModeloComponent } from './components/Modelo/lista-modelo/lista-modelo.component';
import { AddEditModeloComponent } from './components/Modelo/add-edit-modelo/add-edit-modelo.component';
import { DeleteModeloComponent } from './components/Modelo/delete-modelo/delete-modelo.component';
import { ListaCombustibleComponent } from './components/Combustibles/lista-combustible/lista-combustible.component';
import { AddEditCombustibleComponent } from './components/Combustibles/add-edit-combustible/add-edit-combustible.component';
import { DeleteCombustibleComponent } from './components/Combustibles/delete-combustible/delete-combustible.component';
import { ListaClientesComponent } from './components/Cliente/lista-clientes/lista-clientes.component';
import { AddEditClienteComponent } from './components/Cliente/add-edit-cliente/add-edit-cliente.component';
import { DeleteClienteComponent } from './components/Cliente/delete-cliente/delete-cliente.component';
import { ListaDocumentosComponent } from './components/Documento/lista-documentos/lista-documentos.component';
import { AddEditDocumentoComponent } from './components/Documento/add-edit-documento/add-edit-documento.component';
import { DeleteDocumentoComponent } from './components/Documento/delete-documento/delete-documento.component';
import { ListEmpleadosComponent } from './components/Empleado/list-empleados/list-empleados.component';
import { AddEditEmpleadoComponent } from './components/Empleado/add-edit-empleado/add-edit-empleado.component';
import { DeleteEmpleadoComponent } from './components/Empleado/delete-empleado/delete-empleado.component';
import { ListVehiculosComponent } from './components/Vehiculo/list-vehiculos/list-vehiculos.component';
import { AddEditVehiculoComponent } from './components/Vehiculo/add-edit-vehiculo/add-edit-vehiculo.component';
import { DeleteVehiculoComponent } from './components/Vehiculo/delete-vehiculo/delete-vehiculo.component';
import { ListRentasComponent } from './components/Renta/list-rentas/list-rentas.component';
import { AddEditRentaComponent } from './components/Renta/add-edit-renta/add-edit-renta.component';
import { DeleteRentaComponent } from './components/Renta/delete-renta/delete-renta.component';
import { ListInspeccionesComponent } from './components/Inspeccion/list-inspecciones/list-inspecciones.component';
import { AddEditInspeccionComponent } from './components/Inspeccion/add-edit-inspeccion/add-edit-inspeccion.component';
import { DeleteInspeccionComponent } from './components/Inspeccion/delete-inspeccion/delete-inspeccion.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrouserComponent } from './components/registrouser/registrouser.component';

import { AngularFireModule } from '@angular/fire/compat'
import { environment } from 'src/environments/environment';
import { AuthServiceService } from './services/auth-service.service';
import { FirestoreModule } from '@angular/fire/firestore'; 




@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    DashboardComponent,
    ListaMarcaComponent,
    AddEditMarcaComponent,
    DeleteComponent,
    ListaTipodevehiculosComponent,
    AddEditTipoVehivuloComponent,
    DeleteTipovehiculoComponent,
    ListaModeloComponent,
    AddEditModeloComponent,
    DeleteModeloComponent,
    ListaCombustibleComponent,
    AddEditCombustibleComponent,
    DeleteCombustibleComponent,
    ListaClientesComponent,
    AddEditClienteComponent,
    DeleteClienteComponent,
    ListaDocumentosComponent,
    AddEditDocumentoComponent,
    DeleteDocumentoComponent,
    ListEmpleadosComponent,
    AddEditEmpleadoComponent,
    DeleteEmpleadoComponent,
    ListVehiculosComponent,
    AddEditVehiculoComponent,
    DeleteVehiculoComponent,
    ListRentasComponent,
    AddEditRentaComponent,
    DeleteRentaComponent,
    ListInspeccionesComponent,
    AddEditInspeccionComponent,
    DeleteInspeccionComponent,
    LoginComponent,
    RegistrouserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FirestoreModule,
    MomentDateModule
  ],
  providers: [AuthServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
