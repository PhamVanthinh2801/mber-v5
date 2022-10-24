import {Component, OnInit} from '@angular/core';
import {SharedApi} from "../../../base-module/service/api.shared.services";
import {
  DoKhanModel,
  DoMatModel,
  DonViChuyenPhatModel,
  DonViModel,
  NhanVienModel,
  SoThuModel,
  ThuDiModel
} from "../../../base-module/models";
import {iComponentBase, mType} from "../../../base-module/functions/iServiceBase";
import {Title} from "@angular/platform-browser";
import {MessageService} from "primeng/api";
import {MauThuDiService} from "./mau-thu-di.service";
import {LocalStorageService} from "../../../system-module/functions/store/local-storage.service";
import {ErrorModel} from "../../../base-module/models/error/error.model";

@Component({
  selector: 'app-mau-thu-di',
  templateUrl: './mau-thu-di.component.html',
  styleUrls: ['./mau-thu-di.component.scss']
})
export class MauThuDiComponent extends iComponentBase implements OnInit {
  user: NhanVienModel; // full thông tin người dùng.
  listUnit: DonViModel[]
  selectedUnit: DonViModel;
  listLetterSample: ThuDiModel[]
  listLetterBook: SoThuModel[];
  listAffiliatedSendUnit: DonViModel[]
  listSender: NhanVienModel[];
  listSecurity: DoMatModel[]
  listUrgency: DoKhanModel[]
  listReceivePlace: DonViModel[]
  listReceiveUnit: DonViModel[]
  listAffiliatedReceiveUnit: DonViModel[]
  listRecipient: NhanVienModel[];
  listDeliveryUnit: DonViChuyenPhatModel[];

  selectedData: any
  onShowLetterSample = false;
  checkboxTypeLetter: any = null; // chọn nội bộ hoặc bên ngoài
  listTypeLetters: any; // list checkbox thư nội bộ và bên ngoài,
  thuDi: ThuDiModel;
  selectedRowData: ThuDiModel;
  checkTypeAction: string;
  titlePopUp = '';
  isCheckDisabled = false;

  constructor(private sharedApi: SharedApi,
              private mauThuDiService: MauThuDiService,
              private tokenStorageService: LocalStorageService,
              public title: Title,
              public msg: MessageService) {
    super(msg, title);
  }

  ngOnInit(): void {
    this.thuDi = {}
    this.listTypeLetters = [{name: 'Nội bộ', key: '1'}, {name: 'Bên ngoài', key: '2'}];  // selection loại thư bên trong và bên ngoài
    this.checkboxTypeLetter = this.listTypeLetters[0];
    this.getDataInit();
  }

  getDataInit() {
    this.user = this.tokenStorageService.getUserFromStorage(); // get thông tin người dùng đăng nhập trong hệ thống
    this.thuDi.inputDate = new Date();
    this.thuDi.sendDate = new Date()
    // lấy đơn vị
    this.sharedApi.getAllDonVi().subscribe((data: any) => {
      this.listUnit = data.result.items;
      this.listAffiliatedSendUnit = data.result.items;
      this.listReceivePlace = data.result.items;
    })
    // lấy sổ thư
    this.sharedApi.getSoThuDen().subscribe((data: any) => {
      this.listLetterBook = data.result.items;
      console.log(data)
    })
    // lấy độ mật
    this.sharedApi.getDoMat().subscribe((data: any) => {
      this.listSecurity = data.result.items;
    })

    // lấy độ khẩn
    this.sharedApi.getDoKhan().subscribe((data: any) => {
      this.listUrgency = data.result.items;
    })

    // get đơn vị chuyển phát
    this.sharedApi.getDonViChuyenPhat().subscribe((data: any) => {
      this.listDeliveryUnit = data.result.items
    })

    // get init nhân viên
    this.sharedApi.getAllNhanVien().subscribe((data: any)=> {
      this.listSender = data.result.items;
    })

    // lấy mẫu init
    this.getLetterSample();

    // get mã thư đi init
    this.getCode();

    //Số vận đơn init
    this.getItemCode()
  }

