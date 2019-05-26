import { BasicDetailsService } from '../services/basic-details.service';
import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { BasicDetails } from '../models/basic-details';
import { FormBuilder, Validators } from '@angular/forms';

export interface Standard {
  value: string;
  viewValue: string;
}

export interface Section {
  value: string;
  viewValue: string;
}

export interface Religion {
  value: string;
  viewValue: string;
}

export interface Nation {
  value: string;
  viewValue: string;
}

@ Component({
  selector: 'app-basic-details',
  templateUrl: './basic-details.component.html',
  styleUrls: ['./basic-details.component.scss'],
  providers: [DatePipe]
})


export class BasicDetailsComponent implements OnInit {

  selectedValue: string;
  selectedSection: string;
  selectedReligion: string;
  selectedFile: File;
  imagePreview: any;
  public imagePath;
  url: any;
  buttonDisabled = true;
  dataSaved = false;
  basicdetailsForm: any;
  BasicDetails: Observable< BasicDetails>;
  srNoUpdate = null;
  massage = null;


  @ Input() disableStudentId: boolean;

  serializedDate = new FormControl((new Date()).toISOString());
  date = new FormControl(new Date());

  public showDateInput = false;

  standards: Standard[] = [
    { value: 'LKG', viewValue: 'LKG' },
    { value: 'UKG', viewValue: 'UKG' },
    { value: '1', viewValue: '1' },
    { value: '2', viewValue: '2' },
    { value: '3', viewValue: '3' },
    { value: '4', viewValue: '4' },
    { value: '5', viewValue: '5' },
    { value: '6', viewValue: '6' },
    { value: '7', viewValue: '7' },
    { value: '8', viewValue: '8' },
    { value: '9', viewValue: '9' },
    { value: '10', viewValue: '10' },
    { value: '11', viewValue: '11' },
    { value: '12', viewValue: '12' }
  ];

  sections: Section[] = [
    { value: 'A', viewValue: 'A' },
    { value: 'B', viewValue: 'B' },
    { value: 'C', viewValue: 'C' }
  ];

  religions: Religion[] = [
    { value: 'Hindu', viewValue: 'Hindu' },
    { value: 'Muslim', viewValue: 'Muslim' },
    { value: 'Christian', viewValue: 'Christian' }
  ];

  nations: Nation[] = [
    { value: 'Indian', viewValue: 'Indian' }
  ];

  // constructor(private basicservice: BasicDetailsService, private http: HttpClient, private datePipe: DatePipe) {  }

  constructor(private formbulider: FormBuilder,
              private basicservice: BasicDetailsService, private http: HttpClient, private datePipe: DatePipe) { }

  ngOnInit() {
    // this .radioValueCheck(this .s);
    this .basicdetailsForm = this .formbulider.group({
      srNo: ['', [Validators.required]],
      standard: ['', [Validators.required]],
      section: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      middleName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      dateofBirth: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      religion: ['', [Validators.required]],
      nationality: ['', [Validators.required]],
      aadharNo: ['', [Validators.required]],
    });

  }

  onFormSubmit(value: any) {
    this .dataSaved = false;
    const basicdts = this .basicdetailsForm.value;
    this .CreateBasicDetails(basicdts);
    // this .basicdetailsForm.reset();
  }

  update() {
    this .srNoUpdate = this .basicdetailsForm.get('srNo').value;
    console.log(this .basicdetailsForm.get('srNo').value);
    this .loadBasicDetailsToEdit(this .basicdetailsForm.get('srNo').value);
  }

  CreateBasicDetails(basicdetails: BasicDetails) {
    if (this .srNoUpdate == null) {
      this .basicservice.addBasicDetails(basicdetails).subscribe(
        () => {
          this .dataSaved = true;
          this .massage = 'Record saved Successfully';
          this .srNoUpdate = null;
          // this .basicdetailsForm.reset();
        }
      );
    } else {
      basicdetails.srNo = this .srNoUpdate;
      this .basicservice.updateBasicDetails(basicdetails).subscribe(() => {
        this .dataSaved = true;
        this .massage = 'Record Updated Successfully';
        this .srNoUpdate = null;
        this .basicdetailsForm.reset();
      });
    }
  }

  loadBasicDetailsToEdit(srNo: number) {
    this .basicservice.getBasicDetailsBysrNo(srNo).subscribe(basicdetails => {
      this .massage = null;
      this .dataSaved = false;
      this .srNoUpdate = basicdetails.srNo;
      this .basicdetailsForm.get('srNo').setValue(basicdetails.srNo);
      this .basicdetailsForm.get('standard').setValue(basicdetails.standard);
      this .basicdetailsForm.get('section').setValue(basicdetails.section);
      this .basicdetailsForm.get('firstName').setValue(basicdetails.firstName);
      this .basicdetailsForm.get('middleName').setValue(basicdetails.middleName);
      this .basicdetailsForm.get('lastName').setValue(basicdetails.lastName);
      this .basicdetailsForm.get('dateofBirth').setValue(basicdetails.dateofBirth);
      this .basicdetailsForm.get('gender').setValue(basicdetails.gender);
      this .basicdetailsForm.get('religion').setValue(basicdetails.religion);
      this .basicdetailsForm.get('nationality').setValue(basicdetails.nationality);
      this .basicdetailsForm.get('aadharNo').setValue(basicdetails.aadharNo);
    });

  }


  deleteBasicDetails(srNo: number) {
    if (confirm('Are you sure you want to delete this ?')) {
      this .basicservice.deleteBasicDetailsBysrNo(srNo).subscribe(() => {
        this .dataSaved = true;
        this .massage = 'Record Deleted Succefully';
      });
    }
  }

  initializeFormGroup(srno) {
    this .basicdetailsForm.setValue({
      srNo: srno,
      standard: '',
      section: '',
      firstName: '',
      middleName: '',
      lastName: '',
      dateofBirth: '',
      gender: '',
      religion: '',
      nationality: '',
      aadharNo: ''
    });
  }






  onFileChanged(event) {
    this .selectedFile = event.target.files[0];
  }

  onUpload() {
    this .http.post('my-backend.com/file-upload', this .selectedFile, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(event => {
        console.log(event); // handle event here
      });
  }

  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      this .imagePath = event.target.files;
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      // tslint:disable-next-line:variable-name
      reader.onload = () => {
        this .url = reader.result;
      };
    }
  }


  radioValueCheck(x) {
    console.log(x);
    if (x === 'create') {
      console.log(x);
      this .showDateInput = true;
    }
  }

  public submitBasicDetails = (basicDetailsFormValue: any) => {
    const body = basicDetailsFormValue;
    body.dateofBirth = this .datePipe.transform(body.dateofBirth, 'yyyy-MM-dd');
    console.log('{"_postbasicdetails":' + JSON.stringify(body) + '}');
  }

  resetForm() {
    this .basicdetailsForm.reset();
    this .massage = null;
    this .dataSaved = false;
  }

}
