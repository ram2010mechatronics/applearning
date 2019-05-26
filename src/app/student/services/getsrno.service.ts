import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({
    Accept:  'application/json',
    Authorization: 'Bearer c991d07d-99f0-3b61-89cf-a7b84eef6377'
  })
};

@ Injectable({
  providedIn: 'root'
})
export class GetsrnosService {

  Url = 'https://192.168.0.6:8245/srno/v1.0/getsrno/admin';  // URL to web api

  constructor(private http: HttpClient) { }

  getStudentRecordNo(): Observable<any> {
    return this.http.get<any>(this.Url, httpOptions);
  }
}
