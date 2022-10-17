import {Component, OnInit} from '@angular/core';
import {iComponentBase, mType} from "../../../../base-module/functions/iServiceBase";
import {Title} from "@angular/platform-browser";
import {ThuDangSoanService} from "../thu-dang-soan.service";
import {MessageService} from "primeng/api";
import {LocalStorageService} from "../../../../system-module/functions/store/local-storage.service";
import {SharedApi} from "../../../../base-module/service/api.shared.services";
import {NhanVienSoanThuService} from "./nhan-vien-soan-thu.service";


enum statusLetter {
  NEW = 1,
  WRITING,
  RETURN,
  PENDING,
  SENT = 5,
  VERIFIED = 6,
}

@Component({
  selector: 'app-nhan-vien-soan-thu',
  templateUrl: './nhan-vien-soan-thu.component.html',
  styleUrls: ['./nhan-vien-soan-thu.component.scss']
})
export class NhanVienSoanThuComponent extends iComponentBase implements OnInit {
  user: any;
  listThuDangSoan: any;
  selectedThuDangSoan: any;
  showThuDangSoan = false;
  listTypeLetters: any; // list checkbox thư nội bộ và bên ngoài,
  checkboxTypeLetter: any = null; // chọn nội bộ hoặc bên ngoài
  selectedLetterFrom: any; // chọn danh mục từ sổ thư đi, ....
  letterCode: any; // sổ thư đi...
  codeLetterFrom = '' // mã tự gen code
  inputDate: any;  // Ngày nhập
  sendDate: any; // Ngày gửi
  donViGui: any;
  listDonViTrucThuocGui: any;
  selectedAffiliatedSendUnit: any;
  listNguoiGui: any;
  selectedSender: any;
  textCode: any;
  summary: any;
  security: any;
  selectedSecurity: any;
  urgency: any;
  selectedUrgency: any;
  receivePlace: any;
  selectedreceivePlace: any;
  listDonViNhan: any;
  selectedReceiveUnit: any;
  listDonViTrucThuocNhan: any;
  selectedAffiliatedReceiveUnit: any;
  listRecipient: any;
  selectedRecipient: any;
  receiveAddress: any;
  status: any;
  checkStatus: any;
  listStatusLetter: any;
  soDienThoai: any;
  noiNhanBenNgoai: any;
  keyword = 'contactName';
  nguoiNhanBenNgoai: any;
  person: any;
  organizations: any;

  constructor(public title: Title,
              private nhanVienSoanThuService: NhanVienSoanThuService,
              private thuDangSoanService: ThuDangSoanService,
              private tokenStorageService: LocalStorageService,
              private sharedAPI: SharedApi,
              public msg: MessageService) {
    super(msg, title);
    this.listStatusLetter = [
      {
        status: statusLetter.NEW,
        code: 'new',
        name: 'Mới'
      },
      {
        status: statusLetter.WRITING,
        code: 'write',
        name: 'Đang soạn'
      },
      {
        status: statusLetter.RETURN,
        code: 'return',
        name: 'Trả lại'
      },
      {
        status: statusLetter.PENDING,
        code: 'penđing',
        name: 'Chờ xử lý'
      },
      {
        status: statusLetter.SENT,
        code: 'sent',
        name: 'Đã gửi'
      },
    ] //Tình trạng
    this.user = this.tokenStorageService.getUserFromStorage(); // get thông tin người dùng đăng nhập trong hệ thống: tên, bộ phận, đơn vị...
  }

  ngOnInit(): void {
    this.getNoiNhanBenNgoai();
    this.listTypeLetters = [{name: 'Nội bộ', key: '1'}, {name: 'Bên ngoài', key: '2'}];  // selection loại thư bên trong và bên ngoài
    this.checkboxTypeLetter = this.listTypeLetters[0];
    this.checkStatus = this.listStatusLetter[0];
    this.getThuDangSoan();
    this.getSoThuDi();

    // lấy sổ thư đi.
    this.nhanVienSoanThuService.getLetterFrom().subscribe(data => {
      this.letterCode = data.result.items;
    })
    // get don vị
    this.nhanVienSoanThuService.getAllOrganizations().subscribe(data => {
      this.organizations = data.result.items;
    })
    // get đơn vị trực thuộc gửi
    this.nhanVienSoanThuService.getParentOrganizations(this.user.organization.orgParentId).subscribe(data => {
      this.listDonViTrucThuocGui = data.result.items;
      console.log(this.listDonViTrucThuocGui);
    })

    // get người gửi và nhận
    this.nhanVienSoanThuService.getAllPerson().subscribe(data => {
      this.person = data.result.items;
    })

    // get độ mật
    this.nhanVienSoanThuService.getAllSecurity().subscribe(data => {
      this.security = data.result.items;
    })
    // get độ khẩn
    this.nhanVienSoanThuService.getAllUrgency().subscribe(data => {
      this.urgency = data.result.items;
    })

  }

