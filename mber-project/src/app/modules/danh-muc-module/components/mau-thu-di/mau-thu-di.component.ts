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
import {iComponentBase} from "../../../base-module/functions/iServiceBase";
import {Title} from "@angular/platform-browser";
import {MessageService} from "primeng/api";
import {MauThuDiService} from "./mau-thu-di.service";
import {LocalStorageService} from "../../../system-module/functions/store/local-storage.service";

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
  selectedLetterBook: SoThuModel;
  listAffiliatedSendUnit: DonViModel[]
  selectedAffiliatedSendUnit: DonViModel
  listSender: NhanVienModel[];
  selectedSender: NhanVienModel;
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

  constructor(private sharedApi: SharedApi,
              private mauThuDiService: MauThuDiService,
              private tokenStorageService: LocalStorageService,
              public title: Title,
              public msg: MessageService) {
    super(msg, title);
  }

  ngOnInit(): void {
    this.listTypeLetters = [{name: 'Nội bộ', key: '1'}, {name: 'Bên ngoài', key: '2'}];  // selection loại thư bên trong và bên ngoài
    this.checkboxTypeLetter = this.listTypeLetters[0];
    this.getDataInit();
  }

  getDataInit() {
    this.user = this.tokenStorageService.getUserFromStorage(); // get thông tin người dùng đăng nhập trong hệ thống
    this.thuDi = {};
    this.thuDi.inputDate = new Date();
    this.thuDi.sendDate = new Date()
    // this.thuDi.affiliatedSendUnit
    // lấy đơn vị
    this.sharedApi.getAllDonVi().subscribe((data: any) => {
      this.listUnit = data.result.items;
      this.listAffiliatedSendUnit = data.result.items;
      this.listReceivePlace = data.result.items;
    })
    const param = {
      isSample: true
    }

    // lấy thư mẫu tron Db
    this.mauThuDiService.getALlLetterSample(param).subscribe((data: any) => {
      console.log(data)
      this.listLetterSample = data.result.content
      ;
    })

    // lấy sổ thư
    this.sharedApi.getSoThuDen().subscribe((data: any) => {
      this.listLetterBook = data.result.items;
      console.log(data)
    })

    // auto gen mã thư đi
    this.sharedApi.getAutoGenCode().subscribe((data) => {
      this.thuDi.code = data.result;
    })

    // lấy độ mật
    this.sharedApi.getDoMat().subscribe((data: any) => {
      this.listSecurity = data.result.items;
    })

    // lấy độ mật
    this.sharedApi.getDoMat().subscribe((data: any) => {
      this.listUrgency = data.result.items;
    })

    // get đơn vị chuyển phát
    this.sharedApi.getDonViChuyenPhat().subscribe((data: any) => {
      this.listDeliveryUnit = data.result.items
    })

    this.sharedApi.getAutoGenCode().subscribe((data: any) => {
      this.thuDi.itemCode = data.result;
    })
  }

  onRowSelect(ev: any) {
  }

  addLetterSample() {
    this.onShowLetterSample = true;
  }

  getSender(ev: any) {
    if (!this.selectedAffiliatedSendUnit) {
      this.listSender = []
    } else {
      this.sharedApi.getPersonByParentOganization(this.selectedAffiliatedSendUnit.sysOrganizationId).subscribe((data: any) => {
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
      affiliatedSendUnitId: this.selectedAffiliatedSendUnit?.sysOrganizationId, // Đơn vị trực thuộc gửi
      senderId: this.selectedSender?.employeeId,  // Người gửi
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
      receiveAddress: this.thuDi.receiveAddress,  // Địa chỉ nhận
      status: this.thuDi.status ? this.thuDi.status: null  // Tình trạng
    }
  }

  saveData() {
    const param = this.createParam();
    console.log('thu di ', param)
  }

}
