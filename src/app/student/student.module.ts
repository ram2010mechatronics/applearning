import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatCardModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatInputModule,
  MatToolbarModule,
  MatIconModule,
  MatCheckboxModule,
  MatListModule, MatRadioModule, MatSelectModule, MatGridListModule, MatDatepickerModule, MatTableModule,
} from '@angular/material';
import { MatChipsModule } from '@angular/material/chips';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StudentRoutes } from './student.routes';
import { StudentEnrollmentComponent } from './student-enrollment/student-enrollment.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { CoreModule } from '../core/core.module';
import {BasicDetailsComponent} from './basic-details/basic-details.component';
import {AddressDetailsComponent} from './address-details/address-details.component';
import {ContactDetailsComponent} from './contact-details/contact-details.component';
import {GuardianDetailsComponent} from './guardian-details/guardian-details.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [StudentEnrollmentComponent, StudentDetailsComponent, AttendanceComponent, BasicDetailsComponent,
    AddressDetailsComponent, ContactDetailsComponent, GuardianDetailsComponent],
  imports: [
    MatCardModule,
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatCheckboxModule,
    MatListModule,
    MatChipsModule,
    CommonModule,
    StudentRoutes,
    CoreModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatGridListModule,
    MatDatepickerModule,
    FormsModule,
    MatTableModule,
    HttpClientModule
  ],
  exports: [
  ],
  providers: [
  ]
})
export class StudentModule { }
