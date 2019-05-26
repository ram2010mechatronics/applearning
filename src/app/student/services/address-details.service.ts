import { AddressDetails } from './../models/address-details';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';



@ Injectable({
  providedIn: 'root'
})
export class AddressDetailsService {


  // constructor() { }

  // form: FormGroup = new FormGroup({
  //   srNo: new FormControl(''),
  //   addressType: new FormControl(''),
  //   houseNo: new FormControl('', Validators.required),
  //   addressline1: new FormControl(''),
  //   addressline2: new FormControl(''),
  //   addressline3: new FormControl(''),
  //   district: new FormControl(''),
  //   city: new FormControl(''),
  //   state:  new FormControl(''),
  //   pincode: new FormControl(''),
  //   landmark: new FormControl('')
  // });

  // initializeFormGroup() {
  //   this .form.setValue({
  //     srNo: '',
  //     addressType: '',
  //     houseNo: '123',
  //     addressline1: '',
  //     addressline2: '',
  //     addressline3: '',
  //     district: '',
  //     city: '',
  //     state: '',
  //     pincode: '',
  //     landmark: ''
  //   });
  // }

  // initializeFormGroupwithdata(housenum) {
  //   this .form.setValue({
  //     srNo: '',
  //     addressType: '',
  //     houseNo: housenum,
  //     addressline1: '',
  //     addressline2: '',
  //     addressline3: '',
  //     district: '',
  //     city: '',
  //     state: '',
  //     pincode: '',
  //     landmark: ''
  //   });
  // }

  url = 'http://localhost:65389/Api/Employee';
  constructor(private http: HttpClient) { }

  getAddressBysrNo(): Observable< AddressDetails[]> {
    return this .http.get< AddressDetails[]>(this .url + '/AllEmployeeDetails');
  }

  getAddressByIndex(index: number): Observable< AddressDetails> {
    return this .http.get< AddressDetails>(this .url + '/GetEmployeeDetailsById/' + index);
  }
  createAddress(address: AddressDetails): Observable< AddressDetails> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this .http.post< AddressDetails>(this .url + '/InsertEmployeeDetails/', address, httpOptions);
  }

  updateAddress(address: AddressDetails): Observable< AddressDetails> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this .http.put< AddressDetails>(this .url + '/UpdateEmployeeDetails/', address, httpOptions);
  }

  deleteAddressByIndex(index: number): Observable< number> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this .http.delete< number>(this .url + '/DeleteEmployeeDetails?id=' + index, httpOptions);
  }

}
