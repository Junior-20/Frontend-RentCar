import { Component,Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inspeccion } from 'src/app/interfaces/inspeccion';

@Component({
  selector: 'app-delete-inspeccion',
  templateUrl: './delete-inspeccion.component.html',
  styleUrls: ['./delete-inspeccion.component.css']
})
export class DeleteInspeccionComponent {
  constructor( private dialogoReferencia:MatDialogRef<DeleteInspeccionComponent>,
    @Inject(MAT_DIALOG_DATA) public dataIns:Inspeccion){
    }
    comfirmarDelete(){
      if(this.dataIns){
        this.dialogoReferencia.close("Eliminar")
      }
  }
}
