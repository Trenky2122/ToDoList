import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private _snackBar: MatSnackBar) { }

  public showMessage(message: string){
    this._snackBar.open(message, undefined,{
      panelClass: "snackBarMessage",
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3500
    });
  }

  public showError(message: string){
    this._snackBar.open(message, undefined,{
      panelClass: "snackBarError",
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3500
    });
  }
}