  getCode() {
    // auto gen mã thư đi code
    this.sharedApi.getAutoGenCode().subscribe((data) => {
      this.thuDi.code = data.result;
    })
  }

  getItemCode() {
    // auto gen số vận đơn itemCode
    this.sharedApi.getAutoGenCode().subscribe((data: any) => {
      this.thuDi.itemCode = data.result;
    })
  }

  getLetterSample() {
    // lấy thư mẫu tron Db
    const param = {
      isSample: true,
      status: 1
    }
    this.mauThuDiService.getALlLetterSample(param).subscribe((data: any) => {
      console.log(data)
      this.listLetterSample = data.result.content
      ;
    })
  }

  onRowSelect(ev: any) {
    this.selectedRowData = ev.data;
    this.thuDi = this.selectedRowData;
  }

  clickOnEdit() {
    if (this.selectedRowData) {
      this.checkboxTypeLetter = this.listTypeLetters[this.selectedRowData.type - 1];
      this.isCheckDisabled = true;
      this.titlePopUp = 'Chỉnh sửa mẫu thư đi'
      this.checkTypeAction = 'edit'
      this.thuDi.inputDate = new Date(this.selectedRowData.inputDate)
      this.thuDi.sendDate = new Date(this.selectedRowData.sendDate)
      this.onShowLetterSample = true;

      // maping with data popup
      this.listReceiveUnit = [this.thuDi.receiveUnit]
      this.listAffiliatedReceiveUnit = [this.thuDi.affiliatedReceiveUnit]
      this.listRecipient = [this.thuDi.recipient];
    } else {
      this.onShowLetterSample = false;
      this.showMessage(mType.info, 'Thông báo', 'Vui lòng chọn dữ liệu để cập nhật');
    }
  }

  clickAddSample() {
    this.isCheckDisabled = false;
    this.checkTypeAction = 'add'
    this.titlePopUp = 'Thêm mới mẫu thư đi'
    this.thuDi = {};
    this.thuDi.inputDate = new Date();
    this.thuDi.sendDate = new Date();
    this.getItemCode();
    this.getCode();
    this.onShowLetterSample = true;
  }

  clickDeleted(){
    try {
      if(this.selectedRowData) {
        this.mauThuDiService.deletedLetterSample(this.selectedRowData.id).subscribe((data: any) => {
          if (data) {
            this.showMessage(mType.success, 'Thông báo', 'Xóa mẫu thư đi thành công');
            this.getLetterSample();
          }
        })
      }else{
        this.showMessage(mType.info, 'Thông báo', 'Chọn mẫu thư đi để xóa');
      }
    }catch (e) {

    }
  }

  getSender(ev: any) {
    if (!this.thuDi.affiliatedSendUnit) {
      this.listSender = []
    } else {
      this.sharedApi.getPersonByParentOganization(this.thuDi.affiliatedSendUnit.sysOrganizationId).subscribe((data: any) => {
        this.listSender = data.result.items;
      })
    }
  }

  getReceiveUnit() {
    if (!this.thuDi.receivePlace) {
      this.listReceiveUnit = []
    } else {
      this.sharedApi.getParentOrganizations(this.thuDi.receivePlace.sysOrganizationId).subscribe((data: any) => {
        console.log(data)
        this.listReceiveUnit = data.result.items;
      })
    }
  }

  getAffiliatedReceiveUnit() {
    if (!this.thuDi.receiveUnit) {
      this.listAffiliatedReceiveUnit = [];
    } else {
      this.sharedApi.getParentOrganizations(this.thuDi.receiveUnit.sysOrganizationId).subscribe((data: any) => {
        this.listAffiliatedReceiveUnit = data.result.items;
      })
    }
  }

  getListRecipient() {
    if (!this.thuDi.affiliatedReceiveUnit) {
      this.listRecipient = []
    } else {
      this.sharedApi.getPersonByParentOganization(this.thuDi.affiliatedReceiveUnit.sysOrganizationId).subscribe((data: any) => {
        this.listRecipient = data.result.items;
      })
    }
  }

