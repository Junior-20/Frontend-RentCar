import {AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { Empleados } from 'src/app/interfaces/empleados';
import {MatDialog} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddEditEmpleadoComponent } from '../add-edit-empleado/add-edit-empleado.component';
import { DeleteEmpleadoComponent } from '../delete-empleado/delete-empleado.component';


@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css']
})
export class ListEmpleadosComponent implements AfterViewInit,OnInit {
  displayedColumns: string[] = ['IdEmpleado', 'Nombre', 'Cedula','TandaLabor','PorcientoComi','FechaIngreso','Estado','acciones'];
  dataSource = new MatTableDataSource<Empleados>();
  constructor(private empleadoservice:EmpleadoService,public dialog: MatDialog,
    private _SnackBar:MatSnackBar
    ){
   
  }
  ngOnInit(): void {
    this.obtenerEmpleados();
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
      this.dialog.open(AddEditEmpleadoComponent,{
        disableClose:true,
        width:"540px",
        height:"auto",
      }).afterClosed().subscribe(resultado=>{
        if(resultado==="creado"){
          this.obtenerEmpleados();
        }
      })
    }
    obtenerEmpleados() {
      this.empleadoservice.getEmpleados().subscribe(data => {
      this.dataSource.data = data;
      })
    }
   
  
    EditarDialog(dataEmpleado:Empleados) {
      this.dialog.open(AddEditEmpleadoComponent,{
        disableClose:true,
        width:"550px",
        height:"450px",
        data:dataEmpleado
      }).afterClosed().subscribe(resultado=>{
        if(resultado==="editado"){
          this.obtenerEmpleados();
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
    EliminarDialog(dataEmpleado:Empleados){
      this.dialog.open(DeleteEmpleadoComponent,{
        disableClose:true,
        data:dataEmpleado
      }).afterClosed().subscribe(resultado=>{
        if(resultado==="Eliminar"){
          this.empleadoservice.deleteEmpleado(dataEmpleado.idEmpleado).subscribe({
            next:(data)=>{
              this.MostrarAlerta("Empleado Eliminado","Listo")
              this.obtenerEmpleados();
            },error:(e)=>{
              this.MostrarAlerta("No se pudo Eliminar","Error");
            }
          })
        }
      })
    }
    
}
