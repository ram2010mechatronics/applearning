import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BasicDetails } from '../models/basic-details';

const httpOptions = {
  headers: new HttpHeaders({
    // Accept:  'application/json',
    Authorization: 'Bearer 2f4f22e0-f00d-34c3-8aa7-6a8bb3f1e1c7',
    'Content-Type': 'application/json'
  })
};

@ Injectable({
  providedIn: 'root'
})
export class BasicDetailsService {

  url = 'https://192.168.0.6:8245/srno/v1.0';

  constructor(private http: HttpClient) { }

  // form: FormGroup = new FormGroup({
  //   srNo: new FormControl(''),
  //   standard: new FormControl('', Validators.required),
  //   section: new FormControl(''),
  //   firstName: new FormControl(''),
  //   middleName: new FormControl(''),
  //   lastName: new FormControl(''),
  //   dateofBirth: new FormControl(''),
  //   gender: new FormControl(''),
  //   religion:  new FormControl(''),
  //   nationality: new FormControl(''),
  //   aadharNo: new FormControl('')
  // });

  // initializeFormGroup(srno) {
  //   this .form.setValue({
  //     srNo: srno,
  //     standard: '',
  //     section: '',
  //     firstName: '',
  //     middleName: '',
  //     lastName: '',
  //     dateofBirth: '',
  //     gender: '',
  //     religion: '',
  //     nationality: '',
  //     aadharNo: ''
  //   });
  // }

  getAllBasicDetails(): Observable< BasicDetails[]> {
    return this .http.get< BasicDetails[]>(this .url + '/AllBasicDetails');
  }

  getBasicDetailsBysrNo(srNo: number): Observable< BasicDetails> {
    return this .http.get< BasicDetails>(this .url + '/GetBasicDetailsBysrNo/' + srNo);
  }

  addBasicDetails(basicDetails: BasicDetails): Observable< BasicDetails> {
    // const httpOptions = { headers:
    //                       new HttpHeaders({ 'Content-Type': 'application/json' ,
    //                       Accept: 'application/json', Authorization: 'Bearer c991d07d-99f0-3b61-89cf-a7b84eef6377'}) };
    console.log('{"_postbasicdetails":' + JSON.stringify(basicDetails) + '}');
    return this .http.post< BasicDetails>
    (this .url + '/add_student_basicdetails', '{"_postbasicdetails":' + JSON.stringify(basicDetails) + '}', httpOptions);
  }

  updateBasicDetails(basicDetails: BasicDetails): Observable< BasicDetails> {
    // const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this .http.put< BasicDetails>(this .url + '/UpdateBasicDetails/', basicDetails, httpOptions);
  }

  deleteBasicDetailsBysrNo(srNo: number): Observable< number> {
    // const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this .http.delete< number>(this .url + '/DeleteEmployeeDetails?id=' + srNo, httpOptions);
  }

}
