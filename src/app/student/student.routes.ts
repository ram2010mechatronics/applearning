import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentEnrollmentComponent } from './student-enrollment/student-enrollment.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { AttendanceComponent } from './attendance/attendance.component';

const studentRoutes: Routes = [
  { path: 'newEnrollment', component: StudentEnrollmentComponent , data: { animation: 'newEnrollment' } },
  { path: 'studentdetails', component: StudentDetailsComponent , data: { animation: 'studentdetails' }},
  { path: 'attendance', component: AttendanceComponent , data: { animation: 'attendance' }},
];

@NgModule({
  imports: [RouterModule.forChild(studentRoutes)],
  exports: [RouterModule]
})
export class StudentRoutes { }
