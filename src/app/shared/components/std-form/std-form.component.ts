import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Istudent } from '../../models/student';
import { StudentService } from '../../services/student.services';
import { SnackBarService } from '../../services/snackbar.services';

@Component({
  selector: 'app-std-form',
  templateUrl: './std-form.component.html',
  styleUrls: ['./std-form.component.scss']
})
export class StdFormComponent implements OnInit {
  editMode: boolean = false
  @ViewChild('stdForm') stdForm !: NgForm
  editStdObj !: Istudent;

  constructor(
    private _stdService: StudentService,
    private _snackBar: SnackBarService
  ) { }

  ngOnInit(): void {
    this.patchStdData()
  }

  patchStdData() {
    this._stdService.editStdSubj$.subscribe({
      next: resp => {
        this.editStdObj = resp;
        this.editMode = true;
        this.stdForm.form.patchValue(resp)
      }
    })
  }

  onSubmit() {
    if (this.stdForm.valid) {
      let newStd: Istudent = { ...this.stdForm.form.value, stdID: Date.now().toString() }
      this._stdService.addStudent(newStd)
        .subscribe({
          next: resp => {
            this._snackBar.openSnackBar(resp.msg);
            this.stdForm.resetForm();
          },
          error: err => {
            this._snackBar.openSnackBar(err.msg);
          }
        })
    }
  }

  onupdate() {
    if (this.stdForm.valid) {
      let updatedStd: Istudent = { ...this.stdForm.form.value, stdID: this.editStdObj.stdID }
      this._stdService.updateStudent(updatedStd)
        .subscribe({
          next: resp => {
            this._snackBar.openSnackBar(resp.msg);
            this.editMode = false;
            this.stdForm.resetForm();
          }
        })
    }
  }

}
