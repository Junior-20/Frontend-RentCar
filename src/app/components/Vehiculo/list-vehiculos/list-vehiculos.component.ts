import {AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Vehiculos } from 'src/app/interfaces/vehiculos';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import {MatDialog} from '@angular/material/dialog';
import { AddEditVehiculoComponent } from '../add-edit-vehiculo/add-edit-vehiculo.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteVehiculoComponent } from '../delete-vehiculo/delete-vehiculo.component';

@Component({
  selector: 'app-list-vehiculos',
  templateUrl: './list-vehiculos.component.html',
  styleUrls: ['./list-vehiculos.component.css']
})
export class ListVehiculosComponent implements AfterViewInit,OnInit {
  displayedColumns: string[] = ['IdVehiculo', 'Descripcion', 
  'Nochasis','Nomotor','Noplaca','Tipodevehiculo','Nombredemarca',
  'Nombremodelo','Tipocombustible','Estado','acciones'];
  dataSource = new MatTableDataSource<Vehiculos>();
  constructor(private vehiculoservice:VehiculoService,public dialog: MatDialog,
    private _SnackBar:MatSnackBar
    ){
  }
  
  ngOnInit(): void {
    this.obtenerVehiculos();
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
      this.dialog.open(AddEditVehiculoComponent,{
        disableClose:true,
        width:"680px",
        height:"auto",
        
      }).afterClosed().subscribe(resultado=>{
        if(resultado==="creado"){
          this.obtenerVehiculos();
        }
      })
    }
    obtenerVehiculos() {
      this.vehiculoservice.getVehiculos().subscribe(data => {
      this.dataSource.data = data;
      })
    }
  
    EditarDialog(dataVehiculo:Vehiculos) {
      this.dialog.open(AddEditVehiculoComponent,{
        disableClose:true,
        width:"680px",
        height:"auto",
        data:dataVehiculo
      }).afterClosed().subscribe(resultado=>{
        if(resultado==="editado"){
          this.obtenerVehiculos();
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
    EliminarDialog(dataVehiculo:Vehiculos){
      this.dialog.open(DeleteVehiculoComponent,{
        disableClose:true,
        data:dataVehiculo
      }).afterClosed().subscribe(resultado=>{
        if(resultado==="Eliminar"){
          this.vehiculoservice.deleteVehiculo(dataVehiculo.idVehiculos).subscribe({
            next:(data)=>{
              this.MostrarAlerta("Vehiculo Eliminado","Listo")
              this.obtenerVehiculos();
            },error:(e)=>{
              this.MostrarAlerta("No se pudo Eliminar","Error");
            }
          })
        }
      })
    }
}
