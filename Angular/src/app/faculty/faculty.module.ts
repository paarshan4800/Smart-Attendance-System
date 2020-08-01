import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { ViewComponent } from './view/view.component';
import { FacultyRoutingModule } from './faculty-routing.module';
import { NavigationComponent } from './navigation/navigation.component';



@NgModule({
  declarations: [HomeComponent, ViewComponent, NavigationComponent],
  imports: [
    CommonModule,
    FacultyRoutingModule,
  ]
})
export class FacultyModule { }
