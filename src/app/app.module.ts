import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgOtpInputModule } from 'ng-otp-input';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { DialogExampleComponent } from './dialog-example/dialog-example.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { NgImageSliderModule } from 'ng-image-slider';

import { MatSidenavModule } from '@angular/material/sidenav';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatBadgeModule } from '@angular/material/badge';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';

import { Tab1Component } from './pages/tab1/tab1.component';
import { Tab2Component } from './pages/tab2/tab2.component';
import { Tab3Component } from './pages/tab3/tab3.component';
import { ConfirmcartComponent } from './profile-pages/confirmcart/confirmcart.component';
import { ToPayComponent } from './profile-pages/to-pay/to-pay.component';
import { ModeComponent } from './shop-pages/mode/mode.component';
import { ServiceComponent } from './profile-pages/service/service.component';
import { CompletedComponent } from './profile-pages/completed/completed.component';
import { CustomComponent } from './shop-pages/custom/custom.component';
import { GenerateComponent } from './shop-pages/generate/generate.component';
import { QuickComponent } from './shop-pages/quick/quick.component';
import { QuickconfirmComponent } from './confirm-pages/quickconfirm/quickconfirm.component';
import { CustomconfirmComponent } from './confirm-pages/customconfirm/customconfirm.component';
import { QuickmodeComponent } from './shop-pages/quickmode/quickmode.component';
import { DragDropComponent } from './experiments/drag-drop/drag-drop.component';
import { LogoutComponent } from './dialog/logout/logout.component';
import { InformationComponent } from './dialog/information/information.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { CancelledComponent } from './profile-pages/cancelled/cancelled.component';
import { Tab4Component } from './pages/tab4/tab4.component';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import {
  ServiceWorkerModule,
  SwRegistrationOptions,
} from '@angular/service-worker';
import { environment } from '../environments/environment';
import { RecaptchaModule } from 'ng-recaptcha';
import { ForgotPasswordComponent } from './dialog/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './dialog/change-password/change-password.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DialogExampleComponent,
    NavComponent,
    Tab1Component,
    Tab2Component,
    Tab3Component,
    ConfirmcartComponent,
    CustomComponent,
    ToPayComponent,
    ModeComponent,
    ServiceComponent,
    CompletedComponent,
    GenerateComponent,
    QuickComponent,
    QuickconfirmComponent,
    CustomconfirmComponent,
    QuickmodeComponent,
    DragDropComponent,
    LogoutComponent,
    InformationComponent,
    CancelledComponent,
    Tab4Component,
    ForgotPasswordComponent,
    ChangePasswordComponent,
  ],
  entryComponents: [DialogExampleComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    MatDialogModule,
    NgOtpInputModule,
    BrowserAnimationsModule,
    DragDropModule,
    NgImageSliderModule,
    RecaptchaModule,

    // NG Material Modules
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatRadioModule,
    MatButtonModule,
    MatRippleModule,
    MatSelectModule,
    MatCardModule,
    MatSnackBarModule,
    MatBadgeModule,
    MatExpansionModule,
    MatTooltipModule,
    MatDialogModule,
    Ng2SearchPipeModule,
    MatMenuModule,
    MatChipsModule,
    MatCheckboxModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatInputModule,
    RouterModule,
    CarouselModule,
    ButtonModule,
    ToastModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerImmediately',
    }),
  ],
  providers: [
    {
      provide: SwRegistrationOptions,
      useFactory: () => ({ enabled: location.search.includes('sw=true') }),
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
