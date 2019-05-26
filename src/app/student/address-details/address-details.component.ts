import { AddressDetailsService } from './../services/address-details.service';
import { AddressDetails } from './../models/address-details';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';

export interface AddressType {
  value: string;
  viewValue: string;
}

export interface District {
  value: string;
  viewValue: string;
}

export interface State {
  value: string;
  viewValue: string;
}

export interface City {
  value: string;
  viewValue: string;
}

export interface PeriodicElement {
  // name: string;
  // position: number;
  // weight: number;
  // symbol: string;
  addressType: string;
  houseNo: string;
  addressline1: string;
  addressline2: string;
  addressline3: string;
  district: string;
  city: string;
  state: string;
  pincode: string;
  landmark: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    addressType: 'Permanent', houseNo: '1', addressline1: 'sfd', addressline2: 'sfsd', addressline3: 'sfsd', district: 'ewwwww',
    city: 'dsfsda', state: 'sdagasd', pincode: '456545', landmark: ''
  },
  {
    addressType: 'Permanent', houseNo: '2', addressline1: 'sfd', addressline2: 'sfsd', addressline3: 'sfsd', district: 'ewwwww',
    city: 'dsfsda', state: 'sdagasd', pincode: '456545', landmark: ''
  },
  {
    addressType: 'Permanent', houseNo: '3', addressline1: 'sfd', addressline2: 'sfsd', addressline3: 'sfsd', district: 'ewwwww',
    city: 'dsfsda', state: 'sdagasd', pincode: '456545', landmark: ''
  },
];



@ Component({
  selector: 'app-address-details',
  templateUrl: './address-details.component.html',
  styleUrls: ['./address-details.component.scss']
})
export class AddressDetailsComponent implements OnInit {


  // selectedCity: string;
  // selectedDistrict: string;
  // selectedState: string;
  // selectedAddressType: string;
  // selectedValue: string;
  errorMessage = false;
  singleAddressSelected = false;
  enableEdit = false;
  dataSaved = false;
  addressForm: any;
  allAddress: Observable< AddressDetails[]>;
  addressToUpdate = null;
  massage = null;



  public displayedColumns = ['addressTypeIndex', 'addressType', 'houseNo', 'addressline1', 'addressline2',
    'addressline3', 'district', 'city', 'state', 'pincode', 'landmark', 'update', 'delete'];

  public dataSource = new MatTableDataSource();



  constructor(private formbulider: FormBuilder, private addressservice: AddressDetailsService) { }

  AddressType = [
    'Permanent',
    'Present',
    'Office'
  ];



  District = ['Chennai', 'Villupuram'];

  State = ['Tamil Nadu'];

  City = ['Chennai'];

  ngOnInit() {
    this .addressForm = this .formbulider.group({
      srNo: [''],
      addressTypeIndex: [''],
      addressType: ['', [Validators.required]],
      houseNo: ['', [Validators.required]],
      addressline1: ['', [Validators.required]],
      addressline2: ['', [Validators.required]],
      addressline3: [''],
      district: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      pincode: ['', [Validators.required]],
      landmark: [''],
    });
    // this.loadAddress();
  }

  loadAddress() {
    this .allAddress = this .addressservice.getAddressBysrNo();
  }

  onFormSubmit(value: any) {
    console.log('test');
    this .dataSaved = false;
    const address = this .addressForm.value;
    this .CreateAddress(address);
    this .addressForm.reset();
  }


  CreateAddress(address: AddressDetails) {
    if (this .addressToUpdate == null) {
      this .addressservice.createAddress(address).subscribe(
        () => {
          this .dataSaved = true;
          this .massage = 'Record saved Successfully';
          this .loadAddress();
          this .addressToUpdate = null;
          this .addressForm.reset();
        }
      );
    } else {
      address.addressTypeIndex = this .addressToUpdate;
      this .addressservice.updateAddress(address).subscribe(() => {
        this .dataSaved = true;
        this .massage = 'Record Updated Successfully';
        this .loadAddress();
        this .addressToUpdate = null;
        this .addressForm.reset();
      });
    }
  }

