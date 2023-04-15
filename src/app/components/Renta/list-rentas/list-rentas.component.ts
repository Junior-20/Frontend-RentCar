import {AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Renta } from 'src/app/interfaces/renta';
import { RentaService } from 'src/app/services/renta.service';
import {MatDialog} from '@angular/material/dialog';
import { AddEditRentaComponent } from '../add-edit-renta/add-edit-renta.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteRentaComponent } from '../delete-renta/delete-renta.component';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-list-rentas',
  templateUrl: './list-rentas.component.html',
  styleUrls: ['./list-rentas.component.css']
})
export class ListRentasComponent implements AfterViewInit,OnInit {
  displayedColumns: string[] = ['Idrenta', 'DocCliente', 
  'NombredeEmpleado','NombredeVehiculo','NombredeCliente','Fecharenta','Fechadevolucion',
  'Montopordia','Cantidaddedias','Abono','Comentario','Estado','acciones'];
  dataSource = new MatTableDataSource<Renta>();
  constructor(private Rentaservice:RentaService,public dialog: MatDialog,
    private _SnackBar:MatSnackBar
    ){
  }
  
  ngOnInit(): void {
    this.obtenerRentas();
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
      this.dialog.open(AddEditRentaComponent,{
        disableClose:true,
        width:"680px",
        height:"auto",
        
      }).afterClosed().subscribe(resultado=>{
        if(resultado==="creado"){
          this.obtenerRentas();
        }
      })
    }
    obtenerRentas() {
      this.Rentaservice.getRentas().subscribe(data => {
      this.dataSource.data = data;
      })
    }
    exportToExcel() {
      const fileName = 'alquiler_vehiculos.xlsx'; // Nombre del archivo Excel
      const sheetName = 'Datos'; // Nombre de la hoja en el archivo Excel
    
      // Obtén los datos de la tabla en formato JSON
      const data = this.dataSource.filteredData.map(item => {
        // Aquí puedes personalizar el formato de los datos que deseas exportar
        return {
          'ID': item.idRenta,
          'Doc. Cliente': item.docCliente,
          'Empleado': item.nombredeEmpleado,
          'Vehiculo': item.nombredeVehiculo,
          'Cliente': item.nombredeCliente,
          'Alquiler': item.fechaRenta,
          'Devolución': item.fechaDevolucion,
          'Monto x Día': item.montoxDia,
          'No. Días': item.cantidadDias,
          'Abono': item.abono,
          'Comentario': item.comentario,
          'Estado': item.estado
        };
      });
    
      // Crea un libro de Excel
      const workbook = XLSX.utils.book_new();
      // Crea una hoja en el libro de Excel
      const worksheet = XLSX.utils.json_to_sheet(data);
      // Añade la hoja al libro de Excel
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
      // Convierte el libro de Excel en un archivo binario
      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      // Crea un Blob con el archivo binario
      const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    
      // Crea un enlace de descarga y lo simula para descargar el archivo
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
      // Libera la URL del enlace de descarga
      URL.revokeObjectURL(link.href);
      link.remove();
    }
  
    EditarDialog(dataRenta:Renta) {
      this.dialog.open(AddEditRentaComponent,{
        disableClose:true,
        width:"680px",
        height:"auto",
        data:dataRenta
      }).afterClosed().subscribe(resultado=>{
        if(resultado==="editado"){
          this.obtenerRentas();
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
    EliminarDialog(dataRenta:Renta){
      this.dialog.open(DeleteRentaComponent,{
        disableClose:true,
        data:dataRenta
      }).afterClosed().subscribe(resultado=>{
        if(resultado==="Eliminar"){
          this.Rentaservice.deleteRenta(dataRenta.idRenta).subscribe({
            next:(data)=>{
              this.MostrarAlerta("Renta Eliminada","Listo")
              this.obtenerRentas();
            },error:(e)=>{
              this.MostrarAlerta("No se pudo Eliminar","Error");
            }
          })
        }
      })
    }
}
