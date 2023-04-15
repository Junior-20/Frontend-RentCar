import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Inspeccion } from 'src/app/interfaces/inspeccion';
import { InspeccionService } from 'src/app/services/inspeccion.service';
import { Empleados } from 'src/app/interfaces/empleados';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { Cliente } from 'src/app/interfaces/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { Vehiculos } from 'src/app/interfaces/vehiculos';
import { VehiculoService } from 'src/app/services/vehiculo.service';
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
  selector: 'app-add-edit-inspeccion',
  templateUrl: './add-edit-inspeccion.component.html',
  styleUrls: ['./add-edit-inspeccion.component.css'],
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
export class AddEditInspeccionComponent implements OnInit {
  formIns:FormGroup;
  tituloAccion:string="Nueva"
  botonAccion:string="Guardar"
  listClientes:Cliente[]=[];
  listEmpleados:Empleados[]=[];
  listVehiculos:Vehiculos[]=[];
  constructor(private dialogoReferencia:MatDialogRef<AddEditInspeccionComponent>,
    private fb:FormBuilder,
    private _SnackBar:MatSnackBar,
    private _clienteServices:ClienteService,
    private _EmpleadoSevice:EmpleadoService,
    private _InspeccionService: InspeccionService,
    private _VehiculoService:VehiculoService,
    @Inject(MAT_DIALOG_DATA) public dataIns:Inspeccion
    ){
  this.formIns= this.fb.group({
    vehiculo: ['', Validators.required],
    idCliente: ['', Validators.required],
    tieneRalladuras: ['', Validators.required],
    cantidadCombustible: ['', Validators.required],
    gomaRespuesta: ['', Validators.required],
    gato: ['', Validators.required],
    roturas: ['', Validators.required],
    estadoGomas: ['', Validators.required],
    fecha: ['', Validators.required],
    empleadoInspeccion: ['', Validators.required],
    estado: ['', Validators.required]
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
    if(this.dataIns){
      this.formIns.patchValue({
        vehiculo: this.dataIns.vehiculo,
        idCliente: this.dataIns.idCliente,
        tieneRalladuras: this.dataIns.tieneRalladuras,
        cantidadCombustible: this.dataIns.cantidadCombustible,
        gomaRespuesta: this.dataIns.gomaRespuesta,
        gato: this.dataIns.gato,
        roturas: this.dataIns.roturas,
        estadoGomas: this.dataIns.estadoGomas,
        fecha: this.dataIns.fecha,
        empleadoInspeccion: this.dataIns.empleadoInspeccion,
        estado: this.dataIns.estado,
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
  addIns(){
    const modelo: Inspeccion = {
      idTransaccion:0,
        vehiculo: this.formIns.value.vehiculo,
        idCliente: this.formIns.value.idCliente,
        tieneRalladuras: this.formIns.value.tieneRalladuras,
        cantidadCombustible: this.formIns.value.cantidadCombustible,
        gomaRespuesta: this.formIns.value.gomaRespuesta,
        gato: this.formIns.value.gato,
        roturas: this.formIns.value.roturas,
        estadoGomas: this.formIns.value.estadoGomas,
        fecha: this.formIns.value.fecha,
        empleadoInspeccion: this.formIns.value.empleadoInspeccion,
        estado: this.formIns.value.estado,
      
    }
    if(this.dataIns== null){
      this._InspeccionService.addInspeccion(modelo).subscribe({
        next:(data)=>{
          this.MostrarAlerta("Inspeccion creada","Listo");
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
      this._InspeccionService.updateInspeccion(this.dataIns.idTransaccion,modelo).subscribe({
        next:(data)=>{
          this.MostrarAlerta("Inspeccion Editado","Listo");
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
