import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {StepsModule} from "primeng/steps";
import {LoginComponent} from "./modules/system-module/components/login-component/login.component";
import {appRoutingModule} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CommonModule, HashLocationStrategy, LocationStrategy} from "@angular/common";
import {ThuDenModule} from "./modules/thu-den-module/thu-den.module";
import {ThuDiModule} from "./modules/thu-di-module/thu-di.module";
import {DanhMucModule} from "./modules/danh-muc-module/danh-muc.module";
import { TopMenuComponent } from './app-menu/top-menu/top-menu.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {authInterceptorProviders} from "./modules/base-module/service/MyHttpInterceptor";
import {PrimeNgModule} from "./modules/primeng-module/primeng.module";
import {BaseModule} from "./modules/base-module/base.module";
import {BaoCaoModule} from "./modules/bao-cao-module/bao-cao-module";
import { BaoCaoSoThuDiComponent } from './modules/bao-cao-module/components/bao-cao-so-thu-di/bao-cao-so-thu-di.component';


@NgModule({
  imports: [
    PrimeNgModule,
    BaseModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    appRoutingModule,
    StepsModule,
    BrowserModule,
    HttpClientModule,
    ThuDenModule,
    ThuDiModule,
    DanhMucModule,
    BaoCaoModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    TopMenuComponent
  ],
  exports:[
    PrimeNgModule,
    LoginComponent,
    ThuDenModule,
    ThuDiModule,
    DanhMucModule,
    BaseModule,
    BaoCaoModule
  ],
  providers: [
    authInterceptorProviders,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
