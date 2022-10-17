import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {SharedApi} from "../../../../base-module/service/api.shared.services";
import {MessageService} from "primeng/api";
import {iComponentBase} from "../../../../base-module/functions/iServiceBase";
import {DonViModel} from "../../../../base-module/models";

@Component({
  selector: 'app-tat-ca-thu-di-van-thu',
  templateUrl: './tat-ca-thu-di-van-thu.component.html',
  styleUrls: ['./tat-ca-thu-di-van-thu.component.scss']
})
export class TatCaThuDiVanThuComponent extends iComponentBase implements OnInit{
  first = 1;
  listThuDaGui: any;
  selectedThuDaGui: any
  listCoQuan: DonViModel[];
  selectedCoQuan: DonViModel;
  listYear: any
  selectedYear: any;
  keyword: any

  constructor(public title: Title,
              private sharedApi: SharedApi,
              public msg: MessageService) {
    super(msg, title);
  }

  ngOnInit(): void {
    this.listYear = [{year: '2020'}, {year: '2021'}, {year: '2022'}]
    this.selectedCoQuan = {};
    this.getTatCaThu();
    this.getCoQuan();
  }


  getTatCaThu() {
    const param = {
      pageIndex: this.first,
      pageSize: 100
    }
    this.sharedApi.getThuDiTheoTrangThai(param).subscribe((data: any) => {
      this.listThuDaGui = data.result.content;
    })
  }

  getCoQuan() {
    this.sharedApi.getAllDonVi().subscribe((data: any) => {
      this.listCoQuan = data.result.items
    })
  }

  onEventCheckCoQuan(ev: any) {
    this.selectedCoQuan = ev.value;
  }

  onRowSelect(ev: any) {
  }

  onSearch() {
    const param = {
      status: 5,
      organizationId: this.selectedCoQuan ? this.selectedCoQuan?.sysOrganizationId : null,
      year: this.selectedYear?.year,
      keyword: this.keyword
    }
    this.sharedApi.getThuDiTheoTrangThai(param).subscribe((data: any) => {
      this.listThuDaGui = data.result.content;
    })
  }
  refresh(){
    window.location.reload();
  }
}
