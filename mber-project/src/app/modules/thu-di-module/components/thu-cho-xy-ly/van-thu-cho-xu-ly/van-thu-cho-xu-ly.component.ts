import {Component, OnInit} from '@angular/core';
import {VanThuChoXuLyService} from "./van-thu-cho-xu-ly.service";
import {StatusLetterFrom} from "../../../../base-module/enum/trang-thai-thu/statusLetter.enum";
import {SharedApi} from "../../../../base-module/service/api.shared.services";
import {LocalStorageService} from "../../../../system-module/functions/store/local-storage.service";
import {iComponentBase, mType} from "../../../../base-module/functions/iServiceBase";
import {Title} from "@angular/platform-browser";
import {MessageService} from "primeng/api";
import {
  DoKhanModel, DoMatModel,
  DonViChuyenPhatModel,
  DonViModel, NhanVienModel,
  NoiNhanModel,
  SoThuModel,
  ThuDiModel
} from "../../../../base-module/models";


@Component({
  selector: 'app-van-thu-cho-xu-ly',
  templateUrl: './van-thu-cho-xu-ly.component.html',
  styleUrls: ['./van-thu-cho-xu-ly.component.scss']
})
export class VanThuChoXuLyComponent extends iComponentBase implements OnInit {
  user: any;
  listSoThuDi: SoThuModel[];
  selectedSoThuDi: SoThuModel;
  listStatusLetter: any;
  checkStatusLetter: any;
  thuDi: ThuDiModel;
  selectedRowLetter: ThuDiModel;
  listThuChoXyLy: ThuDiModel[];
  listDonVi: DonViModel[];
  listDonViTrucThuocGui: DonViModel[];
  selectedDonViTrucThuocGui: any;
  listNguoiGui: NhanVienModel[];
  selectedNguoiGui: any;
  selectedLetterFrom: DonViModel;
  years = [{year: 2017}, {year: 2018}, {year: 2019}, {year: 2020}, {year: 2021}, {year: 2022}]
  selectionYear: any;
  keyword = '';
  showXuLy = false;
  listTypeLetters: any; // list checkbox thư nội bộ và bên ngoài,
  checkboxTypeLetter: any = null; // chọn nội bộ hoặc bên ngoài
  inputDate = new Date(); // ngày nhập
  sendDate = new Date(); // ngày nhập
  //ĐỘ mật
  listSecurity: DoMatModel[];
  selectedSecurity: DoMatModel;
  // Độ khẩn
  listUrgencyLevel: DoKhanModel[];
  selectedUrgencyLevel: DoKhanModel;
  // Nơi nhận
  listReceivePlace: NoiNhanModel;
  selectedReceivePlace: NoiNhanModel;
  // Đơn vị nhận
  listReceiveUnit: DonViModel[];
  selectedReceiveUnit: DonViModel;
  // Đơn vị trực thuộc nhận
  listAffiliatedReceiveUnit: DonViModel[];
  selectedAffiliatedReceiveUnit: DonViModel;
  // get người theo đơn vị trực thuộc nhận
  listPersonForUnit: NhanVienModel[];
  selectedPersonForUnit: NhanVienModel;
  // Đơn vị chuyển phát
  listDonViChuyenPhat: DonViChuyenPhatModel[];
  selectedDonViChuyenPhat: DonViChuyenPhatModel;
  // Số vận đơn
  soVanDon: any;
  chiPhi: any;
  statusString = 'Chờ xử lý';
  phone: number;
  checkStatus: any;


