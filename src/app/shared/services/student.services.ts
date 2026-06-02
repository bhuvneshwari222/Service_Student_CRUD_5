import { Injectable } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import { IstdResp, Istudent } from "../models/student";


@Injectable({
    providedIn: 'root'
})
export class StudentService {
    studentsData: Istudent[] = [
        {
            stdID: "S101",
            fname: "Aarav",
            lname: "Sharma",
            email: "aarav@gmail.com",
            contact: "9876543210",
            isActive: true
        },
        {
            stdID: "S102",
            fname: "Anaya",
            lname: "Patil",
            email: "anaya@gmail.com",
            contact: "9876543211",
            isActive: false
        },
        {
            stdID: "S103",
            fname: "Vivaan",
            lname: "Joshi",
            email: "vivaan@gmail.com",
            contact: "9876543212",
            isActive: true
        },
        {
            stdID: "S104",
            fname: "Ishita",
            lname: "Kulkarni",
            email: "ishita@gmail.com",
            contact: "9876543213",
            isActive: true
        },
        {
            stdID: "S105",
            fname: "Aditya",
            lname: "Deshmukh",
            email: "aditya@gmail.com",
            contact: "9876543214",
            isActive: false
        }
    ];

    editStdSubj$: Subject<Istudent> = new Subject<Istudent>();

    fetchStdArr(): Observable<Istudent[]> {
        return of(this.studentsData)
    }

    addStudent(newStd: Istudent): Observable<IstdResp<Istudent>> {
        this.studentsData.push(newStd);
        return of({
            msg: `The new Student ${newStd.fname} is added successfully!!!`,
            data: newStd
        })
    }

    removeStudent(removeID: string): Observable<IstdResp<string>> {
        let getIndex = this.studentsData.findIndex(s => s.stdID === removeID);
        let removedStd = this.studentsData.splice(getIndex, 1);
        return of({
            msg: `The student ${removedStd[0].fname} is removed successfully!!!`,
            data: removeID
        })
    }

    updateStudent(updatedStd: Istudent): Observable<IstdResp<Istudent>> {
        let getIndex = this.studentsData.findIndex(s => s.stdID === updatedStd.stdID);
        this.studentsData[getIndex] = updatedStd;
        return of({
            msg: `The student ${updatedStd.fname} is updated successfully`,
            data: updatedStd
        })
    }
}