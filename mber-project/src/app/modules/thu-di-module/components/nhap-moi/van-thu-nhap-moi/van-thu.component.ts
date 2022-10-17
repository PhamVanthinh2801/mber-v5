import {Component, DoCheck, OnInit} from '@angular/core';
import {MessageService, SelectItemGroup} from "primeng/api";
import {Title} from "@angular/platform-browser";
import {iComponentBase, mType} from "../../../../base-module/functions/iServiceBase";
import {NhapMoiService} from "../nhap-moi.service";
import {LocalStorageService} from "../../../../system-module/functions/store/local-storage.service";
import {VanThuService} from "./van-thu.service";
import {SharedApi} from "../../../../base-module/service/api.shared.services";
import {ActivatedRoute, Router} from "@angular/router";
import {DonViModel, ThuDiModel} from "../../../../base-module/models";
import {ErrorModel} from "../../../../base-module/models/error/error.model";


// đơn vị trực thuộc
interface Unit {
  id: string,
  name: string
}

// đơn vị
interface Organization {
  id: string,
  name: string
}

enum statusLetter {
  NEW = 1,
  WRITING,
  RETURN,
  PENDING,
  SENT = 5,
  VERIFIED = 6,
}

enum typeLetterFrom {
  NoiBoCoDauMoi = "Nội bộ có đầu mối",
  BenNgoaiCoDauMoi = "Bên ngoài có đầu mối",
}

@Component({
  selector: 'app-van-thu',
  templateUrl: './van-thu.component.html',
  styleUrls: ['./van-thu.component.scss'],
  providers: [MessageService]
})
export class VanThuComponent extends iComponentBase implements OnInit {
  // hai giá trị này sẽ xử lý search cho đơn vị nhận bên ngoài, chỗ mà nhập tới đâu search tới đấy.
  keyword = 'contactName';
  searchText: string;
  noiNhanBenNgoai: any;
  isSample = false;
  listSampleLetter: any;
  selectedRowSampleLetter: ThuDiModel;
  listDonViTrucThuocGui: any;
  listNguoiGui: any;
  user: any; // full thông tin người dùng.
  letterCode: any; // sổ thư đi...
  codeLetterFrom: any; // mã thư đi tự gen
  code: any; // mã thư đi
  note: any // ghi chú
  chiPhi: any;
  selectedLetterFrom: Unit | any; // chọn danh mục từ sổ thư đi, ....
  selectedAffiliatedSendUnit: any; // đơn vị trực thuộc gửi
  selectedSender: any; // chọn người gửi
  selectedSecurity: any; // chọn độ mật
  selectedUrgency: any; // chọn độ khẩn
  selectedReceivePlace: any; // selected chọn nơi nhận là mọt đơn vị hay gì đấy...
  selectedReceiveUnit: any // selected đơn vị nhận
  selectedAffiliatedReceiveUnit: any // selected đơn vị trực thuộc nhạn
  selectedRecipient: any // selected Người nhận
  listDonViChuyenPhat: any;
  selectionDonViChuyenPhat: any;
  receiveAddress = '' // địa chỉ nhận
  inputDate = new Date(); // ngày nhập
  sendDate = new Date(); // ngày nhập
  textCode: any;
  summary: any;
  soVanDon: any // số vận đơn
  listDonViNhan: any // danh sách đơn vị nhận được lấy từ parent là nơi nhận
  listDonViTrucThuocNhan: any // danh sách đơn vị trực thuộc nhạn được lấy từ selected đơn vị nhận
  listNguoiNhan: any; // danh sách người nhận
  soDienThoai: any; // só điện thoại của người nhận dùng cho bên ngoài
  nguoiNhanBenNgoai = '' // người nhận bên ngoài
  organizations: any // get các đơn vị tổ chức, phòng ban...
  security: any // độ mật
  urgency: any // độ khẩn
  checkStatus: any;
  listStatusLetter: any; //Tình trạng
  checkboxTypeLetter: any = null; // chọn nội bộ hoặc bên ngoài
  listTypeLetters: any; // list checkbox thư nội bộ và bên ngoài,
  sendByMail: string[] = []; // gửi mail cho người nhận
  showThuMau = false;
  listReceiveUnit: DonViModel[];
  listUnitInPopup: DonViModel[];
  selectedUnitInPopup: DonViModel
  years = [{year: 2017}, {year: 2018}, {year: 2019}, {year: 2020}, {year: 2021}, {year: 2022}]
  selectionYear: any;

