import { TeacherAddComponent } from './teacher-add/teacher-add.component';
import { AddComponent } from './../students/add/add.component';
import { TeacherListComponent } from './teacher-list/teacher-list.component';
import { TeacherComponent } from './teacher.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: TeacherComponent,
    children: [
      {
        path: '',
        component: TeacherListComponent,
      },
      {
        path: 'add',
        component: TeacherAddComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherRoutingModule {}
