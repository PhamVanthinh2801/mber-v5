import {CommonModule, HashLocationStrategy, LocationStrategy} from "@angular/common";
import {PrimeNgModule} from "../primeng-module/primeng.module";
import {HttpClientModule} from "@angular/common/http";
import {StatusLetterFromPipe} from "./pipes/status-letter-from.pipe";
import {NgModule} from "@angular/core";
import {TypeLetterPipe} from "./pipes/type-letter.pipe";
import {StatusLetterToPipe} from "./pipes/status-letter-to.pipe";
import { ThongTinTimKiemComponent } from './components/widgets/thong-tin-tim-kiem/thong-tin-tim-kiem.component';

@NgModule({
  declarations: [
    StatusLetterFromPipe,
    TypeLetterPipe,
    StatusLetterToPipe,
    ThongTinTimKiemComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    PrimeNgModule,
  ],
  exports: [
    StatusLetterFromPipe,
    TypeLetterPipe,
    StatusLetterToPipe,
    ThongTinTimKiemComponent
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: []
})
export class BaseModule { }
