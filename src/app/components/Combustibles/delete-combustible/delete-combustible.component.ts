import { Component,Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TiposdeCombustible } from 'src/app/interfaces/tiposde-combustible';
@Component({
  selector: 'app-delete-combustible',
  templateUrl: './delete-combustible.component.html',
  styleUrls: ['./delete-combustible.component.css']
})
export class DeleteCombustibleComponent {
  constructor( private dialogoReferencia:MatDialogRef<DeleteCombustibleComponent>,
    @Inject(MAT_DIALOG_DATA) public dataCombustible:TiposdeCombustible){
    }
    comfirmarDelete(){
      if(this.dataCombustible){
        this.dialogoReferencia.close("Eliminar")
      }
  }
}
