import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-import-thu-di-van-thu',
  templateUrl: './import-thu-di-van-thu.component.html',
  styleUrls: ['./import-thu-di-van-thu.component.scss']
})
export class ImportThuDiVanThuComponent implements OnInit {
  listImport: any;
  selectedImport: any;
  constructor() { }

  ngOnInit(): void {
  }

  onRowSelect(ev: any){}

  refresh(){
    window.location.reload();
  }

}
