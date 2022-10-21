import {NgModule} from '@angular/core';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {NhapMoiComponent} from "../thu-di-module/components/nhap-moi/nhap-moi.component";
import {FormsModule} from "@angular/forms";
import {AutocompleteLibModule} from "angular-ng-autocomplete";
import {PrimeNgModule} from "../primeng-module/primeng.module";
import {BaseModule} from "../base-module/base.module";
import {MessageService} from "primeng/api";
import { BaseDanhMucComponent } from './components/base-danh-muc/base-danh-muc.component';
import { NoiNhanBenNgoaiComponent } from './components/noi-nhan-ben-ngoai/noi-nhan-ben-ngoai.component';
import { DoKhanComponent } from './components/do-khan/do-khan.component';
import { LoaiSoDenComponent } from './components/loai-so-den/loai-so-den.component';
import { LoaiSoDiComponent } from './components/loai-so-di/loai-so-di.component';
import { MauThuDiComponent } from './components/mau-thu-di/mau-thu-di.component';

const routes: Routes = [
  {path: 'test-module', component: BaseDanhMucComponent},
  {path: 'noi-nhan-ben-ngoai', component: NoiNhanBenNgoaiComponent},
  {path: 'do-khan', component: DoKhanComponent},
  {path: 'loai-so-den', component: LoaiSoDenComponent},
  {path: 'loai-so-di', component: LoaiSoDiComponent},
  {path: 'mau-thu-di', component: MauThuDiComponent},
]

@NgModule({
  declarations: [
    BaseDanhMucComponent,
    NoiNhanBenNgoaiComponent,
    DoKhanComponent,
    LoaiSoDenComponent,
    LoaiSoDiComponent,
    MauThuDiComponent
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
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: []
})
export class DanhMucModule {
}
