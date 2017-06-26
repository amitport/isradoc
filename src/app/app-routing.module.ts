import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorBrowserComponent } from './doctor-browser/doctor-browser.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PageComponent } from './page/page.component';
import { DoctorComponent } from './doctor/doctor.component';
import { DoctorAboutComponent } from './doctor/about/doctor-about.component';
import { DoctorRecommendationsComponent } from './doctor/recommendations/doctor-recommendations.component';
import { DoctorLinksComponent } from './doctor/links/doctor-links.component';
import { DoctorResolver } from 'app/doctor-resolver';

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
            component: DoctorComponent,
            resolve: {
              doctor: DoctorResolver
            },
            children: [
              {
                path: 'about',
                component: DoctorAboutComponent,

              },
              {
                path: 'recommendations',
                component: DoctorRecommendationsComponent,
              },
              {
                path: 'links',
                component: DoctorLinksComponent,
              },
              {
                path: '',
                redirectTo: 'about',
                pathMatch: 'full'
              }
            ]
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
    component: LandingPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [DoctorResolver]
})
export class AppRoutingModule {
}
