import {Component, OnInit} from '@angular/core';
import {NhapMoiService} from "./nhap-moi.service";
import {iComponentBase, mType} from "../../../base-module/functions/iServiceBase";
import {Title} from "@angular/platform-browser";
import {MessageService} from "primeng/api";
import {SharedApi} from "../../../base-module/service/api.shared.services";
import {LocalStorageService} from "../../../system-module/functions/store/local-storage.service";
import {StatusLetterTo} from "../../../base-module/enum/trang-thai-thu/statusLetter.enum";
import {
  DoKhanModel,
  DoMatModel,
  DonViModel,
  NhanVienModel,
  SoThuModel,
  ThuDenModel,
  ThuDiModel
} from "../../../base-module/models";
import {ErrorModel} from "../../../base-module/models/error/error.model";


@Component({
  selector: 'app-nhap-moi',
  templateUrl: './nhap-moi.component.html',
  styleUrls: ['./nhap-moi.component.scss']
})
export class NhapMoiComponent extends iComponentBase implements OnInit {
  first = 1;
  listStatusLetter: any;
  selectedStatus: any;
  isVanthu = false;
  checkNhanVien: any;
  thuDen: ThuDenModel;
  thuDi: ThuDiModel;
  checkVanThu: any;
  user: NhanVienModel; // full thông tin người dùng.
  listTypeLetters: any; // list checkbox thư nội bộ và bên ngoài
  checkboxTypeLetter: any;
  showVanDon = false;
  listVanDon: any;
  selectedListVanDon: any // selected row vận đơn table
  listSoThuDi: any;
  listCoQuan: DonViModel[];
  selectedCoQuan: DonViModel;
  listDonViTrucThuocNhan: DonViModel[];
  selectedDonViTrucThuocNhan: DonViModel;
  listNguoiNhan: NhanVienModel[];
  selectedNguoiNhan: NhanVienModel;
  listLetterCode: SoThuModel[];
  selectedThuDenMain: SoThuModel;
  selectedThuDenPopup: SoThuModel;
  selectedSendPlace: DonViModel; //Nơi gửi
  listSendPlace: DonViModel[];
  listSecurityLevel: DoMatModel[]; // độ mật
  selectedSecurityLevel: DoMatModel;
  listUrgencyLevel: DoKhanModel[]; // Độ khẩn
  selectedUrgencyLevel: DoKhanModel;
  listReceiveUnit: DonViModel[]; // Đơn vị nhận
  selectedReceiveUnit: DonViModel;
  listAffiliatedReceiveUnit: DonViModel[] // Đơn vị trực thuộc nhận
  selectedAffiliatedReceiveUnit: DonViModel;
  listRecipient: NhanVienModel[]; // người nhận
  selectedRecipient: NhanVienModel;
  listDonViNhanBenNgoai: DonViModel[];
  selectedDonViNhanBenNgoai: DonViModel;
  listDonViTrucThuocNhanBenNgoai: DonViModel[]
  selectedDonViTrucThuocNhanBenNgoai: DonViModel;

  constructor(public title: Title,
              private sharedApi: SharedApi,
              private nhapMoiService: NhapMoiService,
              private tokenStorageService: LocalStorageService,
              public msg: MessageService) {
    super(msg, title);
    this.checkNhanVien = window.localStorage.getItem('nhanvien')
    this.checkVanThu = window.localStorage.getItem('vanthu')
  }

  ngOnInit(): void {
    this.thuDen = {};
    if (this.checkNhanVien) {
      this.isVanthu = false
    } else {
      this.isVanthu = true
    }
    this.listStatusLetter = [
      {
        status: StatusLetterTo.NEW,
        code: '1',
        name: 'Mới'
      },
      {
        status: StatusLetterTo.NOT_RECEIVED,
        code: '2',
        name: 'Chưa nhận'
      },
      {
        status: StatusLetterTo.RECEIVED,
        code: '3',
        name: 'Đã nhận'
      }
    ]
    this.selectedStatus = this.listStatusLetter[0];
    this.user = this.tokenStorageService.getUserFromStorage(); // get thông tin người dùng đăng nhập trong hệ thống
    this.listTypeLetters = [{name: 'Nội bộ', key: '1'}, {name: 'Bên ngoài', key: '2'}];  // selection loại thư bên trong và bên ngoài
    this.checkboxTypeLetter = this.listTypeLetters[0]; // Selected mặc định thư nội bộ khi vào màn hình.
    this.getThuDen();
    this.initData();
  }

