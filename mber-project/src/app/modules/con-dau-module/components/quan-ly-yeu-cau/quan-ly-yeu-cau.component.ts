import { Component, OnInit } from '@angular/core';
import {iComponentBase} from "../../../base-module/functions/iServiceBase";
import {QuanLyYeuCauService} from "./quan-ly-yeu-cau.service";
import {LocalStorageService} from "../../../system-module/functions/store/local-storage.service";
import {SharedApi} from "../../../base-module/service/api.shared.services";
import {Title} from "@angular/platform-browser";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-quan-ly-yeu-cau',
  templateUrl: './quan-ly-yeu-cau.component.html',
  styleUrls: ['./quan-ly-yeu-cau.component.scss']
})
export class QuanLyYeuCauComponent extends iComponentBase implements OnInit {
  user: any;
  isPopupUpdate = false;
  isPopupUpdate0 = false;
  constructor(private yeuCauService: QuanLyYeuCauService,
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
