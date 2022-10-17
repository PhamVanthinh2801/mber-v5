import {Component, OnInit, ViewChild} from '@angular/core';
import {MessageService} from "primeng/api";
import {Title} from "@angular/platform-browser";
import {Table} from 'primeng/table';
import {iComponentBase, mType} from "../../../../base-module/functions/iServiceBase";
import {NhapMoiService} from "../nhap-moi.service";
import {LocalStorageService} from "../../../../system-module/functions/store/local-storage.service";
import {NhanVienService} from "./nhan-vien.service";
import {SharedApi} from "../../../../base-module/service/api.shared.services";
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
  NoiBoKhongDauMoi = "Nội bộ không có đầu mối",
  BenNgoaiKhongDauMoi = "Bên ngoài không có đầu mối",
}

@Component({
  selector: 'app-nhan-vien',
  templateUrl: './nhan-vien.component.html',
  styleUrls: ['./nhan-vien.component.scss'],
  providers: [MessageService]
})
export class NhanVienComponent extends iComponentBase implements OnInit {
  keyword = 'contactName';
  isSample = false;
  listSampleLetter: any;
  selectedRowSampleLetter: any;
  listDonViTrucThuocGui: any;
  listNguoiGui: any;
  user: any; // full thông tin người dùng.
  letterCode: any; // sổ thư đi...
  codeLetterFrom: any; // mã thư đi tự gen
  code: any; // mã thư đi
  note: any // ghi chú
  selectedLetterFrom: Unit | any; // chọn danh mục từ sổ thư đi, ....
  selectedAffiliatedSendUnit: any; // đơn vị trực thuộc gửi
  selectedSender: any; // chọn người gửi
  selectedSecurity: any; // chọn độ mật
  selectedUrgency: any; // chọn độ khẩn
  selectedReceivePlace: any; // selected chọn nơi nhận là mọt đơn vị hay gì đấy...
  selectedReceiveUnit: any // selected đơn vị nhận
  selectedAffiliatedReceiveUnit: any // selected đơn vị trực thuộc nhạn
  selectedRecipient: any // selected Người nhận
  receiveAddress = '' // địa chỉ nhận
  inputDate = new Date(); // ngày nhập
  sendDate = new Date(); // ngày nhập
  textCode: any;
  summary: any;
  listDonViNhan: any // danh sách đơn vị nhận được lấy từ parent là nơi nhận
  listDonViTrucThuocNhan: any // danh sách đơn vị trực thuộc nhạn được lấy từ selected đơn vị nhận
  listNguoiNhan: any; // danh sách người nhận
  soDienThoai: any; // só điện thoại của người nhận dùng cho bên ngoài
  noiNhanBenNgoai: any;
  nguoiNhanBenNgoai = '' // người nhận bên ngoài
  person: any; // người gửi, người nhận, nhận viên....
  organizations: any // get các đơn vị tổ chức, phòng ban...
  security: any // độ mật
  urgency: any // độ khẩn
  checkStatus: any; // tình trạng thư
  listStatusLetter: any; //Tình trạng
  checkboxTypeLetter: any = null; // chọn nội bộ hoặc bên ngoài
  listTypeLetters: any; // list checkbox thư nội bộ và bên ngoài,
  sendByMail: string[] = []; // gửi mail cho người nhận
  showThuMau = false;
  selectedTable: ThuDiModel;
  listUnitInPopup: DonViModel[];
  selectedUnitInPopup: DonViModel
  years = [{year: 2017}, {year: 2018}, {year: 2019}, {year: 2020}, {year: 2021}, {year: 2022}]
  selectionYear: any;
  searchText: string;

  @ViewChild('dt') dt: Table | undefined;

  constructor(private nhapMoiService: NhapMoiService,
              private nhanVienService: NhanVienService,
              private tokenStorageService: LocalStorageService,
              private sharedAPI: SharedApi,
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

  }

