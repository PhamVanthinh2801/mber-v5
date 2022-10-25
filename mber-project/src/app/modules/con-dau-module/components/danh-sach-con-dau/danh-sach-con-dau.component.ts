import {Component, OnInit} from '@angular/core';
import {iComponentBase} from "../../../base-module/functions/iServiceBase";
import {LocalStorageService} from "../../../system-module/functions/store/local-storage.service";
import {SharedApi} from "../../../base-module/service/api.shared.services";
import {MessageService} from "primeng/api";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-danh-sach-con-dau',
  templateUrl: './danh-sach-con-dau.component.html',
  styleUrls: ['./danh-sach-con-dau.component.scss']
})
export class DanhSachConDauComponent extends iComponentBase implements OnInit {
  user: any;
  isPopupUpdate0 = false;
  isPopupUpdate = false;

  constructor(private tokenStorageService: LocalStorageService,
              private shareApi: SharedApi,
              public title: Title,
              public msg: MessageService) {
    super(msg, title);
    this.user = this.tokenStorageService.getUserFromStorage(); // get thông tin người dùng đăng nhập

  }

  ngOnInit(): void {
  }

  onOpenPopupLetter0() {
    try {
      this.isPopupUpdate0 = true
      // đối với option không có list thì đặt selected của nó vào đây


    } catch (e) {
      console.log(e)
    }
  }

  onOpenPopupLetter() {
    try {
      this.isPopupUpdate = true
      // đối với option không có list thì đặt selected của nó vào đây
    } catch (e) {
      console.log(e)
    }
  }
}

