import {Component, OnInit} from '@angular/core';
import {QuanLyDanhSachConDauService} from "./quan-ly-danh-sach-con-dau.service";
import {LocalStorageService} from "../../../system-module/functions/store/local-storage.service";
import {Title} from "@angular/platform-browser";
import {SharedApi} from "../../../base-module/service/api.shared.services";
import {MessageService} from "primeng/api";
import {iComponentBase} from "../../../base-module/functions/iServiceBase";

@Component({
  selector: 'app-quan-ly-danh-sach-con-dau',
  templateUrl: './quan-ly-danh-sach-con-dau.component.html',
  styleUrls: ['./quan-ly-danh-sach-con-dau.component.scss']
})
export class QuanLyDanhSachConDauComponent extends iComponentBase implements OnInit {
  user: any;
  isPopupUpdate = false;
  isPopupUpdate0 = false;
  constructor(private quanLyDanhSachConDauService: QuanLyDanhSachConDauService,
              private tokenStorageService: LocalStorageService,
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
