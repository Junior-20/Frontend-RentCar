import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { Empleados } from 'src/app/interfaces/empleados';
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
  selector: 'app-add-edit-empleado',
  templateUrl: './add-edit-empleado.component.html',
  styleUrls: ['./add-edit-empleado.component.css'],
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
export class AddEditEmpleadoComponent implements OnInit {
  formEmpleado:FormGroup;
  tituloAccion:string="Nuevo"
  botonAccion:string="Guardar"
constructor(private dialogoReferencia:MatDialogRef<AddEditEmpleadoComponent>,
  private fb:FormBuilder,
  private _SnackBar:MatSnackBar,
  private _empleadoService:EmpleadoService,
  @Inject(MAT_DIALOG_DATA) public dataEmpleado:Empleados
  ){
this.formEmpleado= this.fb.group({
  nombre: ['', Validators.required],
  cedula: ['', Validators.required],
  tandaLabor: ['', Validators.required],
  porcientoComision: ['', Validators.required],
  fechaIngreso: ['', Validators.required],
  estado: ['', Validators.required]
})
}
ngOnInit(): void {
  if(this.dataEmpleado){
    this.formEmpleado.patchValue({
      nombre: this.dataEmpleado.nombre,
      cedula: this.dataEmpleado.cedula,
      tandaLabor: this.dataEmpleado.tandaLabor,
      porcientoComision: this.dataEmpleado.porcientoComision,
      fechaIngreso: this.dataEmpleado.fechaIngreso,
      estado: this.dataEmpleado.estado

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
addEmpleado(){
  const modelo: Empleados = {
    idEmpleado:0,
    nombre: this.formEmpleado.value.nombre,
    cedula: this.formEmpleado.value.cedula,
    tandaLabor: this.formEmpleado.value.tandaLabor,
    porcientoComision: this.formEmpleado.value.porcientoComision,
    fechaIngreso: this.formEmpleado.value.fechaIngreso,
    estado: this.formEmpleado.value.estado
  }
  if(this.dataEmpleado== null){
    this._empleadoService.addEmpleado(modelo).subscribe({
      next:(data)=>{
        this.MostrarAlerta("Empleado creado","Listo");
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
    this._empleadoService.updateEmpleado(this.dataEmpleado.idEmpleado,modelo).subscribe({
      next:(data)=>{
        this.MostrarAlerta("Empleado Editado","Listo");
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