  loadNhanVienTheoBoPhan() {
    // get nhan vien theo bo phan
    if (this.selectedAffiliatedSendUnit == undefined) {
      this.listNguoiGui = [];
    } else
      this.nhanVienSoanThuService.getPersonByParentOganization(this.selectedAffiliatedSendUnit.sysOrganizationId).subscribe((data: any) => {
        this.listNguoiGui = data.result.items;
      })
  }

  loadDonViNhan() {
    // get đơn vị nhận theo nơi nhận
    if (this.selectedreceivePlace == undefined) {
      this.listDonViNhan = [];
    } else
      this.nhanVienSoanThuService.getParentOrganizations(this.selectedreceivePlace.sysOrganizationId).subscribe((data: any) => {
        this.listDonViNhan = data.result.items;
      })
  }

  loadDonViTrucThuocNhan() {
    // get đơn vị trực thuộc nhận
    if (this.selectedReceiveUnit == undefined) {
      this.listDonViTrucThuocNhan = [];
    } else
      this.nhanVienSoanThuService.getParentOrganizations(this.selectedReceiveUnit.sysOrganizationId).subscribe((data: any) => {
        this.listDonViTrucThuocNhan = data.result.items;
      })
  }

  loadNguoiNhan() {
    // get người nhận theo đơn vị trực thuộc nhận
    if (this.selectedAffiliatedReceiveUnit == undefined) {
      this.listRecipient = [];
    } else
      this.nhanVienSoanThuService.getPersonByParentOganization(this.selectedAffiliatedReceiveUnit.sysOrganizationId).subscribe((data: any) => {
        this.listRecipient = data.result.items;
      })
  }

  getNoiNhanBenNgoai() {
    // phần này lấy dữ liệu thả vào chỗ search đơn vị nhận bên ngoài
    this.noiNhanBenNgoai = []
    this.nhanVienSoanThuService.getNoiNhanBenNgoai().subscribe((data: any) => {
      for (const item of data.result.items) {
        this.noiNhanBenNgoai.push({
          contactName: item.contactName,
          address: item.address,
          phone: item.phone,
          name: item.name
        });
      }
    })
  }
  // lấy sổ thư đi.
  getSoThuDi() {
    this.sharedAPI.getSoThuDi().subscribe(data => {
      this.letterCode = data.result.items;
    })
  }
  // action chọn loại thư nội bộ hoặc bên ngoài để xử lý vấn đề gì đấy
  typeLetterAction() {
    console.log('xxxx', this.checkboxTypeLetter);
    if (this.checkboxTypeLetter.key == '1') {
    } else {
    }
  }

  getThuDangSoan() {
    const param = {
      status: 2
    }
    this.thuDangSoanService.getThuDangSoan(param).subscribe((data: any) => {
      this.listThuDangSoan = data.result.content;
    })
  }

  checkStatusLetter(ev): any {
    if (ev == 2) {
      return 'Đang soạn'
    } else
      return null
  }

  checkTypeLetter(ev): any {
    if (ev == 1) {
      return 'Nội bộ'
    } else if (ev == 2) {
      return 'Bên ngoài'
    } else return null
  }

  onCheckStatus(status): string {
    if (status == 2) {
      return 'Đang soạn'
    } else return ''
  }

  onDeletedRow() {
    try {
      console.log(this.selectedThuDangSoan)
      if (this.selectedThuDangSoan == undefined || this.selectedThuDangSoan.length == 0) {
        this.showMessage(mType.warn, 'Thông báo', 'Vui lòng chọn dữ liệu để xóa');
        return;
      } else {
        const id = this.selectedThuDangSoan.id;
        this.thuDangSoanService.deletedThuDangSoan(id).subscribe((data: any) => {
          if (data) {
            this.getThuDangSoan();
            this.showMessage(mType.success, 'Thông báo', 'Xóa thành công');
            this.selectedThuDangSoan = [];
            return;
          }
        })
      }
    } catch (e) {
      this.showMessage(mType.error, 'Thông báo', 'Xóa không thành công');
    }
  }
  // load dữ liệu vào popup
  onRowSelect(ev: any) {
    this.selectedThuDangSoan = ev.data;
    this.selectedAffiliatedSendUnit = this.selectedThuDangSoan.affiliatedSendUnit // load đơn trị trực thuộc gửi
    this.selectedSender = this.selectedThuDangSoan.sender // load người gửi
    this.listNguoiGui = [this.selectedSender]; // bỏ vào danh sách người gửi
    // load đơn vị nhận
    this.listDonViNhan = [this.selectedThuDangSoan.receiveUnit]
    this.selectedReceiveUnit = this.selectedThuDangSoan.receiveUnit;
    // load đơn vị trực thuộc nhận
    this.listDonViTrucThuocNhan = [this.selectedThuDangSoan.affiliatedReceiveUnit]
    this.selectedAffiliatedReceiveUnit = this.selectedThuDangSoan.affiliatedReceiveUnit
    // load người nhận
    this.listRecipient = [this.selectedThuDangSoan.recipient]
    this.selectedRecipient = this.selectedThuDangSoan.recipient
  }

