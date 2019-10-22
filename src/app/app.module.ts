import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import {DefaultLayoutComponent} from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';

import { CursosService } from './services/cursos.service';

import { ModalConfirmacionComponent } from './views/modal-confirmacion/modal-confirmacion.component';
import { ModalConfirmacionService } from './services/modal-confirmacion.service';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AsigService} from './services/asig.service';
import {CursoPensumService} from './services/curso-pensum.service';
import {AuthService} from './auth/auth.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TokenInterceptor} from './token-interceptor';
import {ToastrModule} from 'ngx-toastr';
// import { JwtModule } from "@auth0/angular-jwt";

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    // JwtModule.forRoot({
    //   config: {
    //     tokenGetter: ()=>{
    //       let token = '';
    //       if(localStorage.getItem('loggedUser')){
    //         token = JSON.parse(localStorage.getItem('loggedUser')).token;
    //       }
    //       return token;
    //     }
    //   }
    // })
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    ModalConfirmacionComponent
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    ModalConfirmacionService,
    CursosService,
    AsigService,
    CursoPensumService,
    AuthService
  ],
  exports:[
    ModalConfirmacionComponent
  ],
  entryComponents:[
    ModalConfirmacionComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
