import { Component,Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Empleados } from 'src/app/interfaces/empleados';

@Component({
  selector: 'app-delete-empleado',
  templateUrl: './delete-empleado.component.html',
  styleUrls: ['./delete-empleado.component.css']
})
export class DeleteEmpleadoComponent {
  constructor( private dialogoReferencia:MatDialogRef<DeleteEmpleadoComponent>,
    @Inject(MAT_DIALOG_DATA) public dataEmpleado:Empleados){
    }
    comfirmarDelete(){
      if(this.dataEmpleado){
        this.dialogoReferencia.close("Eliminar")
      }
  }
}