  constructor(private vanThuChoXuLyService: VanThuChoXuLyService,
              private tokenStorageService: LocalStorageService,
              private shareApi: SharedApi,
              public title: Title,
              public msg: MessageService) {
    super(msg, title);
    this.user = this.tokenStorageService.getUserFromStorage(); // get thông tin người dùng đăng nhập
    this.listTypeLetters = [{name: 'Nội bộ', key: '1'}, {name: 'Bên ngoài', key: '2'}];  // selection loại thư bên trong và bên ngoài
    this.listStatusLetter = [
      {
        status: StatusLetterFrom.NEW,
        code: 'new',
        name: 'Mới'
      },
      {
        status: StatusLetterFrom.WRITING,
        code: 'write',
        name: 'Đang soạn'
      },
      {
        status: StatusLetterFrom.RETURN,
        code: 'return',
        name: 'Trả lại'
      },
      {
        status: StatusLetterFrom.PENDING,
        code: 'penđing',
        name: 'Chờ xử lý'
      },
      {
        status: StatusLetterFrom.SENT,
        code: 'sent',
        name: 'Đã gửi'
      },
    ]
  }

  ngOnInit(): void {
    this.thuDi = {};
    this.checkStatus = this.listStatusLetter[0];
    this.checkStatusLetter = this.listStatusLetter[0];
    this.selectionYear = this.years[this.years.length - 1]
    this.getAllThuDangChoXuLy();
    this.getDonVi();
    this.getTypeLetterOnInit();
    this.getInfoThuDi();
  }

  getInfoThuDi() {
    // lấy sổ thư đi.
    this.shareApi.getSoThuDi().subscribe(data => {
      this.thuDi.letterCode = data.result.items;
    })
    // get đơn vị trực thuộc gửi
    this.shareApi.getParentOrganizations(this.user.organization.orgParentId).subscribe(data => {
      this.listDonViTrucThuocGui = data.result.items;
    })
    // get độ mật
    this.shareApi.getDoMat().subscribe(data => {
      this.thuDi.securityLevel = data.result.items;
    })
    // get độ khẩn
    this.shareApi.getDoKhan().subscribe(data => {
      this.thuDi.urgencyLevel = data.result.items;
    })
    // get don vi chuyen phat
    this.shareApi.getDonViChuyenPhat().subscribe((data: any) => {
      this.listDonViChuyenPhat = data.result.items;
    })
  }

  getTypeLetterOnInit() {
    this.checkboxTypeLetter = this.listTypeLetters[0];
  }

  autoGenCode() {
    this.shareApi.getAutoGenCode().subscribe((data: any)=>{
      this.soVanDon = data.result;
    })
  }


  getDonVi() {
    this.shareApi.getAllDonVi().subscribe((data: any) => {
      if (data) {
        this.listDonVi = data.result.items;
        this.listReceivePlace = data.result.items;
      }
    })
  }

  getAllThuDangChoXuLy() {
    this.checkStatusLetter = this.listStatusLetter[3]
    const param = {
      status: this.checkStatusLetter.status
    }
    this.vanThuChoXuLyService.getAllThuChoXuLy(param).subscribe((data: any) => {
      if (data) {
        this.listThuChoXyLy = data.result.content;
      }
    })
  }


  loadNhanVienTheoBoPhan() {
    // get nhan vien theo bo phan
    if (this.selectedDonViTrucThuocGui == undefined) {
      this.listNguoiGui = [];
    } else
      this.shareApi.getPersonByParentOganization(this.selectedDonViTrucThuocGui.sysOrganizationId).subscribe((data: any) => {
        this.listNguoiGui = data.result.items;
      })
  }

  checkTypeLetter(typeLetter): string {
    if (typeLetter == 1) {
      return 'Nội bộ'
    }
    if (typeLetter == 2) {
      return 'Bên ngoài'
    } else return null
  }

  checkTypeStatus(typeLetter): string {
    if (typeLetter == 4) {
      return 'Chờ xử lý'
    } else return null
  }

  onSearch() {
    this.checkStatusLetter = this.listStatusLetter[3]
    const param = {
      status: this.checkStatusLetter.status,
      organizationId: this.selectedLetterFrom ? this.selectedLetterFrom?.sysOrganizationId : null,
      year: this.selectionYear?.year,
      keyword: this.keyword
    }
    this.vanThuChoXuLyService.getAllThuChoXuLy(param).subscribe((data: any) => {
      this.listThuChoXyLy = data.result.content;
    })
  }