  // action chọn loại thư nội bộ hoặc bên ngoài để xử lý vấn đề gì đấy
  typeLetterAction() {
    if (this.checkboxTypeLetter.key == '1') {
    } else {
    }
    console.log(this.checkboxTypeLetter)
  }

  initData() {
    this.thuDen.requestDate = new Date();
    // lấy sổ thư.
    this.sharedApi.getSoThuDi().subscribe(data => {
      this.listSoThuDi = data.result.items;
      this.listLetterCode = data.result.items;
    })
    // get don vị
    this.sharedApi.getAllDonVi().subscribe(data => {
      this.listCoQuan = data.result.items;
      this.listSendPlace = data.result.items;
      // this.listReceiveUnit = data.result.items;
      this.listDonViNhanBenNgoai = data.result.items;
      this.listReceiveUnit = [];
    })
    // get độ mật
    this.sharedApi.getDoMat().subscribe(data => {
      this.listSecurityLevel = data.result.items;
    })
    // get độ khẩn
    this.sharedApi.getDoKhan().subscribe(data => {
      this.listUrgencyLevel = data.result.items;
    })

  }

  // get data theo parent
  getDonViTrucThuoc(selectedData?: DonViModel) {
    // get đơn vị nhận theo đơn vị nhận
    if (this.selectedCoQuan == undefined) {
      this.listDonViTrucThuocNhan = [];
    } else {
      this.sharedApi.getParentOrganizations(this.selectedCoQuan.sysOrganizationId).subscribe((data: any) => {
        this.listDonViTrucThuocNhan = data.result.items;
      })
    }
    if (selectedData) {
      this.sharedApi.getParentOrganizations(selectedData.sysOrganizationId).subscribe((data: any) => {
        this.listAffiliatedReceiveUnit = data.result.items;
      })
    } else {
      this.listAffiliatedReceiveUnit = [];
    }
  }

  getNhanVien(selectedData?: DonViModel) {
    // get nhan vien theo bo phan
    if (this.selectedDonViTrucThuocNhan == undefined) {
      this.listNguoiNhan = [];
    } else
      this.sharedApi.getPersonByParentOganization(this.selectedDonViTrucThuocNhan.sysOrganizationId).subscribe((data: any) => {
        this.listNguoiNhan = data.result.items;
      })
    if (selectedData) {
      this.sharedApi.getPersonByParentOganization(selectedData.sysOrganizationId).subscribe((data: any) => {
        this.listRecipient = data.result.items;
      })
    } else {
      this.listRecipient = [];
    }
  }

  getMayLe(selected: NhanVienModel) {
    if (selected) {
      this.thuDen.ext = selected.mobilePhone + ', ts@gmail.com';
    } else {
      this.thuDen.ext = '';
    }
  }

  // get đơn vị nhận bên ngoài
  getDonViTrucThuocNhanBenNgoai(ev: any) {
    // get đơn vị nhận bên ngoài
    if (this.selectedDonViNhanBenNgoai == undefined) {
      this.listDonViTrucThuocNhanBenNgoai = [];
    } else {
      this.sharedApi.getParentOrganizations(this.selectedDonViNhanBenNgoai.sysOrganizationId).subscribe((data: any) => {
        this.listDonViTrucThuocNhanBenNgoai = data.result.items;
      })
    }
  }

  // get máy lẻ người nhận bên ngoài
  getMayLeBenNgoai(ev: any) {
// get đơn vị nhận bên ngoài
    if (this.selectedDonViTrucThuocNhanBenNgoai == undefined) {
      this.thuDen.ext = ''
    } else {
      this.sharedApi.getPersonByParentOganization(this.selectedDonViTrucThuocNhanBenNgoai.sysOrganizationId).subscribe((data: any) => {
        this.thuDen.ext =  data.result.items[0].fullName + '-' + data.result.items[0].mobilePhone
        console.log(data.result.items);
      })
    }
  }

  onShowVanDon() {
    try {
      this.showVanDon = true;
      console.log(this.listVanDon)
    } catch (e) {
      console.log(e)
    }
  }

  getThuDen() {
    const param = {
      status: 5,
      organizationId: null,
      year: null,
      keyword: null,
      pageIndex: 1,
      pageSize: 1000
    }
    this.sharedApi.getThuDiTheoTrangThai(param).subscribe((data: any) => {
      this.listVanDon = data.result.content;
    })
  }

