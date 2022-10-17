import {NgModule} from '@angular/core';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {NhapMoiComponent} from './components/nhap-moi/nhap-moi.component';
import {RouterModule, Routes} from "@angular/router";
import {ThuMoiComponent} from './components/thu-moi/thu-moi.component';
import {PrimeNgModule} from "../primeng-module/primeng.module";
import {FormsModule} from "@angular/forms";
import {AutocompleteLibModule} from "angular-ng-autocomplete";
import {BaseModule} from "../base-module/base.module";
import {ConfirmationService, MessageService} from "primeng/api";
import {ThuChuaNhanComponent} from './components/thu-chua-nhan/thu-chua-nhan.component';
import {ThuDaNhanComponent} from "./components/thu-da-nhan/thu-da-nhan.component";
import {TatCaComponent} from "./components/tat-ca/tat-ca.component";

const routes: Routes = [
  {path: 'nhap-moi', component: NhapMoiComponent},
  {path: 'thu-moi', component: ThuMoiComponent},
  {path: 'thu-chua-nhan', component: ThuChuaNhanComponent},
  {path: 'thu-da-nhan', component: ThuDaNhanComponent},
  {path: 'tat-ca', component: TatCaComponent},
]

@NgModule({
  declarations: [
    NhapMoiComponent,
    ThuMoiComponent,
    ThuChuaNhanComponent,
    ThuDaNhanComponent,
    TatCaComponent
  ],
  imports: [
    FormsModule,
    AutocompleteLibModule,
    PrimeNgModule,
    RouterModule.forChild(routes),
    BaseModule,
  ],
  exports: [],
  providers: [
    MessageService,
    ConfirmationService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: []
})
export class ThuDenModule {
}
