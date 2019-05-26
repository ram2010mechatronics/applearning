import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';


export const appRoutes: Routes = [{
  path: 'auth', component: AuthComponent, children: [

    { path: 'pages', loadChildren: '../pages/pages.module#PagesModule' },
    { path: 'student', loadChildren: '../student/student.module#StudentModule' },

  ]
}];
