import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import {FormsModule} from '@angular/forms'
import {AttendanceRoutingModule} from './attendance-routing.module';

import { MarkComponent } from './mark/mark.component';
import { DeleteupdateComponent } from './deleteupdate/deleteupdate.component';
import { ViewattComponent } from './viewatt/viewatt.component';



@NgModule({
  declarations: [MarkComponent, DeleteupdateComponent, ViewattComponent],
  imports: [
    CommonModule,
    AttendanceRoutingModule,
    FormsModule
  ],
  providers:[DatePipe]
})
export class AttendanceModule { }
