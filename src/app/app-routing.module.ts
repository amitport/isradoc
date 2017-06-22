import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoctorBrowserComponent } from './doctor-browser/doctor-browser.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { LandingComponent } from './landing/landing.component';
import { PageComponent } from './page/page.component';
import { DoctorDetailsComponent } from './doctor-details/doctor-details.component';
import { DoctorListResolver } from './doctor-list.resolver';

const routes: Routes = [
  {
    path: '',
    component: PageComponent,
    children: [
      {
        path: '',
        redirectTo: '/welcome',
        pathMatch: 'full'
      },
      {
        path: 'doctors',
        children: [
          {
            path: '',
            component: DoctorBrowserComponent
          },
          {
            path: ':doctorId',
            component: DoctorDetailsComponent
            // ,
            // resolve: {
            //   doctor: DoctorListResolver
            // }
          }
        ]
      },
      {
        path: 'users/1',
        component: UserDetailsComponent
      }
    ]
  },
  {
    path: 'welcome',
    component: LandingComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
