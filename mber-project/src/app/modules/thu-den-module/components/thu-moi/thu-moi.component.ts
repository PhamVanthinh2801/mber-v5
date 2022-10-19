import {Component, OnInit} from '@angular/core';
import {ThuMoiService} from "./thu-moi.service";
import {iComponentBase, mType} from "../../../base-module/functions/iServiceBase";
import {MessageService} from "primeng/api";
import {Title} from "@angular/platform-browser";
import {LocalStorageService} from "../../../system-module/functions/store/local-storage.service";
import {SharedApi} from "../../../base-module/service/api.shared.services";

import {
  DoKhanModel,
  DoMatModel,
  DonViModel,
  NhanVienModel,
  SoThuModel,
  ThuDenModel,
  ThuDiModel,
} from "../../../base-module/models";
import {StatusLetterTo} from "../../../base-module/enum/trang-thai-thu/statusLetter.enum";
import {ErrorModel} from "../../../base-module/models/error/error.model";

@Component({
  selector: 'app-thu-moi',
  templateUrl: './thu-moi.component.html',
  styleUrls: ['./thu-moi.component.scss']
})
export class ThuMoiComponent extends iComponentBase implements OnInit {
  user: NhanVienModel;
  listYear = [{year: 2017}, {year: 2018}, {year: 2019}, {year: 2020}, {year: 2021}, {year: 2022}]
  selectionYear: any;
  listStatusLetter: any;
  checkStatusLetterTo: any;
  isPopupUpdate = false;
  statusLetter = 'Thư mới';
  mayLe: any;
  listNewLetter: ThuDiModel[];
  selectedRowLetter: ThuDiModel
  listOrgan: DonViModel[]
  selectedOrgan: DonViModel
  listUnit: DonViModel[]
  selectedUnit: DonViModel
  checkboxTypeLetter: any = null; // chọn nội bộ hoặc bên ngoài
  listTypeLetters: any; // list checkbox thư nội bộ và bên ngoài,
  listLetterCode: SoThuModel[]
  selectedLetterCode: SoThuModel
  thuDen: ThuDenModel
  listSendUnit: DonViModel[]
  selectedSendUnit: DonViModel
  listSecurity: DoMatModel[];
  listUrgencyLevel: DoKhanModel[]
  listReceiveUnit: DonViModel[]
  selectedReceiveUnit: DonViModel
  listAffiliatedReceiveUnit: DonViModel[]
  selectedAffiliatedReceiveUnit: DonViModel
  listSender: NhanVienModel[]
  selectedSender: NhanVienModel


  constructor(private thuMoiService: ThuMoiService,
              private tokenStorageService: LocalStorageService,
              private shareApi: SharedApi,
              public title: Title,
              public msg: MessageService) {
    super(msg, title);
    this.user = this.tokenStorageService.getUserFromStorage(); // get thông tin người dùng đăng nhập
    this.listTypeLetters = [{name: 'Nội bộ', key: '1'}, {name: 'Bên ngoài', key: '2'}];  // selection loại thư bên trong và bên ngoài
    this.listStatusLetter = [
      {
        status: StatusLetterTo.NEW,
        code: 'new',
        name: 'Mới'
      },
      {
        status: StatusLetterTo.NOT_RECEIVED,
        code: 'not_received',
        name: 'Chưa nhận'
      },
      {
        status: StatusLetterTo.RECEIVED,
        code: 'received',
        name: 'Đã nhận'
      }
    ]
  }

  ngOnInit(): void {
    this.checkStatusLetterTo = this.listStatusLetter[0];
    this.listTypeLetters = [{name: 'Nội bộ', key: '1'}, {name: 'Bên ngoài', key: '2'}];  // selection loại thư bên trong và bên ngoài
    this.checkboxTypeLetter = this.listTypeLetters[0];
    this.getNewLetterInit();
    this.dataInit();
  }

  dataInit() {
    // init data thư đi
    this.thuDen = {};
    // Get cơ quan đơn vị
    this.shareApi.getAllDonVi().subscribe((data: any) => {
      this.listOrgan = data.result.items
      this.listReceiveUnit = data.result.items;
      this.listSendUnit = data.result.items
    })
    // Get sổ thư
    this.shareApi.getSoThuDi().subscribe((data: any) => {
      this.listLetterCode = data.result.items;
    })
  }

  // action chọn loại thư nội bộ hoặc bên ngoài để xử lý vấn đề gì đấy
  typeLetterAction() {
    if (this.checkboxTypeLetter.key == 'B') {
    } else {
    }
  }

  getNewLetterInit() {
    const param = {
      pageSize: 100,
      pageIndex: 1,
      status: 5
    }
    this.shareApi.getThuDiTheoTrangThai(param).subscribe((data: any) => {
      this.listNewLetter = data.result.content;
    })
  }

