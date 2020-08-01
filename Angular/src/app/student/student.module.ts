import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ViewComponent } from './view/view.component';
import { StudentRoutingModule } from './student-routing.module';
import { NavigationComponent } from './navigation/navigation.component';



@NgModule({
  declarations: [HomeComponent, ViewComponent, NavigationComponent],
  imports: [
    CommonModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }
