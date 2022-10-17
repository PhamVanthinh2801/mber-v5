import {RouterModule, Routes} from "@angular/router";
import {CommonModule, HashLocationStrategy, LocationStrategy} from "@angular/common";
import {PrimeNgModule} from "../primeng-module/primeng.module";
import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {BaoCaoSoThuDiComponent} from "./components/bao-cao-so-thu-di/bao-cao-so-thu-di.component";


const routes: Routes = [
  {path: 'bao-cao-so-thu-di', component:BaoCaoSoThuDiComponent },

]

@NgModule({
  declarations: [
    BaoCaoSoThuDiComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    PrimeNgModule,
    RouterModule.forChild(routes),
  ],
  exports: [],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: []
})
export class BaoCaoModule { }