  onRowSelect(ev: any) {
    this.checkboxTypeLetter = this.listTypeLetters[ev.data.type - 1]; // Selected mặc định thư nội bộ khi vào màn hình.
    this.listReceiveUnit = [ev.data.receiveUnit]
    this.listAffiliatedReceiveUnit = [ev.data.affiliatedReceiveUnit]
    this.listRecipient = [ev.data.recipient]
    this.thuDen.ext = ev.data.recipient?.mobilePhone + '-' + ev.data.recipient?.positionName + '-' + ev.data.recipient?.employeeCode
    console.log(ev)
  }

  onDbClickRow(ev: ThuDiModel) {
    try {
      this.thuDi = ev;
      this.showVanDon = false;
      this.thuDen.itemCode = ev?.itemCode
      this.selectedThuDenMain = ev?.letterCode;
      this.thuDen.dateTo = new Date();
      this.thuDen.documentCode = ev?.textCode;
      this.selectedSendPlace = ev.sendUnit;
      this.selectedSecurityLevel = ev.securityLevel;
      this.selectedUrgencyLevel = ev.urgencyLevel;
      // TODO
      this.selectedReceiveUnit = ev.receiveUnit  // đơn vị nhận
      console.log('xx', this.selectedReceiveUnit);
      this.selectedAffiliatedReceiveUnit = ev.affiliatedReceiveUnit  //  Đơn vị trực thuộc nhận
      this.selectedRecipient = ev.recipient      //        Người nhận
      this.thuDen.id = ev.id
    } catch (e) {
      console.log(e)
    }
  }


  onCreateParam(): any {
    const param = {
      isSample: false, // mẫu nếu bên ngoài có check true false, nội bộ mặc định là false
      type: Number(this.checkboxTypeLetter.key), // loại thư nội bộ hay bên ngoài 1,2
      itemCode: this.thuDen.itemCode, // Số vận đơn
      letterCodeId: this.checkboxTypeLetter.key == 1 ? this.selectedThuDenMain?.id: null, // Sổ thư đến
      dateTo:  new Date(this.thuDen.dateTo).getTime(), //Ngày đến
      documentCode: this.thuDen.documentCode, //Số hiệu văn bản
      sendPlaceId: this.selectedSendPlace.sysOrganizationId, // nơi gửi
      requestDate: new Date(this.thuDen.requestDate).getTime(), //Ngày yêu cầu từ
      securityLevelId: this.selectedSecurityLevel.id, // độ mật
      urgencyLevelId: this.selectedUrgencyLevel.id, // độ khẩn
      receiveUnitId: this.checkboxTypeLetter.key == 1 ? this.selectedReceiveUnit?.sysOrganizationId: this.selectedDonViNhanBenNgoai?.sysOrganizationId, // // đơn vị nhận
      affiliatedReceiveUnitId: this.checkboxTypeLetter.key == 1 ? this.selectedAffiliatedReceiveUnit?.sysOrganizationId : this.selectedDonViTrucThuocNhanBenNgoai?.sysOrganizationId, // Đơn vị trực thuộc nhận
      recipientId: this.checkboxTypeLetter.key == 1 ? this.selectedRecipient?.employeeId : null, // người nhận
      ext: this.thuDen.ext, //Máy lẻ
      receiveTime: new Date(this.thuDen.receiveTime).getTime(), // thời gian nhận
      status: this.selectedStatus.status, // trạng thái thư đến
      note: this.thuDen.note, // ghi chú
      staffId: this.user.employeeId, // nhân viên
      verifierId: null, // Người xác nhận
      verifyTime: null, // thời gian xác nhận
      reserveReceiverId: null, //Người nhận hộ
      reserveReceiverUnitId: null //Đơn vị của người nhận hộ
    }
    console.log('param', param)
    return param
  }

  onSend() {
    this.selectedStatus = this.listStatusLetter[1]
    console.log(this.selectedStatus.status)
    const param = this.onCreateParam();
    this.nhapMoiService.createThuMoi(param).subscribe((data: any) => {
      if (data) {
        this.showMessage(mType.success, 'Thông báo', 'Nhập mới thư đến thành công');
        setTimeout(() => {
          window.location.reload();
        }, 500)
      }
    }, (error: ErrorModel)=>{
      this.showMessage(mType.warn, 'Thông báo', 'Nhập mới thư đến không thành công'+','+ error.error.result.errors[0]);
    })
  }

  refresh() {
    window.location.reload();
  }
}
