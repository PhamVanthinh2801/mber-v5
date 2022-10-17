import { Component, OnInit } from '@angular/core';
import {iComponentBase} from "../../../base-module/functions/iServiceBase";
import {Title} from "@angular/platform-browser";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-thu-tra-lai',
  templateUrl: './thu-tra-lai.component.html',
  styleUrls: ['./thu-tra-lai.component.scss']
})
export class ThuTraLaiComponent extends iComponentBase implements OnInit {

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
