import {AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/interfaces/cliente';
import {MatDialog} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddEditClienteComponent } from '../add-edit-cliente/add-edit-cliente.component';
import { DeleteClienteComponent } from '../delete-cliente/delete-cliente.component';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent implements AfterViewInit,OnInit {
  displayedColumns: string[] = ['IdCliente', 'Nombre', 'Cedula','TipoPersona','NoTarjeta','LimiteCredito','Estado','acciones'];
  dataSource = new MatTableDataSource<Cliente>();
  constructor(private clienteservice:ClienteService,public dialog: MatDialog,
    private _SnackBar:MatSnackBar
    ){
  }
  ngOnInit(): void {
    this.obtenerClientes();
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
      this.dialog.open(AddEditClienteComponent,{
        disableClose:true,
        width:"540px",
        height:"auto",
      }).afterClosed().subscribe(resultado=>{
        if(resultado==="creado"){
          this.obtenerClientes();
        }
      })
    }
    obtenerClientes() {
      this.clienteservice.getClientes().subscribe(data => {
      this.dataSource.data = data;
      })
    }
  
    EditarDialog(dataCliente:Cliente) {
      this.dialog.open(AddEditClienteComponent,{
        disableClose:true,
        width:"550px",
        height:"450px",
        data:dataCliente
      }).afterClosed().subscribe(resultado=>{
        if(resultado==="editado"){
          this.obtenerClientes();
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
    EliminarDialog(dataCliente:Cliente){
      this.dialog.open(DeleteClienteComponent,{
        disableClose:true,
        data:dataCliente
      }).afterClosed().subscribe(resultado=>{
        if(resultado==="Eliminar"){
          this.clienteservice.deleteCliente(dataCliente.idcliente).subscribe({
            next:(data)=>{
              this.MostrarAlerta("Cliente Eliminado","Listo")
              this.obtenerClientes();
            },error:(e)=>{
              this.MostrarAlerta("No se pudo Eliminar","Error");
            }
          })
        }
      })
    }
    
}
