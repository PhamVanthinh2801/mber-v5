import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-thu-cho-xy-ly',
  templateUrl: './thu-cho-xy-ly.component.html',
  styleUrls: ['./thu-cho-xy-ly.component.scss']
})
export class ThuChoXyLyComponent implements OnInit {

  isVanthu = false;
  checkNhanVien: any;
  checkVanThu: any;

  constructor() {
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
