import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MarkComponent } from './mark/mark.component';
import { DeleteupdateComponent } from './deleteupdate/deleteupdate.component';
import { ViewattComponent } from './viewatt/viewatt.component';


const routes: Routes = [
  {path:'mark/:facultyId',component:MarkComponent},
  {path:'delupd/:facultyId',component:DeleteupdateComponent},
  {path:'viewatt/:facultyId',component:ViewattComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceRoutingModule { }
