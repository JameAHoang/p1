import { StudentsComponent } from './../students/students.component';
import { HomeComponent } from './../home/home.component';
import { AdminComponent } from '../admin/admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   component: AdminComponent,
  //   children: [
  //     {
  //       path: '',
  //       component: HomeComponent,
  //     },
  //     {
  //       path: 'students',
  //       loadChildren: () => import('../students/students.module').then(m => m.StudentsModule)
  //     },
  //     {
  //       path:'teacher',
  //       loadChildren:()=> import('../teacher/teacher.module').then(m=>m.TeacherModule)
  //     }
  //   ],
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
