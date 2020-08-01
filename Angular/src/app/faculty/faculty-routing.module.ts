import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ViewComponent } from './view/view.component';
import { ErrorComponent } from '../error/error.component';


const routes: Routes = [
  {path:'home/:facultyId',component:HomeComponent},
  {path:'view/:facultyId',component:ViewComponent},
  {path:'attendance',loadChildren:() => import('./attendance/attendance.module').
  then(m=>m.AttendanceModule)},
  {path:'**',component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacultyRoutingModule { }
