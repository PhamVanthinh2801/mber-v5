import {Component, OnInit} from '@angular/core';
import {iComponentBase} from "../../../../base-module/functions/iServiceBase";
import {Title} from "@angular/platform-browser";
import {MessageService} from "primeng/api";
import {SharedApi} from "../../../../base-module/service/api.shared.services";
import {DonViModel} from "../../../../base-module/models";


@Component({
  selector: 'app-van-thu-thu-da-gui',
  templateUrl: './van-thu-thu-da-gui.component.html',
  styleUrls: ['./van-thu-thu-da-gui.component.scss']
})
export class VanThuThuDaGuiComponent extends iComponentBase implements OnInit {
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
    this.getThuDaGui();
    this.getCoQuan();
  }


  getThuDaGui() {
    const param = {
      status: 5
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
