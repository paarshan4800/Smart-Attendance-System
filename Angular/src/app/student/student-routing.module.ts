import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from './home/home.component'
import {ViewComponent} from './view/view.component'


const routes: Routes = [

    {path:'home/:rollNo',component:HomeComponent},
    {path:'view/:rollNo',component:ViewComponent}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
