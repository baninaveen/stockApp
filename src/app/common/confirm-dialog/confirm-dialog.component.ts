import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

    company: string;
    symbol: string;

    constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
      this.company = data.company;
      this.symbol = data.symbol;
    }

    ngOnInit() {
    }

    onConfirm(): void {
      this.dialogRef.close(true);
    }

    onDismiss(): void {
      this.dialogRef.close(false);
    }
}
