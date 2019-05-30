import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BasicDetailsComponent} from '../basic-details/basic-details.component';
import {BasicDetailsService} from '../services/basic-details.service';
import {GetsrnosService} from '../services/getsrno.service';

@Component({
  selector: 'app-student-enrollment',
  templateUrl: './student-enrollment.component.html',
  styleUrls: ['./student-enrollment.component.scss']
})
export class StudentEnrollmentComponent implements OnInit, AfterViewInit {

  options: FormGroup;
  public actionValue: any;
  key: string;
  action: string;
  disableStudentId: boolean;

  message: string;

  @ViewChild(BasicDetailsComponent)
  private basicdetailsComponent: BasicDetailsComponent;

  constructor(private fb: FormBuilder, private basicdetails: BasicDetailsService, private getsrnoservice: GetsrnosService ) {
  }

  ngAfterViewInit() {}

  ngOnInit() {
    this .options = this .fb.group({
      floatLabel: ''
    });

    this .options.get('floatLabel').valueChanges.subscribe(
      val => this .disableStudentId = val === 'create' ? true : null
    );



    this .options.get('floatLabel').valueChanges.subscribe(value => {
      this .actionValue = value;
      if ( value === 'create') {

        this .key = 'SRNo';
        this .getsrnoservice.getStudentRecordNo().subscribe(data => {
          // tslint:disable-next-line:no-debugger
          debugger;
          if (data.results.id['0'].getstudentid) {
            localStorage.setItem(this .key, data.results.id['0'].getstudentid);
            // this .basicdetails.resetForm(data.results.id['0'].getstudentid);
            this .basicdetailsComponent.initializeFormGroup(data.results.id['0'].getstudentid);
            // this .basicdetailsComponent.resetForm();
          }
        });
        // console.log('testworks');
      } else {
        localStorage.removeItem(this .key);
      }
      // console.log(this .actionValue);
    });
  }

  create() {

  }

  update() {
    this .action = 'update';
    // console.log(this .action);
    // this .basicservice.form.reset();
  }
  delete() {
    this .action = 'delete';
    // console.log(this .action);
    // this .basicservice.form.reset();
  }

}
