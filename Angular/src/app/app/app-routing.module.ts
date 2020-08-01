import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { StudentSigninComponent } from './signin/student-signin/student-signin.component';
import { FacultySigninComponent } from './signin/faculty-signin/faculty-signin.component';
import { ErrorComponent } from '../error/error.component';
import { PagenotfoundComponent } from '../pagenotfound/pagenotfound.component';


const routes: Routes = [
  { path: 'error', component: ErrorComponent },
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'signin', component: SigninComponent },
  { path: 'signin/student', component: StudentSigninComponent },
  { path: 'signin/faculty', component: FacultySigninComponent },
  {
    path: 'student', loadChildren: () => import('../student/student.module').
      then(m => m.StudentModule)
  },
  {
    path: 'faculty', loadChildren: () => import('../faculty/faculty.module').
      then(m => m.FacultyModule)
  },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
