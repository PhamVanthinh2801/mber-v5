import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from "../../../system-module/functions/store/local-storage.service";
import {DonViModel, NhanVienModel, ThuDenModel} from "../../../base-module/models";
import {SharedApi} from "../../../base-module/service/api.shared.services";
import {ThuChuaNhanService} from "./thu-chua-nhan.service";
import {iComponentBase, mType} from "../../../base-module/functions/iServiceBase";
import {ConfirmationService, MessageService} from "primeng/api";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-thu-chua-nhan',
  templateUrl: './thu-chua-nhan.component.html',
  styleUrls: ['./thu-chua-nhan.component.scss']
})
export class ThuChuaNhanComponent extends iComponentBase implements OnInit {
  user: NhanVienModel;
  listThuChuaNhan: ThuDenModel[];
  selectedThuChuaNhan: ThuDenModel;
  showConfirm = false;
  showConfirmAccept = false;
  showDialogNhanThu = false;
  showDialogNhanHoThu = false;
  listDonViNhanHo: DonViModel[];
  selectedDonViNhanHo: DonViModel;
  listNguoiNhanHo: NhanVienModel;
  selectedNguoiNhanHo: NhanVienModel;

  constructor(private tokenStorageService: LocalStorageService,
              private sharedApi: SharedApi,
              public msg: MessageService,
              public title: Title,
              private thuChuaNhanService: ThuChuaNhanService) {
    super(msg, title);
  }

  ngOnInit(): void {
    this.user = this.tokenStorageService.getUserFromStorage(); // get thông tin người dùng đăng nhập trong hệ thống
    this.getThuChuaNhan();
  }

  getThuChuaNhan() {
    const param = {
      pageIndex: 1,
      pageSize: 100,
      status: 2
    }
    this.thuChuaNhanService.getThuChuaNhan(param).subscribe((data: any) => {
      this.listThuChuaNhan = data.result.content;
    })
  }

  onRowSelect(ev: any) {
    this.selectedThuChuaNhan = ev.data;
  }

  showConfirmation(typeConfirm?: any) {
    if (typeConfirm == 'onDelete') {
      if (!this.selectedThuChuaNhan) {
        this.showMessage(mType.info, 'Thông báo', 'Vui lòng chọn dữ liệu để xóa');
        return;
      } else
        this.showConfirm = true;
    }
    if (typeConfirm == 'accepted') {
      if (!this.selectedThuChuaNhan) {
        this.showMessage(mType.info, 'Thông báo', 'Vui lòng chọn dữ liệu để xác nhận');
        return;
      } else
        this.showConfirmAccept = true;
    }
  }

  onDelete(isConfirm?: any) {
    try {
      if (isConfirm == 'yes') {
        // this is deleted letter
        this.thuChuaNhanService.onDeleteThuChuaNhan(this.selectedThuChuaNhan.id).subscribe((data: any) => {
          if (data) {
            this.showMessage(mType.success, 'Thông báo', 'Xóa thành công');
            this.getThuChuaNhan();
            this.showConfirm = false;
            this.freshPage();
          } else {
            this.showMessage(mType.warn, 'Thông báo', 'Xóa không thành công');
            this.showConfirm = false;
          }
        })
      }
      if (isConfirm == 'no') {
        this.showConfirm = false;
      }
    } catch (e) {
      this.showMessage(mType.error, 'Thông báo', 'Lỗi xóa không thành công');
      this.showConfirm = false;
    }
  }

  // Nhận hộ thư
  payloadNhanHoThu() {
    try {
      const param = this.selectedThuChuaNhan;
      param.status = 3;
      if(!this.selectedDonViNhanHo && !this.selectedNguoiNhanHo){
        this.showMessage(mType.warn, 'Thông báo', 'vui lòng chọn người nhận hộ');
      }else{
        this.thuChuaNhanService.onUpdateThu(this.selectedThuChuaNhan.id, param).subscribe((data: any) => {
          if (data) {
            this.showMessage(mType.success, 'Thông báo', 'Xác nhận hộ thư thành công');
            this.getThuChuaNhan();
            this.showDialogNhanHoThu = false;
            this.freshPage();
          } else {
            this.showMessage(mType.warn, 'Thông báo', 'Không thành công');
            this.showDialogNhanHoThu = false;
          }
        })
      }
    } catch (e) {
      this.showDialogNhanHoThu = false;
    }

  }

  getNguoiNhanHo(ev: DonViModel){
    this.sharedApi.getPersonByParentOganization(ev.sysOrganizationId).subscribe((data)=> {
      this.listNguoiNhanHo = data.result.items;
    })
  }

  // Nhận thư
  payLoadNhanThu(typePayload?: any) {
    try {
      const param = this.selectedThuChuaNhan;
      param.status = 3;
      if (typePayload == 'nhanthu') {
        this.thuChuaNhanService.onUpdateThu(this.selectedThuChuaNhan.id, param).subscribe((data: any) => {
          if (data) {
            this.showMessage(mType.success, 'Thông báo', 'Xác nhận thư thành công');
            this.getThuChuaNhan();
            this.showConfirmAccept = false;
            this.freshPage();
          } else {
            this.showMessage(mType.warn, 'Thông báo', 'Không thành công');
            this.showConfirmAccept = false;
          }
        })
      }
      if (typePayload == 'nhanhothu') {
        this.showConfirmAccept = false;
        this.showDialogNhanThu = false;
        this.sharedApi.getAllDonVi().subscribe((data)=> {
          console.log('á xóa đi', data)
          this.listDonViNhanHo = data.result.items;
        })
        this.showDialogNhanHoThu = true
      }
    } catch (e) {

    }
  }

  acceptLetter(isConfirm?: any) {
    try {
      if (isConfirm == 'yes') {
        // this is accepted letter
        this.showDialogNhanThu = true;
      }
      if (isConfirm == 'no') {
        this.showConfirmAccept = false;
      }
    } catch (e) {
      this.showMessage(mType.error, 'Thông báo', 'Lỗi xác nhận thư thành công');
      this.showConfirmAccept = false;
    }
  }
}