  ngOnInit(): void {
    this.getNoiNhanBenNgoai();
    this.checkStatus = this.listStatusLetter[0];
    this.listTypeLetters = [{name: 'Nội bộ', key: '1'}, {name: 'Bên ngoài', key: '2'}];  // selection loại thư bên trong và bên ngoài
    this.user = this.tokenStorageService.getUserFromStorage(); // get thông tin người dùng đăng nhập trong hệ thống: tên, bộ phận, đơn vị...
    this.checkboxTypeLetter = this.listTypeLetters[0]; // Selected mặc định thư nội bộ khi vào màn hình.

    this.sharedAPI.getAutoGenCode().subscribe((data: any) => {
      this.codeLetterFrom = data.result; // mã tự gen
    })

    // lấy sổ thư đi.
    this.nhapMoiService.getLetterFrom().subscribe(data => {
      this.letterCode = data.result.items;
    })
    // get don vị
    this.nhapMoiService.getAllOrganizations().subscribe(data => {
      this.organizations = data.result.items;
    })
    // get đơn vị trực thuộc gửi
    this.nhapMoiService.getParentOrganizations(this.user.organization.orgParentId).subscribe(data => {
      this.listDonViTrucThuocGui = data.result.items;
    })

    // get người gửi và nhận
    this.nhapMoiService.getAllPerson().subscribe(data => {
      this.person = data.result.items;
    })

    // get độ mật
    this.nhapMoiService.getAllSecurity().subscribe(data => {
      this.security = data.result.items;
    })
    // get độ khẩn
    this.nhapMoiService.getAllUrgency().subscribe(data => {
      this.urgency = data.result.items;
    })
  }

