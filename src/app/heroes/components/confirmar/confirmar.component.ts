import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Heroes } from '../../interfaces/heroes.interfaces';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styleUrls: ['./confirmar.component.scss'],
})
export class ConfirmarComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ConfirmarComponent>,
          //  @Inject(MAT_DIALOG_DATA)quien sea q llame el dialogo - public data: tipo de dato y almacenada en data) {}
              @Inject(MAT_DIALOG_DATA) public data: Heroes) {}

  ngOnInit(): void {
  }

  borrar(): void {
    this.dialogRef.close(this.data);
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}
