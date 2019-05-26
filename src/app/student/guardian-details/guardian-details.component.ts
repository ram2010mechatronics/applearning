import { Component, OnInit } from '@angular/core';
import { GuardianDetailsService } from './../services/guardian-details.service';


@ Component({
  selector: 'app-guardian-details',
  templateUrl: './guardian-details.component.html',
  styleUrls: ['./guardian-details.component.scss']
})
export class GuardianDetailsComponent implements OnInit {

  constructor(private service: GuardianDetailsService) { }

  departments = [
    { id: 3, value: 'Dep 1' },
    { id: 2, value: 'Dep 2' },
    { id: 3, value: 'Dep 3' }];

  ngOnInit() {
  }

  onClear() {
    this .service.form.reset();
    this .service.initializeFormGroup();
  }

  public createGuardian = (guardianFormValue: any) => {
    console.log(guardianFormValue);
}

}
