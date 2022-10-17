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
  DonViModel, NhanVienModel,
  NoiNhanModel, SoThuModel,
  ThuDenModel, ThuDiModel
} from "../../../base-module/models";
import {StatusLetterTo} from "../../../base-module/enum/trang-thai-thu/statusLetter.enum";

@Component({
  selector: 'app-thu-moi',
  templateUrl: './thu-moi.component.html',
  styleUrls: ['./thu-moi.component.scss']
})
export class ThuMoiComponent extends iComponentBase implements OnInit {
  diachi: any;
  isVanthu = false;
  user : any;
  textCode: any;
  codecn: '';
  keyword = '';
  listSoThuDen: any;
  selectedThuMoi: any;
  listStatusLetter: any;
  listTypeLetters: any;
  thuDen: ThuDenModel;
  showXuLy = false;
  letterCode: any;
  checkStatusLetter: any;
  selectedRowLetter: any;
  listDonVi: DonViModel[];
  checkboxTypeLetter: any = null;
  checkStatus: any;
  years = [{year: 2017}, {year: 2018}, {year: 2019}, {year: 2020}, {year: 2021}, {year: 2022}]
  selectionYear: any;
  selectedSoThuDi: SoThuModel;
  //Nơi
  listReceivePlace: any[];
  selectedReceivePlace: NoiNhanModel;
  checkNhanVien: any;
  checkVanThu: any;
  listThuMoi: any;
  selectedDonViTrucThuocGui: any;
  inputDate = new Date();
  sendDate = new Date();
  listNguoiGui:any;
  selectedNguoiGui: any;
  listSecurity: any;
  listUrgencyLevel: any;
  selectedUrgencyLevel: DoKhanModel;
  selectedSecurity: DoMatModel;
  listDonViTrucThuocGui: DonViModel[];
  //Đơn Vị
  listReceiveUnit: DonViModel[];
  selectedReceiveUnit: DonViModel;
  //Đơn Vị Trực Thuộc nhận
  listAffiliatedReceiveUnit: DonViModel[];
  selectedAffiliatedReceiveUnit: DonViModel;
  selectedAffiliatedSendUnit: any;
  // get người theo đơn vị trực thuộc nhận
  listPersonForUnit: NhanVienModel[];
  selectedPersonForUnit: NhanVienModel;
  statusString = 'Thư Đã Gửi';

