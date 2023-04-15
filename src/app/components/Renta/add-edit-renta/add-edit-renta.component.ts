import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Renta } from 'src/app/interfaces/renta';
import { Documento } from 'src/app/interfaces/documento';
import { DocumentoService } from 'src/app/services/documento.service';
import { Empleados } from 'src/app/interfaces/empleados';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { Cliente } from 'src/app/interfaces/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { Vehiculos } from 'src/app/interfaces/vehiculos';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { RentaService } from 'src/app/services/renta.service';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-add-edit-renta',
  templateUrl: './add-edit-renta.component.html',
  styleUrls: ['./add-edit-renta.component.css'],
  providers:[
    {
      provide: MAT_DATE_FORMATS,
      useValue: MY_DATE_FORMATS,
    },
    {
      provide: MomentDateAdapter,
      useClass: MomentDateAdapter,
    }
  ]
})
export class AddEditRentaComponent  implements OnInit{
  formRenta:FormGroup;
  tituloAccion:string="Nueva"
  botonAccion:string="Guardar"
  listDoc:Documento[]=[];
  listClientes:Cliente[]=[];
  listEmpleados:Empleados[]=[];
  listVehiculos:Vehiculos[]=[];
  constructor(private dialogoReferencia:MatDialogRef<AddEditRentaComponent>,
    private fb:FormBuilder,
    private _SnackBar:MatSnackBar,
    private _documentoServices:DocumentoService,
    private _clienteServices:ClienteService,
    private _EmpleadoSevice:EmpleadoService,
    private _rentaService:RentaService,
    private _VehiculoService:VehiculoService,
    @Inject(MAT_DIALOG_DATA) public dataRenta:Renta
    ){
  this.formRenta= this.fb.group({
    docGarantia:['', Validators.required],
    empleado: ['', Validators.required],
    vehiculo: ['', Validators.required],
    cliente: ['', Validators.required],
    fechaRenta: ['', Validators.required],
    fechaDevolucion: ['', Validators.required],
    montoxDia: ['', Validators.required],
    cantidadDias: ['', Validators.required],
    abono: ['', Validators.required],
    comentario: ['', Validators.required],
    estado: ['', Validators.required]
  })
  this._documentoServices.getDocumentos().subscribe({
    next:(data)=>{
      this.listDoc=data
    },error:(e)=>{}
  })
  this._clienteServices.getClientes().subscribe({
    next:(data)=>{
      this.listClientes=data
    },error:(e)=>{}
  })
  this._EmpleadoSevice.getEmpleados().subscribe({
    next:(data)=>{
      this.listEmpleados=data
    },error:(e)=>{}
  })
  this._VehiculoService.getVehiculos().subscribe({
    next:(data)=>{
      this.listVehiculos = data.filter(vehiculo => vehiculo.estado === 'Disponible');
    },error:(e)=>{}
  })
  }
  ngOnInit(): void {
    if(this.dataRenta){
      this.formRenta.patchValue({
    docGarantia:this.dataRenta.docGarantia,
    empleado: this.dataRenta.empleado,
    vehiculo: this.dataRenta.vehiculo,
    cliente: this.dataRenta.cliente,
    fechaRenta: this.dataRenta.fechaRenta,
    fechaDevolucion: this.dataRenta.fechaDevolucion,
    montoxDia: this.dataRenta.montoxDia,
    cantidadDias: this.dataRenta.cantidadDias,
    abono: this.dataRenta.abono,
    comentario:this.dataRenta.comentario,
    estado: this.dataRenta.estado
      });
      this.tituloAccion = "Editar";
      this.botonAccion = "Actualizar";
    }
  }
  MostrarAlerta(msg: string, accion: string) {
    this._SnackBar.open(msg,accion,{
      horizontalPosition:"end",
      verticalPosition:"top",
      duration:3000
    });
  }
  addRenta(){
    const modelo: Renta = {
      idRenta:0,
      docGarantia:this.formRenta.value.docGarantia,
      empleado: this.formRenta.value.empleado,
      vehiculo: this.formRenta.value.vehiculo,
      cliente: this.formRenta.value.cliente,
      fechaRenta: this.formRenta.value.fechaRenta,
      fechaDevolucion: this.formRenta.value.fechaDevolucion,
      montoxDia: this.formRenta.value.montoxDia,
      cantidadDias: this.formRenta.value.cantidadDias,
      abono: this.formRenta.value.abono,
      comentario:this.formRenta.value.comentario,
      estado: this.formRenta.value.estado
      
    }
    if(this.dataRenta== null){
      this._rentaService.addRenta(modelo).subscribe({
        next:(data)=>{
          this.MostrarAlerta("Renta creada","Listo");
          this.dialogoReferencia.close("creado");
        },error:(e)=>{
         if (e.status === 400) { 
          const validationErrors = e.error.errors; 
          let errorMsg = '';
          for (const fieldName in validationErrors) { 
            if (validationErrors.hasOwnProperty(fieldName)) {
              const errors = validationErrors[fieldName];
              for (const error of errors) {
                errorMsg += `${error}\n`;
              }
            }
          }
          this.MostrarAlerta(errorMsg, 'Cerrar'); 
        }
        }
      })
    }else{
      this._rentaService.updateRenta(this.dataRenta.idRenta,modelo).subscribe({
        next:(data)=>{
          this.MostrarAlerta("Renta Editado","Listo");
          this.dialogoReferencia.close("editado");
        },error:(e)=>{
          if (e.status === 400) { 
            const validationErrors = e.error.errors; 
            let errorMsg = '';
            for (const fieldName in validationErrors) { 
              if (validationErrors.hasOwnProperty(fieldName)) {
                const errors = validationErrors[fieldName];
                for (const error of errors) {
                  errorMsg += `${error}\n`;
                }
              }
            }
            this.MostrarAlerta(errorMsg, 'Cerrar'); 
          }
        }
      })
    }
  }
}
