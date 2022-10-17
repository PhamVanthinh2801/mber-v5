import { Component, OnInit } from '@angular/core';
import {iComponentBase} from "../../../base-module/functions/iServiceBase";
import {Title} from "@angular/platform-browser";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-import-thu-di',
  templateUrl: './import-thu-di.component.html',
  styleUrls: ['./import-thu-di.component.scss']
})
export class ImportThuDiComponent extends iComponentBase implements OnInit {

  isVanthu = false;
  checkNhanVien: any;
  checkVanThu: any;

  constructor(public title: Title,
              public msg: MessageService) {
    super(msg, title);
    this.checkNhanVien = window.localStorage.getItem('nhanvien')
    this.checkVanThu = window.localStorage.getItem('vanthu')
  }

  ngOnInit(): void {
    if (this.checkNhanVien) {
      this.isVanthu = false
    } else {
      this.isVanthu = true
    }
  }
}
