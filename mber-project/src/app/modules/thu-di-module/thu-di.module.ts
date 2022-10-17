import { NgModule } from '@angular/core';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import { VanThuComponent } from './components/nhap-moi/van-thu-nhap-moi/van-thu.component';
import { NhanVienComponent } from './components/nhap-moi/nhan-vien-nhap-moi/nhan-vien.component';
import {NhapMoiComponent} from "./components/nhap-moi/nhap-moi.component";
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import {FormsModule} from "@angular/forms";
import { ThuDangSoanComponent } from './components/thu-dang-soan/thu-dang-soan.component';
import { NhanVienSoanThuComponent } from './components/thu-dang-soan/nhan-vien-soan-thu/nhan-vien-soan-thu.component';
import { VanThuSoanThuComponent } from './components/thu-dang-soan/van-thu-soan-thu/van-thu-soan-thu.component';
import {ThuChoXyLyComponent} from "./components/thu-cho-xy-ly/thu-cho-xy-ly.component";
import {VanThuChoXuLyComponent} from "./components/thu-cho-xy-ly/van-thu-cho-xu-ly/van-thu-cho-xu-ly.component";
import {MessageService} from "primeng/api";
import { ThuDaGuiComponent } from './components/thu-da-gui/thu-da-gui.component';
import { NhanVienThuDaGuiComponent } from './components/thu-da-gui/nhan-vien-thu-da-gui/nhan-vien-thu-da-gui.component';
import { VanThuThuDaGuiComponent } from './components/thu-da-gui/van-thu-thu-da-gui/van-thu-thu-da-gui.component';
import {PrimeNgModule} from "../primeng-module/primeng.module";
import {BaseModule} from "../base-module/base.module";
import { TatCaThuDiComponent } from './components/tat-ca-thu-di/tat-ca-thu-di.component';
import { TatCaThuDiNhanVienComponent } from './components/tat-ca-thu-di/tat-ca-thu-di-nhan-vien/tat-ca-thu-di-nhan-vien.component';
import { TatCaThuDiVanThuComponent } from './components/tat-ca-thu-di/tat-ca-thu-di-van-thu/tat-ca-thu-di-van-thu.component';
import { ThuTraLaiComponent } from './components/thu-tra-lai/thu-tra-lai.component';
import { ThuTraLaiNhanVienComponent } from './components/thu-tra-lai/thu-tra-lai-nhan-vien/thu-tra-lai-nhan-vien.component';
import { ThuTraLaiVanThuComponent } from './components/thu-tra-lai/thu-tra-lai-van-thu/thu-tra-lai-van-thu.component';
import { ImportThuDiComponent } from './components/import-thu-di/import-thu-di.component';
import { ImportThuDiVanThuComponent } from './components/import-thu-di/import-thu-di-van-thu/import-thu-di-van-thu.component';

const routes: Routes = [
  {path: 'nhap-moi', component: NhapMoiComponent},
  {path: 'thu-dang-soan', component: ThuDangSoanComponent},
  {path: 'thu-cho-xu-ly', component: ThuChoXyLyComponent},
  {path: 'thu-da-gui', component: ThuDaGuiComponent},
  {path: 'tat-ca-thu-di', component: TatCaThuDiComponent},
  {path: 'thu-tra-lai', component: ThuTraLaiComponent},
  {path: 'import-thu-di', component: ImportThuDiComponent},
]

@NgModule({
  declarations: [
    NhapMoiComponent,
    VanThuComponent,
    NhanVienComponent,
    ThuDangSoanComponent,
    NhanVienSoanThuComponent,
    VanThuSoanThuComponent,
    ThuChoXyLyComponent,
    VanThuChoXuLyComponent,
    ThuDaGuiComponent,
    NhanVienThuDaGuiComponent,
    VanThuThuDaGuiComponent,
    TatCaThuDiComponent,
    TatCaThuDiNhanVienComponent,
    TatCaThuDiVanThuComponent,
    ThuTraLaiComponent,
    ThuTraLaiNhanVienComponent,
    ThuTraLaiVanThuComponent,
    ImportThuDiComponent,
    ImportThuDiVanThuComponent,
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
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: []
})
export class ThuDiModule { }
