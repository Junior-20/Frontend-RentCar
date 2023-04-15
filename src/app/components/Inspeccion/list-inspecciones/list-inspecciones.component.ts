import {AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Inspeccion } from 'src/app/interfaces/inspeccion';
import { InspeccionService } from 'src/app/services/inspeccion.service';
import {MatDialog} from '@angular/material/dialog';
import { AddEditInspeccionComponent } from '../add-edit-inspeccion/add-edit-inspeccion.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteInspeccionComponent } from '../delete-inspeccion/delete-inspeccion.component';

@Component({
  selector: 'app-list-inspecciones',
  templateUrl: './list-inspecciones.component.html',
  styleUrls: ['./list-inspecciones.component.css']
})
export class ListInspeccionesComponent implements AfterViewInit,OnInit {
  displayedColumns: string[] = ['Idtransaccion','NombredeVehiculo','NombredeCliente',  
  'Tieneralladuras','Cantidadcombustible','Gomaderepuesta','Gato','Roturas',
  'Estadogomas','Fecha','Nombreempleado','Estado','acciones'];
  dataSource = new MatTableDataSource<Inspeccion>();
  constructor(private Inspeccionservice:InspeccionService,public dialog: MatDialog,
    private _SnackBar:MatSnackBar
    ){
  }
  
  ngOnInit(): void {
    this.obtenerInspecciones();
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
      this.dialog.open(AddEditInspeccionComponent,{
        disableClose:true,
        width:"680px",
        height:"auto",
        
      }).afterClosed().subscribe(resultado=>{
        if(resultado==="creado"){
          this.obtenerInspecciones();
        }
      })
    }
    obtenerInspecciones() {
      this.Inspeccionservice.getInspecciones().subscribe(data => {
      this.dataSource.data = data;
      })
    }

    EditarDialog(dataIns:Inspeccion) {
      this.dialog.open(AddEditInspeccionComponent,{
        disableClose:true,
        width:"680px",
        height:"auto",
        data:dataIns
      }).afterClosed().subscribe(resultado=>{
        if(resultado==="editado"){
          this.obtenerInspecciones();
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
    EliminarDialog(dataIns:Inspeccion){
      this.dialog.open(DeleteInspeccionComponent,{
        disableClose:true,
        data:dataIns
      }).afterClosed().subscribe(resultado=>{
        if(resultado==="Eliminar"){
          this.Inspeccionservice.deleteInspeccion(dataIns.idTransaccion).subscribe({
            next:(data)=>{
              this.MostrarAlerta("Inspeccion Eliminada","Listo")
              this.obtenerInspecciones();
            },error:(e)=>{
              this.MostrarAlerta("No se pudo Eliminar","Error");
            }
          })
        }
      })
    }
}
