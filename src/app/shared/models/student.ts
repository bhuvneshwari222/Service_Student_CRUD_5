 export interface Istudent {
    stdID: string;
    fname: string;
    lname: string;
    email: string;
    contact: string;
    isActive: boolean;
 }

 export interface IstdResp<T>{
    msg : string;
    data: T
 }