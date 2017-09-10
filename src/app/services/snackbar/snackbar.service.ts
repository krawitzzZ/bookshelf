import { Injectable } from '@angular/core';
import { MdSnackBar } from '@angular/material';

@Injectable()
export class SnackbarService {
  constructor(public snackbar: MdSnackBar) { }

  openSnackBar(message: string, duration: number, action: any = null): void {
    this.snackbar.open(message, action, {
      duration,
    });
  }
}
