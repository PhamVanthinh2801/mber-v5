import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { LocalStorageService } from './modules/system-module/functions/store/local-storage.service';

// @ts-ignore
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(private tokenStorageService: LocalStorageService , public router: Router, public route: ActivatedRoute) { }
  ngOnInit(): void {
    if (this.tokenStorageService.getUserFromStorage()==undefined || this.tokenStorageService.getUserFromStorage() == null) {
      this.router.navigate(['/login']);
    }else {
      this.router.navigate(['/thu-den/thu-chua-nhan']);
    }
  }
}
