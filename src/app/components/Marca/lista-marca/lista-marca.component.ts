
import {AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Marca } from 'src/app/interfaces/marca';
import { MarcaService } from 'src/app/services/marca.service';
import {MatDialog} from '@angular/material/dialog';
import { AddEditMarcaComponent } from '../add-edit-marca/add-edit-marca.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteComponent } from '../delete/delete.component';


@Component({
  selector: 'app-lista-marca',
  templateUrl: './lista-marca.component.html',
  styleUrls: ['./lista-marca.component.css']
})
export class ListaMarcaComponent  implements AfterViewInit,OnInit{
  displayedColumns: string[] = ['IdMarca', 'Descripcion', 'Estado','acciones'];
  dataSource = new MatTableDataSource<Marca>();
  constructor(private marcaservice:MarcaService,public dialog: MatDialog,
    private _SnackBar:MatSnackBar
    ){

  }
ngOnInit(): void {
  this.obtenerMarcas();
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
    this.dialog.open(AddEditMarcaComponent,{
      disableClose:true,
      width:"280px",
      height:"340px"
    }).afterClosed().subscribe(resultado=>{
      if(resultado==="creado"){
        this.obtenerMarcas();
      }
    })
  }
  obtenerMarcas() {
    this.marcaservice.getMarcas().subscribe(data => {
    this.dataSource.data = data;
    })
  }

  EditarDialog(dataMarca:Marca) {
    console.log("Valor de dataMarca:", dataMarca);
    this.dialog.open(AddEditMarcaComponent,{
      disableClose:true,
      width:"280px",
      data:dataMarca
    }).afterClosed().subscribe(resultado=>{
      if(resultado==="editado"){
        this.obtenerMarcas();
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
  EliminarDialog(datamarca:Marca){
    console.log("Valor de dataMarca:", datamarca);
    this.dialog.open(DeleteComponent,{
      disableClose:true,
      data:datamarca
    }).afterClosed().subscribe(resultado=>{
      if(resultado==="Eliminar"){
        this.marcaservice.deleteMarca(datamarca.idMarca).subscribe({
          next:(data)=>{
            this.MostrarAlerta("Marca Eliminada","Listo")
            this.obtenerMarcas();
          },error:(e)=>{
            this.MostrarAlerta("No se pudo Eliminar","Error");
          }
        })
      }
    })
  }
  
}


