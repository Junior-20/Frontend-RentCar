import { Component,Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Documento } from 'src/app/interfaces/documento';

@Component({
  selector: 'app-delete-documento',
  templateUrl: './delete-documento.component.html',
  styleUrls: ['./delete-documento.component.css']
})
export class DeleteDocumentoComponent {
  constructor( private dialogoReferencia:MatDialogRef<DeleteDocumentoComponent>,
    @Inject(MAT_DIALOG_DATA) public dataDocumento:Documento){
    }
    comfirmarDelete(){
      if(this.dataDocumento){
        this.dialogoReferencia.close("Eliminar")
      }
  }
}
