
import {AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Modelos } from 'src/app/interfaces/modelos';
import { ModeloService } from 'src/app/services/modelo.service';
import {MatDialog} from '@angular/material/dialog';
import { AddEditModeloComponent } from '../add-edit-modelo/add-edit-modelo.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteModeloComponent } from '../delete-modelo/delete-modelo.component';

@Component({
  selector: 'app-lista-modelo',
  templateUrl: './lista-modelo.component.html',
  styleUrls: ['./lista-modelo.component.css']
})
export class ListaModeloComponent  implements AfterViewInit,OnInit {
  displayedColumns: string[] = ['IdModelo', 'Nombre de Marca', 'Descripcion','Estado','acciones'];
  dataSource = new MatTableDataSource<Modelos>();
  constructor(private modeloservice:ModeloService,public dialog: MatDialog,
    private _SnackBar:MatSnackBar
    ){
  }
  ngOnInit(): void {
    this.obtenerModelos();
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
      this.dialog.open(AddEditModeloComponent,{
        disableClose:true,
        width:"360px",
        
      }).afterClosed().subscribe(resultado=>{
        if(resultado==="creado"){
          this.obtenerModelos();
        }
      })
    }
    obtenerModelos() {
      this.modeloservice.getModelos().subscribe(data => {
      this.dataSource.data = data;
      })
    }
  
    EditarDialog(dataModelo:Modelos) {
      this.dialog.open(AddEditModeloComponent,{
        disableClose:true,
        width:"360px",
        data:dataModelo
      }).afterClosed().subscribe(resultado=>{
        if(resultado==="editado"){
          this.obtenerModelos();
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
    EliminarDialog(dataModelo:Modelos){
      this.dialog.open(DeleteModeloComponent,{
        disableClose:true,
        data:dataModelo
      }).afterClosed().subscribe(resultado=>{
        if(resultado==="Eliminar"){
          this.modeloservice.deleteModelo(dataModelo.idModelo).subscribe({
            next:(data)=>{
              this.MostrarAlerta("Modelo Eliminado","Listo")
              this.obtenerModelos();
            },error:(e)=>{
              this.MostrarAlerta("No se pudo Eliminar","Error");
            }
          })
        }
      })
    }

}
