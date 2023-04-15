import {AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { TiposdeVehiculos } from 'src/app/interfaces/tiposde-vehiculos';
import {MatDialog} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TipodevehiculoService } from 'src/app/services/tipodevehiculo.service';
import { AddEditTipoVehivuloComponent } from '../add-edit-tipo-vehivulo/add-edit-tipo-vehivulo.component';
import { DeleteTipovehiculoComponent } from '../delete-tipovehiculo/delete-tipovehiculo.component';

@Component({
  selector: 'app-lista-tipodevehiculos',
  templateUrl: './lista-tipodevehiculos.component.html',
  styleUrls: ['./lista-tipodevehiculos.component.css']
})
export class ListaTipodevehiculosComponent implements AfterViewInit,OnInit {
  displayedColumns: string[] = ['IdTiposVehiculo', 'Descripcion', 'Estado','acciones'];
  dataSource = new MatTableDataSource<TiposdeVehiculos>();
  constructor(private tipodevehiculoservice:TipodevehiculoService,public dialog: MatDialog,
    private _SnackBar:MatSnackBar){
  }
  ngOnInit(): void {
    this.obtenerTiposdevehiculos();
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  openDialog() {
    this.dialog.open(AddEditTipoVehivuloComponent,{
      disableClose:true,
      width:"385px",
    }).afterClosed().subscribe(resultado=>{
      if(resultado==="creado"){
        this.obtenerTiposdevehiculos();
      }
    })
  }
  obtenerTiposdevehiculos() {
    this.tipodevehiculoservice.getTiposVehiculos().subscribe(data => {
    this.dataSource.data = data;
    })
  }

  EditarDialog(dataTipovehiculo:TiposdeVehiculos) {
    this.dialog.open(AddEditTipoVehivuloComponent,{
      disableClose:true,
      width:"385px",
      data:dataTipovehiculo
    }).afterClosed().subscribe(resultado=>{
      if(resultado==="editado"){
        this.obtenerTiposdevehiculos();
      }
    })
  }
  MostrarAlerta(msg: string, accion: string) {
    this._SnackBar.open(msg,accion,{
      horizontalPosition:"end",
      verticalPosition:"top",
      duration:3000
    });
  }
  EliminarDialog(dataTipovehiculo:TiposdeVehiculos){
    this.dialog.open(DeleteTipovehiculoComponent,{
      disableClose:true,
      data:dataTipovehiculo
    }).afterClosed().subscribe(resultado=>{
      if(resultado==="Eliminar"){
        this.tipodevehiculoservice.deleteTipoVehiculo(dataTipovehiculo.idTiposVehiculo).subscribe({
          next:(data)=>{
            this.MostrarAlerta("Tipo de Vehiculo Eliminado","Listo")
            this.obtenerTiposdevehiculos();
          },error:(e)=>{
            this.MostrarAlerta("No se pudo Eliminar","Error");
          }
        })
      }
    })
  }

}
