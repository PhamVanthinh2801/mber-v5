import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {MessageService} from "primeng/api";
import {iComponentBase} from "../../../base-module/functions/iServiceBase";

@Component({
  selector: 'app-thu-da-gui',
  templateUrl: './thu-da-gui.component.html',
  styleUrls: ['./thu-da-gui.component.scss']
})
export class ThuDaGuiComponent extends iComponentBase implements OnInit{

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
    if(this.checkNhanVien){
      this.isVanthu = false
    }else{
      this.isVanthu = true
    }
  }
}