  createParam() {
    return {
      cost: this.thuDi.cost,
      itemCode: this.thuDi.itemCode,
      deliveryUnitId: this.thuDi.deliveryUnit?.id, // đơn vị chuyển phát,
      isSample: true, // thư mẫu
      staffId: this.user?.employeeId,// nhân viên lấy từ hệ thống đăng nhập
      letterCodeId: this.thuDi.letterCode?.id, // sổ thư đi
      code: this.thuDi.code,  // Mã thư đi
      inputDate: this.thuDi.inputDate.getTime(),  // Ngày nhập
      sendDate: this.thuDi.sendDate.getTime(), // Ngày gửi
      sendUnitId: this.user?.organization?.sysOrganizationId,  // Đơn vị gửi
      affiliatedSendUnitId: this.thuDi.affiliatedSendUnit?.sysOrganizationId, // Đơn vị trực thuộc gửi
      senderId: this.thuDi.sender?.employeeId,  // Người gửi
      textCode: this.thuDi.textCode,  // Số hiệu văn bản
      summary: this.thuDi.summary,  // Trích yếu
      securityLevelId: this.thuDi.securityLevel?.id,  // Độ mật *
      urgencyLevelId: this.thuDi.urgencyLevel?.id,  // Độ khẩn *
      type: Number(this.checkboxTypeLetter.key),  // Phân loại thư
      receivePlaceId: this.checkboxTypeLetter.key == 1 ? this.thuDi.receivePlace?.sysOrganizationId : null,  // Nơi nhận
      receiveUnitId: this.thuDi.receiveUnit?.sysOrganizationId,  // Đơn vị nhận
      // selected nơi nhận bên ngoài nếu có dữ liệu bên ngoài dưới DB
      outSiteReceiveId: this.thuDi.outSiteReceive ? this.thuDi.outSiteReceive?.id : null,
      outSiteReceive: this.checkboxTypeLetter.key == 2 ? {
        address: this.thuDi.outSiteReceive?.address,
        contactName: this.thuDi.outSiteReceive.contactName,
        phone: this.thuDi.outSiteReceive.phone,
        name: this.thuDi.outSiteReceive.name,
        id: this.thuDi.outSiteReceive?.id
      } : null,  // phần này giành cho bên ngoài truyền vào là một object bên ngoài
      affiliatedReceiveUnitId: this.thuDi.affiliatedReceiveUnit?.sysOrganizationId,  // Đơn vị trực thuộc nhận
      recipientId: this.checkboxTypeLetter.key == 1 ? this.thuDi.recipient?.employeeId : null,  // Người nhận
      mobilePhone: this.checkboxTypeLetter.key == 1 ? this.thuDi.mobilePhone : null,
      receiveAddress: this.thuDi.receiveAddress ? this.thuDi.receiveAddress : 'số 261 Khuất Duy Tiến',  // Địa chỉ nhận
      status: 1 // Tình trạng
    }
  }

  saveData(typeAction: any) {
    try {
      if (typeAction == 'add') {
        const param = this.createParam();
        this.mauThuDiService.createLetterSample(param).subscribe((data: any) => {
          if (data) {
            this.showMessage(mType.success, 'Thông báo', 'Thêm mẫu thư đi thành công');
            setTimeout(() => {
              this.onShowLetterSample = false;
            }, 500)
            this.getCode();
            this.getItemCode();
            this.getLetterSample();
          }
        }, (error: ErrorModel) => {
          this.showMessage(mType.error, 'Thông báo', 'Lỗi thêm mẫu thư đi, vui lòng kiếm tra lại ' + error.error.result.errors);
        })
      }
      if (typeAction == 'edit') {
        this.onShowLetterSample = true;
        this.thuDi = this.selectedRowData;
        this.thuDi.inputDate = new Date(this.selectedRowData.inputDate).getTime()
        this.thuDi.sendDate = new Date(this.selectedRowData.sendDate).getTime()
        this.mauThuDiService.updateLetterSample(this.selectedRowData.id, this.thuDi).subscribe((data: any) => {
          if (data) {
            this.showMessage(mType.success, 'Thông báo', 'Cập nhật thành công');
          }
        })
      }
    } catch (e) {
    }
  }

}
