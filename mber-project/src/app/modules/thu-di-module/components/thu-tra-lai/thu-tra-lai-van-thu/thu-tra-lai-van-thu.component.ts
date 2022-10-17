import { Component, OnInit } from '@angular/core';
import {iComponentBase} from "../../../../base-module/functions/iServiceBase";
import {Title} from "@angular/platform-browser";
import {SharedApi} from "../../../../base-module/service/api.shared.services";
import {MessageService} from "primeng/api";
import {DonViModel} from "../../../../base-module/models";

@Component({
  selector: 'app-thu-tra-lai-van-thu',
  templateUrl: './thu-tra-lai-van-thu.component.html',
  styleUrls: ['./thu-tra-lai-van-thu.component.scss']
})
export class ThuTraLaiVanThuComponent extends iComponentBase implements OnInit{
  first = 1;
  listThuTraLai: any;
  selectedThuTraLai: any
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
    this.getThuTraLai();
    this.getCoQuan();
  }


  getThuTraLai() {
    const param = {
      status: 3,
      pageIndex: this.first,
      pageSize: 100
    }
    this.sharedApi.getThuDiTheoTrangThai(param).subscribe((data: any) => {
      this.listThuTraLai = data.result.content;
      console.log(this.listThuTraLai);
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
      status: 3,
      organizationId: this.selectedCoQuan ? this.selectedCoQuan?.sysOrganizationId : null,
      year: this.selectedYear?.year,
      keyword: this.keyword
    }
    this.sharedApi.getThuDiTheoTrangThai(param).subscribe((data: any) => {
      this.listThuTraLai = data.result.content;
    })
  }
  refresh(){
    window.location.reload();
  }
}