  getNoiNhanBenNgoai() {
    // phần này lấy dữ liệu thả vào chỗ search đơn vị nhận bên ngoài
    this.noiNhanBenNgoai = []
    this.nhanVienService.getNoiNhanBenNgoai().subscribe((data: any) => {
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

  loadNhanVienTheoBoPhan() {
    // get nhan vien theo bo phan
    if (this.selectedAffiliatedSendUnit == undefined) {
      this.listNguoiGui = [];
    } else
      this.nhapMoiService.getPersonByParentOganization(this.selectedAffiliatedSendUnit.sysOrganizationId).subscribe((data: any) => {
        this.listNguoiGui = data.result.items;
      })
  }

  loadDonViNhan() {
    // get đơn vị nhận theo nơi nhận
    if (this.selectedReceivePlace == undefined) {
      this.listDonViNhan = [];
    } else
      this.nhapMoiService.getParentOrganizations(this.selectedReceivePlace.sysOrganizationId).subscribe((data: any) => {
        this.listDonViNhan = data.result.items;
      })
  }

  loadDonViTrucThuocNhan() {
    // get đơn vị trực thuộc nhận
    if (this.selectedReceivePlace == undefined) {
      this.listDonViTrucThuocNhan = [];
    } else
      this.nhapMoiService.getParentOrganizations(this.selectedReceiveUnit.sysOrganizationId).subscribe((data: any) => {
        this.listDonViTrucThuocNhan = data.result.items;
      })
  }

  loadNguoiNhan() {
    // get người nhận theo đơn vị trực thuộc nhận
    // get đơn vị trực thuộc nhận
    if (this.selectedReceivePlace == undefined) {
      this.listNguoiNhan = [];
    } else
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


  createParams(typeParam: any) {
    try {
      if (typeParam == typeLetterFrom.NoiBoKhongDauMoi) {
        const param = {
          type: Number(this.checkboxTypeLetter.key),  // Phân loại thư
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
          receivePlaceId: this.selectedReceivePlace?.sysOrganizationId,  // Nơi nhận
          receiveUnitId: this.selectedReceiveUnit?.sysOrganizationId,  // Đơn vị nhận
          outSiteReceive: this.checkboxTypeLetter.key == 2 ? {
            name: this.receiveAddress,
            address: this.receiveAddress,
            contactName: this.nguoiNhanBenNgoai,
            phone: this.soDienThoai
          } : null,  // phần này giành cho bên ngoài truyền vào là một object bên ngoài
          affiliatedReceiveUnitId: this.selectedAffiliatedReceiveUnit?.sysOrganizationId,  // Đơn vị trực thuộc nhận
          recipientId: this.checkboxTypeLetter.key == 1 ? this.selectedRecipient?.employeeId : null,  // Người nhận
          mobilePhone: this.checkboxTypeLetter.key == 1 ? this.soDienThoai : null,
          receiveAddress: this.checkboxTypeLetter.key == 1 ? this.receiveAddress : null,  // Địa chỉ nhận
          status: this.checkStatus.status  //1 Thư mới
        }
        console.log('params add', param)
        return param;
      }
    } catch (e) {
      this.showMessage(mType.error, 'lỗi khởi tạo dữ liệu', e);
    }
    return null

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

  // Thêm thư mới không có đầu mối
  addLetterFromNoneHead() {
    try {
      if (this.checkUndefined() == false) {
        this.showMessage(mType.warn, 'Thông báo', 'Vui lòng nhập đầy đủ các thông tin bắt buộc');
        return;
      } else {
        this.checkStatus = this.listStatusLetter[3];
        const param = this.createParams(typeLetterFrom.NoiBoKhongDauMoi)
        if (param == null) {
          this.showMessage(mType.warn, 'Thông báo', 'Gửi đi không thành công');
          return;
        } else {
          this.nhapMoiService.createLetter(param).subscribe((data: any) => {
            if (data) {
              this.showMessage(mType.success, 'Thông báo', 'Gửi đi thành công');
              this.freshPage();
            }
          }, (error: ErrorModel) => {
            this.showMessage(mType.error, 'Thông báo', 'Gửi đi không thành công: ' + error.status);
          });
        }
      }
    } catch (e) {
      this.showMessage(mType.error, 'Thông báo lỗi', 'Gửi đi không thành thành công');
    }
  }

  saveLetter() {
    try {
      this.checkStatus = this.listStatusLetter[1];
      if (this.checkUndefined() == false) {
        this.showMessage(mType.warn, 'Thông báo', 'Vui lòng nhập đầy đủ các thông tin bắt buộc');
        return;
      } else {
        const param = this.createParams(typeLetterFrom.NoiBoKhongDauMoi)
        if (param == null) {
          this.showMessage(mType.warn, 'Thông báo', 'Lưu thư không thành công');
          return;
        } else {
          this.nhapMoiService.createLetter(param).subscribe();
          this.showMessage(mType.success, 'Thông báo', 'Lưu sẽ được lưu ở trạng thái đang soạn');
          setTimeout(() => {
            window.location.reload();
          }, 500)
        }
      }
    } catch (e) {
      this.showMessage(mType.error, 'Thông báo lỗi', 'Lưu mẫu đi không thành thành công');
    }
  }

  selectEvent(item) {
    this.receiveAddress = item.address;
  }

  getAddressFromNoiNhanBenNgoai() {
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    // do something
  }

  showThuMauDialog() {
    this.showThuMau = true;
    const param = {
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

  onRowSelect(ev: any) {
    this.selectedTable = ev.data
    this.listDonViNhan = [this.selectedTable.receiveUnit]
    this.listDonViTrucThuocNhan = [this.selectedTable.affiliatedReceiveUnit]
    this.listNguoiNhan = [this.selectedTable.recipient]
    this.listNguoiGui = [this.selectedTable.sender]
    this.checkboxTypeLetter = this.listTypeLetters[this.selectedTable.type-1];

  }

  dbClickGetSampleLetter(row: any) {
    try {
      this.showThuMau = false;
      this.selectedLetterFrom = row.letterCode;
      this.selectedAffiliatedSendUnit = row.affiliatedSendUnit;
      this.selectedSender = row.sender;
      this.textCode = row.textCode;
      this.summary = row.summary;
      this.selectedSecurity = row.securityLevel;
      this.selectedUrgency = row.urgencyLevel;
      this.selectedReceivePlace = row.receivePlace;
      this.selectedReceiveUnit = this.selectedTable.receiveUnit;
      this.selectedAffiliatedReceiveUnit = this.selectedTable.affiliatedReceiveUnit;
      this.selectedRecipient = this.selectedTable.recipient;
      this.selectedSender = this.selectedTable.sender;
    } catch (e) {
      console.log('lỗi insert thư mẫu')
    }
  }

  deletedLetterFrom() {
    try {
      this.nhapMoiService.deletedThuDi(this.selectedRowSampleLetter.id).subscribe((data: any) => {
        if (data.result == false) {
          this.showMessage(mType.info, 'Thông báo', 'Xóa thư đi không thành thành công');
          return;
        }
        if (data.result == true) {
          const param = {
            pageIndex: 1,
            pageSize: 1000,
            status: 1,
            isSample: true
          }
          this.nhapMoiService.getLetterPattern(param).subscribe((data: any) => {
            this.listSampleLetter = data.result.content;
          })
          this.showMessage(mType.success, 'Thông báo', 'Xóa thư đi thành công');
          return;
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  checkTypeLetter(ev): any {
    if (ev == 1) {
      return 'Nội bộ'
    } else if (ev == 2) {
      return 'Bên ngoài'
    } else return null
  }

  onEventClose() {
    window.location.reload();
  }
}