  constructor(private thuMoiservice: ThuMoiService,
              private tokenStorageService: LocalStorageService,
              private shareApi: SharedApi,
              public title: Title,
              public msg: MessageService) {
    super(msg, title);
    this.user = this.tokenStorageService.getUserFromStorage(); // get thông tin người dùng đăng nhập
    this.listTypeLetters = [{name: 'Nội bộ', key: '1'}, {name: 'Bên ngoài', key: '2'}];  // selection loại thư bên trong và bên ngoài

    this.checkNhanVien = window.localStorage.getItem('nhanvien')
    this.checkVanThu = window.localStorage.getItem('vanthu')
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
    this.thuDen = {};
    this.checkStatus = this.listStatusLetter[0];
    this.checkStatusLetter = this.listStatusLetter[0];
    this.selectionYear = this.years[this.years.length - 1]
    this.getAllThuMoi();
    this.getDonVi();
    this.getSoThuDi();
    this.getTypeLetterOnInit();

    // lấy sổ thư đi.
    this.shareApi.getSoThuDi().subscribe(data => {
      this.thuDen.letterCode = data.result.items;
    })
    this.thuMoiservice.getAllOrganizations().subscribe(data => {
      this.thuDen.letterCode = data.result.items;
    })
    // get đơn vị trực thuộc gửi
    this.thuMoiservice.getParentOrganizations(this.user.organization.orgParentId).subscribe(data => {
      this.listDonViTrucThuocGui = data.result.items;
      //console.log(this.listDonViTrucThuocGui);
    })
    // get người gửi và nhận
    this.thuMoiservice.getAllPerson().subscribe(data => {
      this.listPersonForUnit = data.result.items;
    })

    // get độ mật
    this.thuMoiservice.getAllSecurity().subscribe(data => {
      this.listSecurity = data.result.items;
    })
    // get độ khẩn
    this.thuMoiservice.getAllUrgency().subscribe(data => {
      this.listUrgencyLevel = data.result.items;
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

  onDeletedRow() {
    if (this.selectedRowLetter) {
      try {
        this.thuMoiservice.deletedThuMoi(this.selectedRowLetter.id).subscribe((data: any) => {
          if (data){
            this.showMessage(mType.success, 'Thông báo', 'Xóa thành công');
            this.getAllThuMoi();
          }else{
          }
        })

      } catch (e) {
        this.showMessage(mType.error, 'Thông báo', 'Xóa không thành công');
      }
    } else {
      this.showMessage(mType.warn, 'Thông báo', 'Vui lòng chọn dữ liệu');
      this.showXuLy = false;
      return;
    }

  }
     loadnhan() {
       this.checkStatusLetter = this.listStatusLetter[5]
       const param = {
         status: 5,
         organizationId: this.selectedReceiveUnit ? this.selectedReceiveUnit?.sysOrganizationId : null,
          year: this.selectionYear?.year,
         keyword: this.keyword
       }
       setTimeout(()=> {
         this.thuMoiservice.getAllThuMoi(param).subscribe((data: any) => {
           this.listThuMoi = data.result.content;
         })
       }, 500)
     }
  loadNhanVienTheoBoPhan() {
    // get nhan vien theo bo phan
    if (this.selectedDonViTrucThuocGui == undefined) {
      this.listNguoiGui = [];
    } else
      this.thuMoiservice.getPersonByParentOganization(this.selectedDonViTrucThuocGui.sysOrganizationId).subscribe((data: any) => {
        this.listNguoiGui = data.result.items;
      })
  }
  loadDonViTrucThuocNhan() {
    // get đơn vị trực thuộc nhận theo đơn vị nhận
    if (this.selectedReceiveUnit == undefined) {
      this.listAffiliatedReceiveUnit = [];
    } else
      this.shareApi.getParentOrganizations(this.selectedReceiveUnit.sysOrganizationId).subscribe((data: any) => {
        this.listAffiliatedReceiveUnit = data.result.items;
        console.log('aaaaaaaaaaaaaa',this.listAffiliatedReceiveUnit);
      })
  }
  getSoThuDi() {
    this.shareApi.getSoThuDi().subscribe(data => {
      this.listSoThuDen = data.result.items;
    })
  }
  loadDonViNhan() {
    // get đơn vị nhận theo nơi nhận
    if (this.selectedReceivePlace == undefined) {
      this.listReceiveUnit = [];
    } else
      this.thuMoiservice.getParentOrganizations(this.selectedReceivePlace.sysOrganizationId).subscribe((data: any) => {
        this.listReceiveUnit = data.result.items;
      })
  }
  loadNguoiNhan() {
    // get người nhận theo đơn vị trực thuộc nhận
    if (this.selectedAffiliatedReceiveUnit == undefined) {
      this.listPersonForUnit = [];
    } else
      this.shareApi.getPersonByParentOganization(this.selectedAffiliatedReceiveUnit?.sysOrganizationId).subscribe((data: any) => {
        this.listPersonForUnit = data.result.items;
        console.log('aaaa',this.listPersonForUnit);
      })

  }
  onSearch() {
    this.checkStatusLetter = this.listStatusLetter[5]
    const param = {
      status: 5,
      organizationId: this.selectedReceiveUnit ? this.selectedReceiveUnit?.sysOrganizationId : null,
      year: this.selectionYear?.year,
      keyword: this.keyword
    }
    this.thuMoiservice.getAllThuMoi(param).subscribe((data: any) => {
      this.listThuMoi = data.result.content;
    })
  }
  onUpdateThuMoi() {
    try {
      if (this.selectedRowLetter) {
        this.showXuLy = true;
        this.selectedDonViTrucThuocGui = this.selectedRowLetter.affiliatedSendUnit;
       // this.thuDen.letterCode = this.selectedRowLetter.letterCode;
        this.selectedSoThuDi = this.selectedRowLetter.letterCode;
        this.selectedNguoiGui = this.selectedRowLetter.sender;
        this.inputDate = new Date(this.selectedRowLetter.inputDate);
        this.sendDate = new Date(this.selectedRowLetter.sendDate);
        this.selectedSecurity = this.selectedRowLetter.securityLevel;
        this.selectedUrgencyLevel = this.selectedRowLetter.urgencyLevel;
        this.selectedReceivePlace = this.selectedRowLetter.receivePlace;
        this.selectedReceiveUnit = this.selectedRowLetter.receiveUnit;
        this.selectedAffiliatedReceiveUnit = this.selectedRowLetter.affiliatedReceiveUnit;
        this.diachi = this.selectedRowLetter.receiveAddress;
        this.selectedPersonForUnit = this.selectedRowLetter.recipient;
      } else {
        this.showMessage(mType.warn, 'Thông báo', 'Vui lòng chọn dữ liệu');
        this.showXuLy = false;
        return;
      }
    } catch (e) {
      console.log('error get update data')
    }
  }
  onPopupThuMoi() {
    console.log('click me');
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
      } else {
        //this.showXuLy = false;
        this.showMessage(mType.info, 'Thông báo', 'Vui lòng chọn dữ liệu trên bảng');
      }
    } catch (e) {
      console.log('error')
    }
  }
  getAllThuMoi() {
    this.checkStatusLetter = this.listStatusLetter[3]
    const param = {
      status: 5
    }
    this.thuMoiservice.getAllThuMoi(param).subscribe((data: any) => {
      console.log(data)
      if (data) {
        this.listThuMoi = data.result.content;
      }
    })
  }
  onClickLuu() {
    try {
      this.checkStatus.status = 5;
      const param = this.createParams();
      this.thuMoiservice.updateLetter(this.selectedRowLetter.id, param).subscribe((data: any) => {
        if (data) {
          this.showMessage(mType.success, 'Thông báo', 'Cập nhật thành công');
          // setTimeout(() => {
          //   window.location.reload();
          // }, 500)
        }
      })
    } catch (e) {
      console.log(e)
    }
  }
  createParams(): any {
     try {
      const param = {
        isSample: false,
        type: Number(this.checkboxTypeLetter.key),  // Phân loại thư
        staffId: this.user?.employeeId,// nhân viên lấy từ hệ thống đăng nhập
        code: this.codecn,
        letterCodeId: this.selectedSoThuDi.id,
        inputDate: this.inputDate.getTime(),
        sendDate: this.sendDate.getTime(),
        sendUnitId: this.user?.organization?.sysOrganizationId,
        affiliatedSendUnitId: this.selectedDonViTrucThuocGui?.sysOrganizationId,
        textCode: this.textCode,
        recipientId: this.checkboxTypeLetter.key == 1 ? this.selectedPersonForUnit?.employeeId : null,  // Người nhận

        senderId: this.selectedNguoiGui?.employeeId,
        securityLevelId: this.selectedSecurity.id,
        urgencyLevelId: this.selectedUrgencyLevel?.id,
        receivePlaceId: this.selectedReceivePlace.sysOrganizationId, // nơi nhận
        receiveUnitId: this.selectedReceiveUnit?.sysOrganizationId, //đơn vị nhận
        affiliatedReceiveUnitId: this.selectedAffiliatedReceiveUnit?.sysOrganizationId,  // Đơn vị trực thuộc nhận
        receiveAddress: this.diachi,  // Địa chỉ nhận
        status: this.checkStatus.status  //1 Thư mới
      }
      console.log('param create', param)
      return param;
    } catch (e) {
      this.showMessage(mType.error, 'lỗi khởi tạo dữ liệu', e);
    }
  }
  getTypeLetterOnInit() {
    this.checkboxTypeLetter = this.listTypeLetters[0];
  }
  onRowSelect(ev: any) {
    this.selectedRowLetter = ev.data;
    this.selectedAffiliatedReceiveUnit = this.selectedRowLetter.selectedAffiliatedReceiveUnit;
    this.listNguoiGui = [ev.data.sender]
    this.listReceiveUnit = [ev.data.receiveUnit]
    this.listAffiliatedReceiveUnit = [ev.data.affiliatedReceiveUnit]
    this.listPersonForUnit = [this.selectedRowLetter.recipient]
    this.textCode= this.selectedRowLetter.textCode;
    this.codecn= this.selectedRowLetter.code;
    this.diachi= [ev.data.receiveAddress]


  }
  checkTypeLetter(typeLetter): string {
    if (typeLetter == 1) {
      return 'Nội bộ'
    }
    if (typeLetter == 2) {
      return 'Bên ngoài'
    } else return null
  }
}