  onUpdateThuDangSoan() {
    try {
      if (this.selectedThuDangSoan) {
        this.showThuDangSoan = true;
        this.selectedLetterFrom = this.selectedThuDangSoan.letterCode;
        this.codeLetterFrom = this.selectedThuDangSoan.code;
        this.inputDate = new Date(this.selectedThuDangSoan.inputDate);
        this.sendDate = new Date(this.selectedThuDangSoan.sendDate);
        this.donViGui = this.user.organization.name;
        this.selectedAffiliatedSendUnit = this.selectedThuDangSoan.affiliatedSendUnit;
        this.selectedSender = this.selectedThuDangSoan.sender;
        this.textCode = this.selectedThuDangSoan.textCode;
        this.summary = this.selectedThuDangSoan.summary;
        this.selectedSecurity = this.selectedThuDangSoan.securityLevel;
        this.selectedUrgency = this.selectedThuDangSoan.urgencyLevel;
        this.selectedreceivePlace = this.selectedThuDangSoan?.receivePlace;
        this.selectedReceiveUnit = this.selectedThuDangSoan?.receiveUnit;
        this.selectedAffiliatedReceiveUnit = this.selectedThuDangSoan?.affiliatedReceiveUnit;
        this.selectedRecipient = this.selectedThuDangSoan?.recipient;
        this.receiveAddress = this.selectedThuDangSoan?.receiveAddress;
        this.status = this.onCheckStatus(this.selectedThuDangSoan?.status);
      } else {
        this.showMessage(mType.warn, 'Thông báo', 'Vui lòng chọn dữ liệu');
        this.showThuDangSoan = false;
        return;
      }
    } catch (e) {
      console.log('error get update data')
    }
  }

  createParams(): any {
    try {
      const param = {
        isSample: false,
        type: Number(this.checkboxTypeLetter.key),  // Phân loại thư
        staffId: this.user?.employeeId,// nhân viên lấy từ hệ thống đăng nhập
        letterCodeId: this.selectedLetterFrom.id,
        code: this.codeLetterFrom,
        inputDate: this.inputDate.getTime(),
        sendDate: this.sendDate.getTime(),
          sendUnitId: this.user?.organization?.sysOrganizationId,
        affiliatedSendUnitId: this.selectedAffiliatedSendUnit?.sysOrganizationId,
        senderId: this.selectedSender.employeeId,
        textCode: this.textCode,
        summary: this.summary,
        securityLevelId: this.selectedSecurity.id,
        urgencyLevelId: this.selectedUrgency.id,
        receivePlaceId: this.selectedreceivePlace?.sysOrganizationId, // nơi nhận
        receiveUnitId: this.selectedReceiveUnit?.sysOrganizationId, //đơn vị nhận
        outSiteReceive: this.checkboxTypeLetter.key == 2 ? {
          address: this.receiveAddress,
          contactName: this.nguoiNhanBenNgoai,
          phone: this.soDienThoai
        } : {},  // phần này giành cho bên ngoài truyền vào là một object bên ngoài
        affiliatedReceiveUnitId: this.selectedAffiliatedReceiveUnit?.sysOrganizationId,  // Đơn vị trực thuộc nhận
        recipientId: this.checkboxTypeLetter.key == 1 ? this.selectedRecipient?.employeeId : null,  // Người nhận
        mobilePhone: this.checkboxTypeLetter.key == 1 ? this.soDienThoai : null,
        receiveAddress:this.receiveAddress,  // Địa chỉ nhận
        status: this.checkStatus.status  //1 Thư mới
      }
      console.log('param', param)
      return param;
    } catch (e) {
      this.showMessage(mType.error, 'lỗi khởi tạo dữ liệu', e);
    }
  }

  onClickGuiDauMoi() {
    try {
      this.checkStatus = this.listStatusLetter[3];
      const param = this.createParams();
      this.nhanVienSoanThuService.updateLetter(this.selectedThuDangSoan.id, param).subscribe((data: any) => {
        if (data) {
          this.showMessage(mType.success, 'Thông báo', 'Gửi đi thành công');
          setTimeout(() => {
            window.location.reload();
          }, 500)
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  onClickLuu() {
    try {
      this.checkStatus.status = 2;
      const param = this.createParams();
      this.nhanVienSoanThuService.updateLetter(this.selectedThuDangSoan.id, param).subscribe((data: any) => {
        if (data) {
          this.showMessage(mType.success, 'Thông báo', 'Cập nhật thành công');
          setTimeout(() => {
            window.location.reload();
          }, 500)
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  selectEvent(item) {
    this.receiveAddress = item.address;
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    // do something
  }
}
