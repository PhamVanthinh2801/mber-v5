import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {AutocompleteLibModule} from "angular-ng-autocomplete";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {MessageService} from "primeng/api";
import {BaseModule} from "../base-module/base.module";
import {PrimeNgModule} from "../primeng-module/primeng.module";
import {QuanLyDanhSachConDauComponent} from './components/quan-ly-danh-sach-con-dau/quan-ly-danh-sach-con-dau.component';
import { QuanLyYeuCauComponent } from './components/quan-ly-yeu-cau/quan-ly-yeu-cau.component';
import { DanhSachConDauComponent } from './components/danh-sach-con-dau/danh-sach-con-dau.component';


const routes: Routes = [
  {path: 'quan-ly-danh-sach-con-dau', component: QuanLyDanhSachConDauComponent},
  {path: 'quan-ly-yeu-cau', component: QuanLyYeuCauComponent},
  {path: 'danh-sach-con-dau', component: DanhSachConDauComponent},
]

@NgModule({
  declarations: [
    QuanLyDanhSachConDauComponent,
    QuanLyYeuCauComponent,
    DanhSachConDauComponent
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
export class ConDauModule {
}
