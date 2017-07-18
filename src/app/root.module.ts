import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RootComponent } from './root.component';
import { IndexComponent } from './index/index.component';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DoctorComponent } from './doctor/doctor.component';
import { DoctorResolver } from './doctor/doctor-resolver.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MdButtonModule, MdExpansionModule, MdIconModule, MdInputModule, MdToolbarModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { DoctorsService } from './store/doctors.service';
import { DoctorCardComponent } from './doctor-card/doctor-card.component';
import { DoctorDetailsComponent } from './doctor-details/doctor-details.component';

@NgModule({
  declarations: [
    RootComponent,
    IndexComponent,
    PageNotFoundComponent,
    DoctorComponent,
    DoctorListComponent,
    DoctorCardComponent,
    DoctorDetailsComponent
  ],
  imports: [
    // angular
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,

    // material
    MdButtonModule,
    MdIconModule,
    MdInputModule,
    MdExpansionModule,
    MdToolbarModule,

    // flex-layout
    FlexLayoutModule,

    // app
    RouterModule.forRoot([
      {
        path: '',
        component: IndexComponent
      },
      {
        path: 'doctors',
        children: [
          {
            path: '',
            redirectTo: '/',
            pathMatch: 'full'
          },
          {
            path: ':doctorSlug',
            component: DoctorComponent,
            resolve: {
              doctor: DoctorResolver
            }
          },
        ]
      },
      {
        path: '**',
        component: PageNotFoundComponent
      },
    ])
  ],
  providers: [
    DoctorResolver, DoctorsService
  ],
  bootstrap: [RootComponent]
})
export class RootModule {
}