  loadDonViNhan() {
    // get đơn vị nhận theo nơi nhận
    if (this.selectedReceivePlace == undefined) {
      this.listReceiveUnit = [];
    } else
      this.shareApi.getParentOrganizations(this.selectedReceivePlace.sysOrganizationId).subscribe((data: any) => {
        this.listReceiveUnit = data.result.items;
      })
  }

  loadDonViTrucThuocNhan() {
    // get đơn vị trực thuộc nhận theo đơn vị nhận
    if (this.selectedReceiveUnit == undefined) {
      this.listAffiliatedReceiveUnit = [];
    } else
      this.shareApi.getParentOrganizations(this.selectedReceiveUnit.sysOrganizationId).subscribe((data: any) => {
        this.listAffiliatedReceiveUnit = data.result.items;
      })
  }

  loadNguoiNhan() {
    // get người nhận theo đơn vị trực thuộc nhận
    if (this.selectedAffiliatedReceiveUnit == undefined) {
      this.listPersonForUnit = [];
    } else
      this.shareApi.getParentOrganizations(this.selectedAffiliatedReceiveUnit.sysOrganizationId).subscribe((data: any) => {
        this.listPersonForUnit = data.result.items;
      })
  }

  onRowSelect(ev: any) {
    this.selectedRowLetter = ev.data;
    this.thuDi = this.selectedRowLetter;
    this.listSoThuDi = [this.selectedRowLetter.letterCode]
    this.selectedDonViTrucThuocGui = this.selectedRowLetter.affiliatedSendUnit
    this.inputDate = new Date(this.selectedRowLetter.inputDate)
    this.sendDate = new Date(this.selectedRowLetter.sendDate)
    this.listNguoiGui = [this.selectedRowLetter.sender];
    this.listSecurity = [this.selectedRowLetter.securityLevel]
    this.listUrgencyLevel = [this.selectedRowLetter.urgencyLevel]
    this.listReceiveUnit = [this.selectedRowLetter.receiveUnit]
    this.listAffiliatedReceiveUnit = [this.selectedRowLetter.affiliatedReceiveUnit]
    this.listPersonForUnit = [this.selectedRowLetter.recipient]
    // push loại khi mở popup
    if (this.selectedRowLetter.type == 1) {
      this.checkboxTypeLetter = this.listTypeLetters[0];
    }
    if (this.selectedRowLetter.type == 2) {
      this.checkboxTypeLetter = this.listTypeLetters[1];
    }
    this.autoGenCode();
    console.log('seclect Bên ngoài', this.selectedRowLetter)
  }

  onPopupThuChoXuLy() {
    try {
      if (this.selectedRowLetter) {
        this.showXuLy = true;
        this.selectedSoThuDi = this.selectedRowLetter.letterCode;
        this.selectedNguoiGui = this.selectedRowLetter.sender;
        this.selectedSecurity = this.selectedRowLetter.securityLevel;
        this.selectedUrgencyLevel = this.selectedRowLetter.urgencyLevel;
        this.selectedReceivePlace = this.selectedRowLetter.receivePlace;
        this.selectedReceiveUnit = this.selectedRowLetter.receiveUnit;
        this.selectedAffiliatedReceiveUnit = this.selectedRowLetter.affiliatedReceiveUnit;
        this.selectedPersonForUnit = this.selectedRowLetter.recipient;
      } else {
        this.showXuLy = false;
        this.showMessage(mType.info, 'Thông báo', 'Vui lòng chọn dữ liệu trên bảng');
      }
    } catch (e) {
      console.log('error')
    }
  }

