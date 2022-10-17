import {Component, OnInit} from '@angular/core';
import {ThuDangSoanService} from "./thu-dang-soan.service";
import {iComponentBase, mType} from "../../../base-module/functions/iServiceBase";
import {Title} from "@angular/platform-browser";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-thu-dang-soan',
  templateUrl: './thu-dang-soan.component.html',
  styleUrls: ['./thu-dang-soan.component.scss'],
  providers: [MessageService]
})
export class ThuDangSoanComponent extends iComponentBase implements OnInit {

  isVanThu = false;
  checkNhanVien: any;
  checkVanThu: any;

  constructor(public title: Title,
    public msg: MessageService) {
    super(msg, title);
    this.checkNhanVien = window.localStorage.getItem('nhanvien')
    this.checkVanThu = window.localStorage.getItem('vanthu')
  }
  ngOnInit(): void {
    if(this.checkNhanVien){
      this.isVanThu = false
    }else{
      this.isVanThu = true
    }
  }
}

