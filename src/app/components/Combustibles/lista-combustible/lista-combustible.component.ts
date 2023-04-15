import {AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { TipodecombustibleService } from 'src/app/services/tipodecombustible.service';
import { TiposdeCombustible } from 'src/app/interfaces/tiposde-combustible';
import {MatDialog} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddEditCombustibleComponent } from '../add-edit-combustible/add-edit-combustible.component';
import { DeleteCombustibleComponent } from '../delete-combustible/delete-combustible.component';

@Component({
  selector: 'app-lista-combustible',
  templateUrl: './lista-combustible.component.html',
  styleUrls: ['./lista-combustible.component.css']
})
export class ListaCombustibleComponent implements AfterViewInit,OnInit {
  displayedColumns: string[] = ['IdTipodecombustible', 'Descripcion', 'Estado','acciones'];
  dataSource = new MatTableDataSource<TiposdeCombustible>();
  constructor(private combustibleservice:TipodecombustibleService,public dialog: MatDialog,
    private _SnackBar:MatSnackBar
    ){
  }
  ngOnInit(): void {
    this.obtenerCombustibles();
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
      this.dialog.open(AddEditCombustibleComponent,{
        disableClose:true,
        width:"280px",
        height:"340px"
      }).afterClosed().subscribe(resultado=>{
        if(resultado==="creado"){
          this.obtenerCombustibles();
        }
      })
    }
    obtenerCombustibles() {
      this.combustibleservice.getCombustibles().subscribe(data => {
      this.dataSource.data = data;
      })
    }
  
    EditarDialog(dataCombustible:TiposdeCombustible) {
      this.dialog.open(AddEditCombustibleComponent,{
        disableClose:true,
        width:"280px",
        data:dataCombustible
      }).afterClosed().subscribe(resultado=>{
        if(resultado==="editado"){
          this.obtenerCombustibles();
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
    EliminarDialog(dataCombustible:TiposdeCombustible){
      this.dialog.open(DeleteCombustibleComponent,{
        disableClose:true,
        data:dataCombustible
      }).afterClosed().subscribe(resultado=>{
        if(resultado==="Eliminar"){
          this.combustibleservice.deleteCombustible(dataCombustible.idTiposCombustible).subscribe({
            next:(data)=>{
              this.MostrarAlerta("Combustible Eliminado","Listo")
              this.obtenerCombustibles();
            },error:(e)=>{
              this.MostrarAlerta("No se pudo Eliminar","Error");
            }
          })
        }
      })
    }
    
}