  createParams() {
    try {
      const param = {
        type: Number(this.checkboxTypeLetter.key),  // Phân loại thư
        code: this.selectedRowLetter.code,  // Mã thư đi
        letterCodeId: this.selectedRowLetter.letterCode.id, // sổ thư đi
        inputDate: this.inputDate.getTime(),  // Ngày nhập
        sendDate: this.sendDate.getTime(), // Ngày gửi
        sendUnitId: this.user?.organization?.sysOrganizationId,  // Đơn vị gửi
        affiliatedSendUnitId: this.selectedAffiliatedReceiveUnit?.sysOrganizationId, // Đơn vị trực thuộc gửi
        senderId: this.selectedRowLetter.sender?.employeeId,  // Người gửi
        deliveryUnitId: this.selectedDonViChuyenPhat.id, // đơn vị chuyển phát,
        isSample: false, // thư mẫu
        staffId: this.user?.employeeId,// nhân viên lấy từ hệ thống đăng nhập
        securityLevelId: this.selectedSecurity.id,  // Độ mật *
        urgencyLevelId: this.selectedUrgencyLevel.id,  // Độ khẩn *
        receivePlaceId: this.selectedReceivePlace?.sysOrganizationId,  // Nơi nhận
        receiveUnitId: this.selectedReceiveUnit?.sysOrganizationId,  // Đơn vị nhận
        outSiteReceive: this.checkboxTypeLetter.key == 2 ? {
          address: this.thuDi.receiveAddress,
          contactName: "",
          phone: this.phone
        } : null,  // phần này giành cho bên ngoài truyền vào là một object bên ngoài
        cost: this.chiPhi,
        itemCode: this.soVanDon,
        textCode: this.thuDi.textCode,  // Số hiệu văn bản
        summary: this.thuDi.summary,  // Trích yếu
        affiliatedReceiveUnitId: this.selectedAffiliatedReceiveUnit?.sysOrganizationId,  // Đơn vị trực thuộc nhận
        recipientId: this.checkboxTypeLetter.key == 1 ? this.thuDi.recipient?.employeeId : null,  // Người nhận
        mobilePhone: this.checkboxTypeLetter.key == 1 ? this.phone : null,
        receiveAddress: this.thuDi.receiveAddress,  // Địa chỉ nhận
        status: this.checkStatus.status  // Tình trạng
      }
      return param;
    } catch (e) {
      console.log('Lỗi khởi tạo dữ liệu')
    }
    return null
  }

  onSendTo() {
    try {
      this.startPayLoad(5);
    } catch (e) {
      console.log(e)
    }
  }

  startPayLoad(status) {
    try {
      this.checkStatus.status = status;
      const param = this.createParams();
      if (param) {
        this.shareApi.updateLetter(this.selectedRowLetter.id, param).subscribe((data: any) => {
          if (data) {
            if (status == 3) {
              this.showMessage(mType.success, 'Thông báo', 'Trả lại thư thành công');
            }
            if (status == 5) {
              this.showMessage(mType.success, 'Thông báo', 'Gửi đi thành công');
            }
            setTimeout(() => {
              window.location.reload();
            }, 500)
            return;
          }
          if (data.status == 400) {
            if (status == 3) {
              this.showMessage(mType.warn, 'Thông báo', 'Trả lại thư thất bại vui lòng kiểm tra thông tin');
            }
            if (status == 5) {
              this.showMessage(mType.warn, 'Thông báo', 'Gửi thư đi thất bại vui lòng kiểm tra thông tin');
            }
            return;
          }
        })
      } else {
        this.showMessage(mType.warn, 'Thông báo', 'Gửi đi thất bại vui lòng kiểm tra thông tin');
        return;
      }
    } catch (e) {
      console.log(e)
    }
  }

  onReturnTo() {
    try {
      this.startPayLoad(3);
    } catch (e) {
      console.log(e)
    }
  }

  refresh() {
    window.location.reload();
  }
}