  loadEmployeeToEdit(addressIndex: number) {
    this .addressservice.getAddressByIndex(addressIndex).subscribe(address => {
      this .massage = null;
      this .dataSaved = false;
      this .addressToUpdate = address.addressTypeIndex;
      this .addressForm.get('addressType').setValue(address.addressType);
      this .addressForm.get('houseNo').setValue(address.houseNo);
      this .addressForm.get('addressline1').setValue(address.addressline1);
      this .addressForm.get('addressline2').setValue(address.addressline2);
      this .addressForm.get('addressline3').setValue(address.addressline3);
      this .addressForm.get('district').setValue(address.district);
      this .addressForm.get('city').setValue(address.city);
      this .addressForm.get('state').setValue(address.state);
      this .addressForm.get('pincode').setValue(address.pincode);
      this .addressForm.get('landmark').setValue(address.landmark);
    });

  }

  deleteAddress(index: number) {
    if (confirm('Are you sure you want to delete this ?')) {
      this .addressservice.deleteAddressByIndex(index).subscribe(() => {
        this .dataSaved = true;
        this .massage = 'Record Deleted Succefully';
        this .loadAddress();
        this .addressToUpdate = null;
        this .addressForm.reset();

      });
    }
  }

  onRowClicked(row) {
    console.log('Row clicked: ', row);
    this .massage = null;
    this .dataSaved = false;
    this .addressToUpdate = row.addressTypeIndex;
    this .addressForm.get('addressType').setValue(row.addressType);
    this .addressForm.get('houseNo').setValue(row.houseNo);
    this .addressForm.get('addressline1').setValue(row.addressline1);
    this .addressForm.get('addressline2').setValue(row.addressline2);
    this .addressForm.get('addressline3').setValue(row.addressline3);
    this .addressForm.get('district').setValue(row.district);
    this .addressForm.get('city').setValue(row.city);
    this .addressForm.get('state').setValue(row.state);
    this .addressForm.get('pincode').setValue(row.pincode);
    this .addressForm.get('landmark').setValue(row.landmark);
  }

  resetForm() {
    this .addressForm.reset();
    this .massage = null;
    this .dataSaved = false;
  }


  // public submitAddressDetails = (addressDetailsFormValue: any) => {
  //   const body = addressDetailsFormValue;
  //   console.log(addressDetailsFormValue.addressType);
  // }

  // onClear() {
  //   this .addressservice.form.reset();
  //   this .addressservice.initializeFormGroup();
  // }

  // public getAllAddress = () => {
  //   // this .repoService.getData('api/owner')
  //   // .subscribe(res => {
  //   //   this .dataSource.data = res as Owner[];
  //   // })
  // }

  // addRow(addressDetailsFormValue: any) {
  //   //  const maxID = (Math.max.apply(null, ELEMENT_DATA.map(x => x.id)) || 0) + 1;
  //   if (!!ELEMENT_DATA.find(x => x.addressType === addressDetailsFormValue.addressType)) {
  //     // alert('already eixsts');
  //     this .errorMessage = true;
  //     return;
  //   }

  //   ELEMENT_DATA.push({
  //     addressType: addressDetailsFormValue.addressType,
  //     houseNo: addressDetailsFormValue.houseNo, addressline1: addressDetailsFormValue.addressline1,
  //     addressline2: addressDetailsFormValue.addressline2, addressline3: addressDetailsFormValue.addressline3,
  //     district: addressDetailsFormValue.district, city: addressDetailsFormValue.city,
  //     state: addressDetailsFormValue.state, pincode: addressDetailsFormValue.pincode, landmark: addressDetailsFormValue.landmark
  //   });

  //   this .addressservice.form.reset();
  // }

  editAddress(id) {
    console.log(id);
    console.log(ELEMENT_DATA[id].houseNo);
    this .singleAddressSelected = true;
    // this .addressservice.initializeFormGroupwithdata(ELEMENT_DATA[id].houseNo);

  }


}
