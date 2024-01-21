import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignmentFormComponent } from './assignment-form/assignment-form.component';
import { AssignmentsTableComponent } from './assignments-table/assignments-table.component';

const routes: Routes = [
  { path: 'assignment-form', component: AssignmentFormComponent },
  { path: 'assignment-table', component: AssignmentsTableComponent },
  { path: '', redirectTo: '/assignment-table', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
