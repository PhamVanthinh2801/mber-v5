import {Component, OnInit} from '@angular/core';
import {SharedApi} from "../../../base-module/service/api.shared.services";
import {DoKhanModel} from "../../../base-module/models";
import {iComponentBase, mType} from "../../../base-module/functions/iServiceBase";
import {DoKhanService} from "./do-khan.service";
import {Title} from "@angular/platform-browser";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-do-khan',
  templateUrl: './do-khan.component.html',
  styleUrls: ['./do-khan.component.scss']
})
export class DoKhanComponent extends iComponentBase implements OnInit {
  listUrgency: DoKhanModel[];
  selectedUrgency: DoKhanModel;
  showAdd = false;
  showUpdate = false;
  cols = [
    {field: 'id', header: 'Mã code', style: 'width: 6%; text-align: center'},
    {field: 'name', header: 'Tên độ mật', style: 'width: auto; text-align: left'},
  ]

  constructor(private shareApi: SharedApi,
              private doKhanService: DoKhanService,
              public title: Title,
              public msg: MessageService) {
    super(msg, title);
  }

  ngOnInit(): void {
    this.selectedUrgency = {}
    this.getDataUrgency();
  }

  getDataUrgency() {
    this.shareApi.getDoKhan().subscribe((data: any) => {
      this.listUrgency = data.result.items
    })
  }

  dataEmit(ev) {
    console.log('emit pa', ev)
    this.selectedUrgency = ev;
  }

  popUpAdd(ev: any) {
    if (ev == 'true') {
      this.selectedUrgency = {}
      this.showAdd = true;
    }
  }

  addUrgencyToChild() {
    this.doKhanService.addData(this.selectedUrgency).subscribe((data: any) => {
      if (data) {
        this.showMessage(mType.success, 'Thông báo', 'Thêm độ khẩn thành công');
        this.getDataUrgency()
        this.selectedUrgency = {}
        this.freshPage();
      }
    })
  }

  isDeleted(ev) {
    if (ev == 'true') {
      this.doKhanService.onDeleted(this.selectedUrgency.id).subscribe((data: any) => {
        this.showMessage(mType.success, 'Thông báo', 'Xóa độ khẩn thành công');
        this.selectedUrgency = {}
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
      this.doKhanService.updateData(this.selectedUrgency.id, this.selectedUrgency).subscribe((data: any) => {
        if (data) {
          this.showMessage(mType.success, 'Thông báo', 'Cập nhật độ khẩn thành công');
          this.selectedUrgency = {}
          this.freshPage();
        }
      })
    } catch (e) {
      console.log(e)
    }
  }
}
