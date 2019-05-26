import { ContactDetailsService } from './../services/contact-details.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ContactDetails } from './../models/contact-details';

@ Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})

export class ContactDetailsComponent implements OnInit {

  dataSaved = false;
  contactdetailsForm: any;
  allContactDetails: Observable< ContactDetails[]>;
  srNoUpdate = null;
  massage = null;

  constructor(private formbulider: FormBuilder, private contactdetailsService: ContactDetailsService) { }

  ngOnInit() {
    this .contactdetailsForm = this .formbulider.group({
      contactType: ['', [Validators.required]],
      contactPerson: ['', [Validators.required]],
      EmailId: ['', [Validators.required]],
      mobileNo: ['', [Validators.required]],
      stdCode: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
    });
    // this .loadAllContactDetails();
  }
  loadAllContactDetails() {
    this .allContactDetails = this .contactdetailsService.getContactDetailsBysrNo(this .srNoUpdate);
  }

  onFormSubmit() {
    this .dataSaved = false;
    const contactdetails = this .contactdetailsForm.value;
    this .CreateContactDetails(contactdetails);
    this .contactdetailsForm.reset();
  }

  loadContactToEdit(srNo: number) {
    this .contactdetailsService.getContactDetailsBysrNo(srNo).subscribe(contact => {
      this .massage = null;
      this .dataSaved = false;
      this .srNoUpdate = contact[0].srNo;
      this .contactdetailsForm.contactType.setValue(contact[0].contactType);
      this .contactdetailsForm.contactPerson.setValue(contact[0].contactPerson);
      this .contactdetailsForm.EmailId.setValue(contact[0].EmailId);
      this .contactdetailsForm.mobileNo.setValue(contact[0].mobileNo);
      this .contactdetailsForm.stdCode.setValue(contact[0].stdCode);
      this .contactdetailsForm.phoneNumber.setValue(contact[0].phoneNumber);
    });

  }
  CreateContactDetails(contact: ContactDetails) {
    if (this .srNoUpdate == null) {
      this .contactdetailsService.createContactDetails(contact).subscribe(
        () => {
          this .dataSaved = true;
          this .massage = 'Record saved Successfully';
          this .loadAllContactDetails();
          this .srNoUpdate = null;
          this .contactdetailsForm.reset();
        }
      );
    } else {
      contact.srNo = this .srNoUpdate;
      this .contactdetailsService.updateEmployee(contact).subscribe(() => {
        this .dataSaved = true;
        this .massage = 'Record Updated Successfully';
        this .loadAllContactDetails();
        this .srNoUpdate = null;
        this .contactdetailsForm.reset();
      });
    }
  }
  deleteEmployee(srNo: number) {
    if (confirm('Are you sure you want to delete this ?')) {
    this .contactdetailsService.deleteEmployeeById(srNo).subscribe(() => {
      this .dataSaved = true;
      this .massage = 'Record Deleted Succefully';
      this .loadAllContactDetails();
      this .srNoUpdate = null;
      this .contactdetailsForm.reset();

    });
  }
}
  resetForm() {
    this .contactdetailsForm.reset();
    this .massage = null;
    this .dataSaved = false;
  }

}
