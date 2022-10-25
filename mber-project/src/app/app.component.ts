import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { LocalStorageService } from './modules/system-module/functions/store/local-storage.service';
import {PrimeNGConfig} from "primeng/api";
import {VNLOC} from "./modules/base-module/constants/locale.date";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  _vn: any = VNLOC.vn_loc;
  constructor(

    private tokenStorageService: LocalStorageService ,
    private primengConfig: PrimeNGConfig,
              public router: Router, public route: ActivatedRoute) {
    this.primengConfig.setTranslation(this._vn);
  }
  ngOnInit(): void {
    if (this.tokenStorageService.getUserFromStorage()==undefined || this.tokenStorageService.getUserFromStorage() == null) {
      this.router.navigate(['/login']);
    }else {
      this.router.navigate(['/con-dau/danh-sach-con-dau']);
    }
  }
}
