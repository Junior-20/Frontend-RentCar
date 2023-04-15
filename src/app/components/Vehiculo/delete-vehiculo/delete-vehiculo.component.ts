import { Component,Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Vehiculos } from 'src/app/interfaces/vehiculos';

@Component({
  selector: 'app-delete-vehiculo',
  templateUrl: './delete-vehiculo.component.html',
  styleUrls: ['./delete-vehiculo.component.css']
})
export class DeleteVehiculoComponent {
  constructor( private dialogoReferencia:MatDialogRef<DeleteVehiculoComponent>,
    @Inject(MAT_DIALOG_DATA) public dataVehiculo:Vehiculos){
    }
    comfirmarDelete(){
      if(this.dataVehiculo){
        this.dialogoReferencia.close("Eliminar")
      }
  }
}
