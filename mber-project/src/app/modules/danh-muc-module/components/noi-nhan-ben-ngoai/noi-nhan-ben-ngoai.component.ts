import {Component, OnInit} from '@angular/core';
import {SharedApi} from "../../../base-module/service/api.shared.services";
import {NhanVienModel, NoiNhanBenNgoaiModel} from "../../../base-module/models";
import {NoiNhanBenNgoaiService} from "./noi-nhan-ben-ngoai.service";
import {iComponentBase, mType} from "../../../base-module/functions/iServiceBase";
import {Title} from "@angular/platform-browser";
import {MessageService} from "primeng/api";
import {ErrorModel} from "../../../base-module/models/error/error.model";

@Component({
  selector: 'app-noi-nhan-ben-ngoai',
  templateUrl: './noi-nhan-ben-ngoai.component.html',
  styleUrls: ['./noi-nhan-ben-ngoai.component.scss']
})
export class NoiNhanBenNgoaiComponent extends iComponentBase implements OnInit {
  listNoiNhanBenNgoai: NoiNhanBenNgoaiModel[];
  selectedDataOutSide: NoiNhanBenNgoaiModel;
  onPopupAddData = false;
  onPopupEditedData = false;
  idNoiNhanBenNgoai: number;
  outSideReceipt: NoiNhanBenNgoaiModel;

  cols = [
    {field: 'id', header: 'Mã code', style: 'width: 6%; text-align: center'},
    {field: 'contactName', header: 'Nơi nhận bên ngoài', style: 'width: 15%; text-align: left'},
    {field: 'name', header: 'Người nhận', style: 'width: 15%; text-align: center'},
    {field: 'address', header: 'Địa chỉ nhận', style: 'width: auto; text-align: left'},
    {field: 'phone', header: 'Số điện thoại', style: 'width: 15%; text-align: left'},
  ]

  constructor(private shareApi: SharedApi,
              private noiNhanBenNgoaiService: NoiNhanBenNgoaiService,
              public title: Title,
              public msg: MessageService) {
    super(msg, title);
  }

  ngOnInit(): void {
    this.outSideReceipt = {};
    this.shareApi.getAllNoiNhanBenNgoai().subscribe((data: any) => {
      this.listNoiNhanBenNgoai = data.result.items
      console.log(data);
    })
  }

  onChangedData() {
    return this.listNoiNhanBenNgoai !== undefined ? (this.listNoiNhanBenNgoai instanceof Array ? [...this.listNoiNhanBenNgoai] : [this.listNoiNhanBenNgoai]) : undefined;
  }

  dataEmit(ev: any) {
    this.idNoiNhanBenNgoai = ev.id;
    this.selectedDataOutSide = ev;
    this.outSideReceipt.contactName = this.selectedDataOutSide.contactName
    this.outSideReceipt.address = this.selectedDataOutSide.address
    this.outSideReceipt.name = this.selectedDataOutSide.name
    this.outSideReceipt.phone = this.selectedDataOutSide.phone
  }


  clickEventDeletedChild(ev: any) {
    if (ev == 'true') {
      this.noiNhanBenNgoaiService.onDeleted(this.idNoiNhanBenNgoai).subscribe((data: any) => {
        if (data) {
          this.showMessage(mType.success, 'Thông báo', 'Xóa được rồi');
          this.shareApi.getAllNoiNhanBenNgoai().subscribe((data: any) => {
            this.listNoiNhanBenNgoai = data.result.items
          })
        }
      }, (error: ErrorModel) => {
        this.showMessage(mType.error, 'Thông báo', 'Xóa được không được rồi' + error);
      })
    }
  }

  checkValidated(): boolean {
    if ((this.outSideReceipt.name
      && this.outSideReceipt.contactName
      && this.outSideReceipt.address
      && this.outSideReceipt.phone) != undefined && (this.outSideReceipt.name
      && this.outSideReceipt.contactName
      && this.outSideReceipt.address
      && this.outSideReceipt.phone) != '')
    {
      return true;
    }
    return false
  }

  addDataToChild() {
    if (this.checkValidated() == true) {
      this.noiNhanBenNgoaiService.addData(this.outSideReceipt).subscribe((data) => {
        if (data) {
          this.showMessage(mType.success, 'Thông báo', 'Thêm được dữ liệu');
          this.freshPage();
        }
      })
    } else {
      this.showMessage(mType.info, 'Thông báo', 'Vui lòng nhập đầy đủ thông tin dữ liệu');
    }
  }

  clickEventAddChild(ev: any) {
    if (ev == 'true') {
      this.outSideReceipt = {};
      this.onPopupAddData = true;
    }
  }

  clickEventEditedChild(ev: any) {
    if (ev == 'true' && this.idNoiNhanBenNgoai) {
      this.onPopupEditedData = true;
    } else {
      this.showMessage(mType.info, 'Thông báo', 'Vui lòng nhập chọn dữ liệu trên bảng để sửa');
    }
  }

  editedDataToChild() {
    if (this.checkValidated() == true) {
      const param = this.outSideReceipt;
      this.noiNhanBenNgoaiService.updateData(this.selectedDataOutSide.id, param).subscribe((data) => {
        if (data) {
          this.showMessage(mType.success, 'Thông báo', 'Cập nhật được dữ liệu');
          this.freshPage();
        }
      })
    } else {
      this.showMessage(mType.info, 'Thông báo', 'Vui lòng nhập đầy đủ thông tin dữ liệu');
    }
  }

}
