
import {AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Documento } from 'src/app/interfaces/documento';
import { DocumentoService } from 'src/app/services/documento.service';
import {MatDialog} from '@angular/material/dialog';
import { AddEditDocumentoComponent } from '../add-edit-documento/add-edit-documento.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteDocumentoComponent } from '../delete-documento/delete-documento.component';

@Component({
  selector: 'app-lista-documentos',
  templateUrl: './lista-documentos.component.html',
  styleUrls: ['./lista-documentos.component.css']
})
export class ListaDocumentosComponent  implements AfterViewInit,OnInit {
  displayedColumns: string[] = ['IdDocumento', 'Descripcion', 'Estado','acciones'];
  dataSource = new MatTableDataSource<Documento>();
  constructor(private documentoservice:DocumentoService,public dialog: MatDialog,
    private _SnackBar:MatSnackBar
    ){

  }
ngOnInit(): void {
  this.obtenerDocumentos();
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
    this.dialog.open(AddEditDocumentoComponent,{
      disableClose:true,
      width:"280px",
      height:"340px"
    }).afterClosed().subscribe(resultado=>{
      if(resultado==="creado"){
        this.obtenerDocumentos();
      }
    })
  }
  obtenerDocumentos() {
    this.documentoservice.getDocumentos().subscribe(data => {
    this.dataSource.data = data;
    })
  }

  EditarDialog(dataDocumento:Documento) {
    this.dialog.open(AddEditDocumentoComponent,{
      disableClose:true,
      width:"280px",
      data:dataDocumento
    }).afterClosed().subscribe(resultado=>{
      if(resultado==="editado"){
        this.obtenerDocumentos();
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
  EliminarDialog(dataDocumento:Documento){
    this.dialog.open(DeleteDocumentoComponent,{
      disableClose:true,
      data:dataDocumento
    }).afterClosed().subscribe(resultado=>{
      if(resultado==="Eliminar"){
        this.documentoservice.deleteDocumento(dataDocumento.idDocumento).subscribe({
          next:(data)=>{
            this.MostrarAlerta("Documento Eliminado","Listo")
            this.obtenerDocumentos();
          },error:(e)=>{
            this.MostrarAlerta("No se pudo Eliminar","Error");
          }
        })
      }
    })
  }
}
