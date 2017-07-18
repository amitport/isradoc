import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import 'hammerjs';
import {
  MdAutocompleteModule,
  MdButtonModule,
  MdCoreModule,
  MdIconModule, MdInputModule,
  MdListModule,
  MdMenuModule,
  MdOptionModule,
  MdProgressBarModule,
  MdSnackBarModule,
  MdTabsModule,
  MdToolbarModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DoctorBrowserComponent } from './doctor-browser/doctor-browser.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PageComponent } from './page/page.component';
import { DoctorComponent } from './doctor/doctor.component';
import { LoadingIndicator } from './loading-indicator.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { DoctorAboutComponent } from './doctor/about/doctor-about.component';
import { DoctorRecommendationsComponent } from './doctor/recommendations/doctor-recommendations.component';
import { DoctorLinksComponent } from './doctor/links/doctor-links.component';
import { DOCTOR_SERVICE, InMemoryDoctorsService } from './store/doctor.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DoctorBrowserComponent,
    UserDetailsComponent,
    LandingPageComponent,
    PageComponent,
    DoctorComponent,
    DoctorAboutComponent,
    DoctorRecommendationsComponent,
    DoctorLinksComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,

    MdButtonModule,
    MdOptionModule,
    MdIconModule,
    MdAutocompleteModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdCoreModule,
    MdProgressBarModule,
    MdSnackBarModule,
    MdTabsModule,
    MdToolbarModule,
    MdCoreModule, // todo remove this when https://github.com/angular/material2/pull/5304 is merged

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,

    BrowserAnimationsModule,
    FlexLayoutModule
  ],
  providers: [
    LoadingIndicator,
    {provide: DOCTOR_SERVICE, useClass: InMemoryDoctorsService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}