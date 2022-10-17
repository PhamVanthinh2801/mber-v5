import {Component, OnInit, ViewChild} from '@angular/core';
import {iComponentBase, mType} from "../../../base-module/functions/iServiceBase";
import {MessageService} from "primeng/api";
import {Title} from "@angular/platform-browser";
import {Table} from 'primeng/table';

@Component({
  selector: 'app-nhap-moi',
  templateUrl: './nhap-moi.component.html',
  styleUrls: ['./nhap-moi.component.scss'],
  providers: [MessageService]
})
export class NhapMoiComponent extends iComponentBase implements OnInit {
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
