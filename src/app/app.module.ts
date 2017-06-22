import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MdButtonModule, MdIconModule, MdMenuModule, MdProgressBarModule, MdSnackBarModule, MdToolbarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DoctorBrowserComponent } from './doctor-browser/doctor-browser.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { LandingComponent } from './landing/landing.component';
import { PageComponent } from './page/page.component';
import { DoctorDetailsComponent } from './doctor-details/doctor-details.component';
import { LoadingIndicator } from './loading-indicator.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    DoctorBrowserComponent,
    UserDetailsComponent,
    LandingComponent,
    PageComponent,
    DoctorDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    MdMenuModule,
    MdButtonModule,
    MdIconModule,
    MdSnackBarModule,
    MdToolbarModule,
    MdProgressBarModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,

    BrowserAnimationsModule,
    FlexLayoutModule
  ],
  providers: [LoadingIndicator],
  bootstrap: [AppComponent]
})
export class AppModule { }