  constructor(private nhapMoiService: NhapMoiService,
              private vanThuService: VanThuService,
              private sharedAPI: SharedApi,
              public router: Router, public route: ActivatedRoute,
              private tokenStorageService: LocalStorageService,
              public title: Title,
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
        status: statusLetter.PENDING,
        code: 'penđing',
        name: 'Chờ xử lý'
      },
      {
        status: statusLetter.SENT,
        code: 'sent',
        name: 'Đã gửi'
      },
      {
        status: statusLetter.RETURN,
        code: 'return',
        name: 'Trả lại'
      }
    ] //Tình trạng
  }


  ngOnInit(): void {
    // phần này lấy dữ liệu thả vào chỗ search đơn vị nhận bên ngoài
    this.noiNhanBenNgoai = []
    this.vanThuService.getNoiNhanBenNgoai().subscribe((data: any) => {
      for (const item of data.result.items) {
        this.noiNhanBenNgoai.push({
          contactName: item.contactName,
          address: item.address,
          phone: item.phone,
          name: item.name
        });
      }
    })
    this.selectionYear = this.years[this.years.length - 1];
    this.checkStatus = this.listStatusLetter[0];
    this.listTypeLetters = [{name: 'Nội bộ', key: '1'}, {name: 'Bên ngoài', key: '2'}];  // selection loại thư bên trong và bên ngoài
    this.checkboxTypeLetter = this.listTypeLetters[0];
    this.user = this.tokenStorageService.getUserFromStorage(); // get thông tin người dùng đăng nhập trong hệ thống: tên, bộ phận, đơn vị...
    // lấy sổ thư đi.
    this.sharedAPI.getSoThuDi().subscribe(data => {
      this.letterCode = data.result.items;
    })
    // get don vị
    this.sharedAPI.getAllDonVi().subscribe(data => {
      this.organizations = data.result.items;
      this.listUnitInPopup = data.result.items;
    })
    // get đơn vị trực thuộc gửi
    this.nhapMoiService.getParentOrganizations(this.user.organization.orgParentId).subscribe(data => {
      this.listDonViTrucThuocGui = data.result.items;
    })
    // get độ mật
    this.sharedAPI.getDoMat().subscribe(data => {
      this.security = data.result.items;
    })
    // get độ khẩn
    this.sharedAPI.getDoKhan().subscribe(data => {
      this.urgency = data.result.items;
    })
    // get don vi chuyen phat
    this.vanThuService.getDonViChuyenPhat().subscribe((data: any) => {
      this.listDonViChuyenPhat = data.result.items;
    })
    this.getAutoCode();
    this.getAutoCodeSoVanDon();
  }

  getAutoCodeSoVanDon(){
    this.sharedAPI.getAutoGenCode().subscribe((data: any) => {
      this.soVanDon = data.result;
    })
  }
  getAutoCode(){
    this.sharedAPI.getAutoGenCode().subscribe((data: any) => {
      this.codeLetterFrom = data.result; // mã tự gen
    })
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

  loadDonViNhan() {
    // get đơn vị nhận theo nơi nhận
    if (this.selectedReceivePlace == undefined) {
      this.listReceiveUnit = []
    } else
      this.nhapMoiService.getParentOrganizations(this.selectedReceivePlace.sysOrganizationId).subscribe((data: any) => {
        this.listReceiveUnit = data.result.items;
      })
  }

  loadDonViTrucThuocNhan() {
    // get đơn vị trực thuộc nhận
    if (this.selectedReceiveUnit == undefined) {
      this.listDonViTrucThuocNhan = [];
    } else {
      this.nhapMoiService.getParentOrganizations(this.selectedReceiveUnit?.sysOrganizationId).subscribe((data: any) => {
        this.listDonViTrucThuocNhan = data.result.items;
      })
    }
  }

  loadNhanVienTheoBoPhan() {
    // get nhan vien theo bo phan
    if (this.selectedAffiliatedSendUnit == undefined) {
      this.listNguoiGui = [];
    } else
      this.nhapMoiService.getPersonByParentOganization(this.selectedAffiliatedSendUnit.sysOrganizationId).subscribe((data: any) => {
        this.listNguoiGui = data.result.items;
      })
  }

  loadNguoiNhan() {
    // get người nhận theo đơn vị trực thuộc nhận
    if (this.selectedAffiliatedReceiveUnit == undefined) {
      this.listNguoiNhan = [];
    } else
      console.log(this.selectedAffiliatedReceiveUnit.sysOrganizationId)
    this.nhapMoiService.getPersonByParentOganization(this.selectedAffiliatedReceiveUnit.sysOrganizationId).subscribe((data: any) => {
      this.listNguoiNhan = data.result.items;
    })
  }

  // action chọn loại thư nội bộ hoặc bên ngoài để xử lý vấn đề gì đấy
  typeLetterAction() {
    if (this.checkboxTypeLetter.key == 'B') {
    } else {
    }
  }

  onIsSample() {
    console.log(this.isSample)
  }

  createParams(typeParam: any) {
    try {
      if (typeParam == typeLetterFrom.NoiBoCoDauMoi) {
        const param = {
          cost: this.chiPhi,
          itemCode: this.soVanDon,
          deliveryUnitId: this.selectionDonViChuyenPhat?.id, // đơn vị chuyển phát,
          isSample: this.isSample, // thư mẫu
          staffId: this.user?.employeeId,// nhân viên lấy từ hệ thống đăng nhập
          letterCodeId: this.selectedLetterFrom?.id, // sổ thư đi
          code: this.codeLetterFrom,  // Mã thư đi
          inputDate: this.inputDate.getTime(),  // Ngày nhập
          sendDate: this.sendDate.getTime(), // Ngày gửi
          sendUnitId: this.user?.organization?.sysOrganizationId,  // Đơn vị gửi
          affiliatedSendUnitId: this.selectedAffiliatedSendUnit?.sysOrganizationId, // Đơn vị trực thuộc gửi
          senderId: this.selectedSender?.employeeId,  // Người gửi
          textCode: this.textCode,  // Số hiệu văn bản
          summary: this.summary,  // Trích yếu
          securityLevelId: this.selectedSecurity?.id,  // Độ mật *
          urgencyLevelId: this.selectedUrgency?.id,  // Độ khẩn *
          type: Number(this.checkboxTypeLetter.key),  // Phân loại thư
          receivePlaceId: this.selectedReceivePlace?.sysOrganizationId,  // Nơi nhận
          receiveUnitId: this.selectedReceiveUnit?.sysOrganizationId,  // Đơn vị nhận
          outSiteReceive: this.checkboxTypeLetter.key == 2 ? {
            address: this.receiveAddress,
            contactName: this.nguoiNhanBenNgoai,
            phone: this.soDienThoai
          } : null,  // phần này giành cho bên ngoài truyền vào là một object bên ngoài
          affiliatedReceiveUnitId: this.selectedAffiliatedReceiveUnit?.sysOrganizationId,  // Đơn vị trực thuộc nhận
          recipientId: this.checkboxTypeLetter.key == 1 ? this.selectedRecipient?.employeeId : null,  // Người nhận
          mobilePhone: this.checkboxTypeLetter.key == 1 ? this.soDienThoai : null,
          receiveAddress: this.receiveAddress,  // Địa chỉ nhận
          status: this.checkStatus.status  // Tình trạng
        }
        console.log('create param', param);
        return param;
      }
    } catch (e) {
      this.showMessage(mType.error, 'lỗi khởi tạo dữ liệu', e);
    }
    return null
  }

  resetInputParams(typeParam: any) {
    if (typeParam === typeLetterFrom.NoiBoCoDauMoi) {
      this.textCode = "";  // Số hiệu văn bản
      this.selectedSecurity = "";// Độ mật *
      this.summary = '';
      this.selectedUrgency = "";// Độ khẩn *
      this.selectedReceivePlace = "";  // Nơi nhận
      this.selectedReceiveUnit = "";  // Đơn vị nhận
      this.selectedAffiliatedReceiveUnit = "";  // Đơn vị trực thuộc nhận
      this.selectedRecipient = "";  // Người nhận
      this.receiveAddress = "";  // Địa chỉ nhận
    }
  }

  checkUndefined(): boolean {
    if (this.selectedLetterFrom?.id == undefined
      || this.codeLetterFrom == undefined
      || this.selectedSecurity?.id == undefined
      || this.selectedUrgency?.id == undefined
      || this.receiveAddress == undefined
    ) {
      return false;
    } else
      return true;
  }

  // Thêm thư mới có đầu mối
  addLetterFromNoneHead() {
    try {
      if (this.checkUndefined() == false) {
        this.showMessage(mType.warn, 'Thông báo', 'Vui lòng nhập đầy đủ các thông tin bắt buộc');
        return;
      } else {
        this.checkStatus = this.listStatusLetter[3];
        const param = this.createParams(typeLetterFrom.NoiBoCoDauMoi)
        if (param == null) {
          this.showMessage(mType.warn, 'Thông báo', 'Gửi đi không thành công');
          return;
        } else {
          this.nhapMoiService.createLetter(param).subscribe((data: any) => {
            console.log(data)
            if (data) {
              this.resetInputParams(typeLetterFrom.NoiBoCoDauMoi);
              this.showMessage(mType.success, 'Thông báo', 'Gửi đi thành công');
              setTimeout(() => {
                window.location.reload();
              }, 500)
            }
          });
        }
      }
    } catch (e) {
      this.showMessage(mType.error, 'Thông báo lỗi', 'Gửi đi không thành thành công');
    }
  }

  saveLetterParterm() {
    try {
      this.checkStatus = this.listStatusLetter[1];
      if (this.checkUndefined() == false) {
        this.showMessage(mType.warn, 'Thông báo', 'Vui lòng nhập đầy đủ các thông tin bắt buộc');
        return;
      } else {
        const param = this.createParams(typeLetterFrom.NoiBoCoDauMoi)
        if (param == null) {
          this.showMessage(mType.warn, 'Thông báo', 'Lưu không thành công');
          return;
        } else {
          this.nhapMoiService.createLetter(param).subscribe((res) => {
            if (res) {
              this.showMessage(mType.success, 'Thông báo', 'Lưu thành công');
              this.freshPage();
            }
          });
        }
      }
    } catch (e) {
      this.showMessage(mType.error, 'Thông báo lỗi', 'Lưu mẫu đi không thành thành công');
    }
  }

  showThuMauDialog() {
    this.showThuMau = true;
    const param = {
      pageIndex: 1,
      pageSize: 1000,
      isSample: true
    }
    try {
      this.nhapMoiService.getLetterPattern(param).subscribe((data: any) => {
        this.listSampleLetter = data.result.content;
      })
    } catch (e) {
      console.log('Lỗi lấy dữ liệu không thành công')
    }
  }

  checkTypeLetter(ev): any {
    if (ev == 1) {
      return 'Nội bộ'
    } else if (ev == 2) {
      return 'Bên ngoài'
    } else return null
  }


  onRowSelect(ev: any) {
    console.log(ev)
    this.selectedRowSampleLetter.id = ev.data.id;
    this.listNguoiGui = [this.selectedRowSampleLetter.sender]
    this.listReceiveUnit = [this.selectedRowSampleLetter.receiveUnit]
    this.listDonViTrucThuocNhan = [this.selectedRowSampleLetter.affiliatedReceiveUnit]
    this.listNguoiNhan = [this.selectedRowSampleLetter.recipient]
  }


  dbClickGetSampleLetter(row: any) {
    try {
      this.checkboxTypeLetter = this.listTypeLetters[row.type -1];
      this.showThuMau = false;
      this.selectedLetterFrom = row.letterCode;
      this.selectedAffiliatedSendUnit = row.affiliatedSendUnit;
      this.selectedSender = this.selectedRowSampleLetter.sender;
      this.textCode = row.textCode;
      this.summary = row.summary;
      this.selectedSecurity = row.securityLevel;
      this.selectedUrgency = row.urgencyLevel;
      this.selectedReceivePlace = row.receivePlace;
      this.listDonViNhan = [row.receiveUnit];
      this.selectedReceiveUnit = this.selectedRowSampleLetter.receiveUnit;
      this.selectedAffiliatedReceiveUnit = this.selectedRowSampleLetter.affiliatedReceiveUnit;
      this.selectedRecipient = this.selectedRowSampleLetter.recipient;
      this.selectionDonViChuyenPhat = row?.deliveryUnit; //Đơn vị chuyển phát
      this.chiPhi = this.selectedRowSampleLetter.cost;
      this.getAutoCode();
      this.getAutoCodeSoVanDon();
    }
    catch (e) {
      console.log('lỗi insert thư mẫu')
    }
  }

  deletedLetterFrom() {
    try {
      if (this.selectedRowSampleLetter?.id == undefined) {
        this.showMessage(mType.warn, 'Thông báo', 'Vui lòng chọn dữ liệu để xóa');
        return;
      } else {
        this.nhapMoiService.deletedThuDi(this.selectedRowSampleLetter.id).subscribe((data: any) => {
            if (data) {
              this.showMessage(mType.success, 'Thông báo', 'Xóa thành công');
              const param = {
                pageIndex: 1,
                pageSize: 10,
                isSample: true
              }
              this.nhapMoiService.getLetterPattern(param).subscribe((data: any) => {
                console.log(data)
                this.listSampleLetter = data.result.content;
              })
            }
          },
          (error) => {
            throw error;
          })
      }
    } catch (e) {

    }
  }

  onSearchSampleLetterPopup(){
    console.log('click me');
    try {
      const param = {
        isSample: true,
        pageIndex: 1,
        pageSize: 100,
        organizationId: this.selectedUnitInPopup?.sysOrganizationId,
        year: this.selectionYear?.year,
        keyword: this.searchText
      }
      this.nhapMoiService.getLetterPattern(param).subscribe((data: any) => {
        this.listSampleLetter = data.result.content;
        console.log('aaaaaaaaaaaa', this.listSampleLetter)
      },(error: ErrorModel)=>{
        this.showMessage(mType.info, 'Thông báo', 'Không tìm thấy dữ liệu');
      })
    } catch (e) {
      console.log('Lỗi lấy dữ liệu không thành công')
    }
  }

  onEventClose() {
    window.location.reload();
  }
}
