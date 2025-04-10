import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-info-dialog',
  imports: [CommonModule, MatDialogModule, MatButtonModule],

  templateUrl: './info-dialog.component.html',
  styleUrl: './info-dialog.component.css'
})
export class InfoDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<InfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string }
  ) {}

}
