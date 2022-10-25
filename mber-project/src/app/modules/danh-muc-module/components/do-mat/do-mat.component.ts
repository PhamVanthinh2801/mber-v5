import { Component, OnInit } from '@angular/core';
import {iComponentBase, mType} from "../../../base-module/functions/iServiceBase";
import {DoKhanModel, DoMatModel} from "../../../base-module/models";
import {SharedApi} from "../../../base-module/service/api.shared.services";
import {DoKhanService} from "../do-khan/do-khan.service";
import {Title} from "@angular/platform-browser";
import {MessageService} from "primeng/api";
import {DoMatService} from "./do-mat.service";

@Component({
  selector: 'app-do-mat',
  templateUrl: './do-mat.component.html',
  styleUrls: ['./do-mat.component.scss']
})
export class DoMatComponent extends iComponentBase implements OnInit {
  listSecurity: DoMatModel[];
  selectedSecurity: DoMatModel;
  showAdd = false;
  showUpdate = false;
  cols = [
    {field: 'id', header: 'Mã code', style: 'width: 6%; text-align: center'},
    {field: 'name', header: 'Tên độ mật', style: 'width: auto; text-align: left'},
  ]

  constructor(private shareApi: SharedApi,
              private doKhanService: DoMatService,
              public title: Title,
              public msg: MessageService) {
    super(msg, title);
  }

  ngOnInit(): void {
    this.selectedSecurity = {}
    this.getDataUrgency();
  }

  getDataUrgency() {
    this.shareApi.getDoMat().subscribe((data: any) => {
      this.listSecurity = data.result.items
    })
  }

  dataEmit(ev) {
    console.log('emit pa', ev)
    this.selectedSecurity = ev;
  }

  popUpAdd(ev: any) {
    if (ev == 'true') {
      this.selectedSecurity = {}
      this.showAdd = true;
    }
  }

  addUrgencyToChild() {
    this.doKhanService.addData(this.selectedSecurity).subscribe((data: any) => {
      if (data) {
        this.showMessage(mType.success, 'Thông báo', 'Thêm độ khẩn thành công');
        this.getDataUrgency()
        this.selectedSecurity = {}
        this.freshPage();
      }
    })
  }

  isDeleted(ev) {
    if (ev == 'true') {
      this.doKhanService.onDeleted(this.selectedSecurity.id).subscribe((data: any) => {
        this.showMessage(mType.success, 'Thông báo', 'Xóa độ khẩn thành công');
        this.selectedSecurity = {}
        this.getDataUrgency()
      })
    }
  }

  popUpEdited(ev: any) {
    if (ev == 'true') {
      this.showUpdate = true;
    }
  }

  editedUrgencyToChild() {
    try {
      this.doKhanService.updateData(this.selectedSecurity.id, this.selectedSecurity).subscribe((data: any) => {
        if (data) {
          this.showMessage(mType.success, 'Thông báo', 'Cập nhật độ khẩn thành công');
          this.selectedSecurity = {}
          this.freshPage();
        }
      })
    } catch (e) {
      console.log(e)
    }
  }
}
