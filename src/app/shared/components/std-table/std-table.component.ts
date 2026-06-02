import { Component, OnInit } from '@angular/core';
import { Istudent } from '../../models/student';
import { StudentService } from '../../services/student.services';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetConfirmComponent } from '../get-confirm/get-confirm.component';
import { SnackBarService } from '../../services/snackbar.services';

@Component({
  selector: 'app-std-table',
  templateUrl: './std-table.component.html',
  styleUrls: ['./std-table.component.scss']
})
export class StdTableComponent implements OnInit {
  stdArr: Istudent[] = []

  constructor(
    private _stdService: StudentService,
    private _matDialog: MatDialog,
    private _snackBar: SnackBarService
  ) { }

  ngOnInit(): void {
    this._stdService.fetchStdArr()
      .subscribe({
        next: resp => {
          this.stdArr = resp;
        }
      })
  }

  trackByStdID(index: number, std: Istudent) {
    return std.stdID;
  }

  onRemove(removeId: string) {
    let config = new MatDialogConfig();
    config.data = `Are you sure to remove this student with id ${removeId}`;
    config.disableClose = true;
    config.width = '400px';
    let matDialogRef = this._matDialog.open(GetConfirmComponent, config);
    matDialogRef.afterClosed()
      .subscribe({
        next: resp => {
          if (resp) {
            this._stdService.removeStudent(removeId)
              .subscribe({
                next: resp => {
                  this._snackBar.openSnackBar(resp.msg);
                },
                error: err => {
                  this._snackBar.openSnackBar(err.msg);
                }
              })
          }
        }
      })
  }

  onEdit(editStd: Istudent){
    this._stdService.editStdSubj$.next(editStd);
  }

}