  onRowSelect(ev) {
    try {
      // đoạn này xử lý ánh xạ data vào popup
      console.log('tb', this.selectedRowLetter)
      this.thuDen.requestDate = new Date(); // ngày yêu cầu
      this.thuDen.dateTo = new Date() // ngày đến
      this.thuDen.receiveTime = new Date() // thời gian nhận
      this.thuDen.code = this.selectedRowLetter.code // mã thư
      this.thuDen.itemCode = this.selectedRowLetter.itemCode; // số vận dơn
      this.selectedLetterCode = this.selectedRowLetter.letterCode
      this.thuDen.documentCode = this.selectedRowLetter.textCode;
      this.selectedSendUnit = this.selectedRowLetter.sendUnit; // đơn vị gửi
      this.mayLe = this.selectedRowLetter.sender // Máy lẻ của người nhận
      this.mayLe = this.mayLe.fullName + ', ' + this.mayLe.mobilePhone + ', ' + this.mayLe.positionName
      this.thuDen.status = this.selectedRowLetter.status;
      this.thuDen.note = this.selectedRowLetter.summary // Ghi chú
      if (this.thuDen.status == 5) {
        this.statusLetter = 'Thư mới'
      }
      // đối với option không có list sẵn thì cho vào đây trước rồi đưa vào popup sau
      this.listSecurity = [this.selectedRowLetter.securityLevel]
      this.listUrgencyLevel = [this.selectedRowLetter.urgencyLevel]
      this.listReceiveUnit = [this.selectedRowLetter.receiveUnit]
      this.listAffiliatedReceiveUnit = [this.selectedRowLetter.affiliatedReceiveUnit] //đơn vị trực thuộc nhận
      this.listSender = [this.selectedRowLetter.sender]
    } catch (e) {
      console.log(e)
    }
  }


  onOpenPopupLetter() {
    try {
      this.isPopupUpdate = true
      // đối với option không có list thì đặt selected của nó vào đây
      this.thuDen.securityLevel = this.selectedRowLetter.securityLevel
      this.thuDen.urgencyLevel = this.selectedRowLetter.urgencyLevel
      this.selectedReceiveUnit = this.selectedRowLetter.receiveUnit
      this.selectedAffiliatedReceiveUnit = this.selectedRowLetter.affiliatedReceiveUnit
      this.selectedSender = this.selectedRowLetter.sender

    } catch (e) {
      console.log(e)
    }
  }

  onDeletedRow() {
    try {
      this.shareApi.deletedLetterFrom(this.selectedRowLetter.id).subscribe((data: any) => {
        if (data) {
          this.showMessage(mType.success, 'Thông báo', 'Xóa thư thành công');
          this.getNewLetterInit();
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  createParam(): any {
    const param = {
      isSample: false, // mẫu nếu bên ngoài có check true false, nội bộ mặc định là false
      type: Number(this.checkboxTypeLetter.key), // loại thư nội bộ hay bên ngoài 1,2
      itemCode: this.thuDen.itemCode, // Số vận đơn
      letterCodeId: this.selectedLetterCode?.id, // Sổ thư đến
      dateTo: this.thuDen.dateTo.getTime(), //Ngày đến
      documentCode: this.thuDen.documentCode, //Số hiệu văn bản
      sendPlaceId: this.selectedSendUnit.sysOrganizationId, // nơi gửi
      requestDate: this.thuDen.requestDate.getTime(), //Ngày yêu cầu từ
      securityLevelId: this.thuDen.securityLevel.id, // độ mật
      urgencyLevelId: this.thuDen.urgencyLevel.id, // độ khẩn
      receiveUnitId: this.selectedReceiveUnit?.sysOrganizationId, // // đơn vị nhận
      affiliatedReceiveUnitId: this.selectedAffiliatedReceiveUnit?.sysOrganizationId, // Đơn vị trực thuộc nhận
      recipientId: this.selectedSender.employeeId, // người nhận
      ext: this.mayLe, //Máy lẻ
      receiveTime: this.thuDen.receiveTime.getTime(), // thời gian nhận
      status: 2, // trạng thái thư đến
      note: this.thuDen.note, // ghi chú
      staffId: this.user.employeeId, // nhân viên
      verifierId: null, // Người xác nhận ở status = 3
      verifyTime: null, // thời gian xác nhận status = 3
      reserveReceiverId: null, //Người nhận hộ status = 3
      reserveReceiverUnitId: null //Đơn vị của người nhận hộ status = 3
    }
    console.log('create param', param)
    return param;
  }

  onClickTiepNhan() {
    try {
      const param = this.createParam()
      console.log('param', param)
      this.thuMoiService.updateLetter(this.selectedRowLetter.id, param).subscribe((data: any) => {
        if (data) {
          this.showMessage(mType.success, 'Thông báo', 'Xác nhận thành công')
          this.freshPage();
        }
      }, (error: ErrorModel) => {
        this.showMessage(mType.error, 'Thông báo lỗi', 'Xác nhận không thành công' + error.error.result.errors)
      })
    } catch (e) {
      console.log(e)
    }
  }
}
