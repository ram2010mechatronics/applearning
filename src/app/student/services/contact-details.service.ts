import { ContactDetails } from './../models/contact-details';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@ Injectable({
  providedIn: 'root'
})
export class ContactDetailsService {
  url = 'http://localhost:65389/Api/ContactDetails';
  constructor(private http: HttpClient) { }
  getAllContactDetails(): Observable< ContactDetails[]> {
    return this .http.get< ContactDetails[]>(this .url + '/AllContactDetails');
  }
  getContactDetailsBysrNo(srNo: number): Observable< ContactDetails[]> {
    return this .http.get< ContactDetails[]>(this .url + '/GetContactDetailsBysrNo/' + srNo);
  }

  getContactDetailsByIndex(index: number): Observable< ContactDetails> {
    return this .http.get< ContactDetails>(this .url + '/GetContactDetailsByIndex/');
  }

  createContactDetails(payload: ContactDetails): Observable< ContactDetails> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this .http.post< ContactDetails>(this .url + '/InsertContactDetails/',
    payload, httpOptions);
  }
  updateEmployee(payload: ContactDetails): Observable< ContactDetails> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this .http.put< ContactDetails>(this .url + '/UpdateContactDetails/',
    payload, httpOptions);
  }
  deleteEmployeeById(srNo: number): Observable< number> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this .http.delete< number>(this .url + '/DeleteContactDetails?id=' + srNo,
 httpOptions);
  }
}
