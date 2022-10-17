import {Component, OnInit} from '@angular/core';
import {
  DoMatModel,
  DonViModel,
  NhanVienModel,
  ThuDenModel
} from "../../../base-module/models";
import {LocalStorageService} from "../../../system-module/functions/store/local-storage.service";
import {SharedApi} from "../../../base-module/service/api.shared.services";
import {Title} from "@angular/platform-browser";
import {MessageService} from "primeng/api";
import {iComponentBase} from "../../../base-module/functions/iServiceBase";
import {ThuDaNhanService} from "./thu-da-nhan.service";
import {StatusLetterTo} from "../../../base-module/enum/trang-thai-thu/statusLetter.enum";


@Component({
  selector: 'app-thu-da-nhan',
  templateUrl: './thu-da-nhan.component.html',
  styleUrls: ['./thu-da-nhan.component.scss']
})
export class ThuDaNhanComponent extends iComponentBase implements OnInit {
  diachi: any;
  isVanthu = false;
  user: any;
  textCode: any;
  codecn: '';
  keyword = '';
  listStatusLetter: any;
  listTypeLetters: any;
  thuDen: ThuDenModel;
  letterCode: any;
  checkStatusLetter: any;
  selectedRowLetter: any;
  listDonVi: DonViModel[];
  checkboxTypeLetter: any = null;
  checkStatus: any;
  years = [{year: 2017}, {year: 2018}, {year: 2019}, {year: 2020}, {year: 2021}, {year: 2022}]
  selectionYear: any;
  listReceivePlace: any[];
  checkNhanVien: any;
  checkVanThu: any;
  listThuMoi: any;
  inputDate = new Date();
  sendDate = new Date();
  listNguoiGui: any;
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


  constructor(private thuDaNhanservice: ThuDaNhanService,
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
        name: 'Thư chưa nhận'
      },
      {
        status: StatusLetterTo.RECEIVED,
        code: 'received',
        name: 'Thư đã nhận'
      }
    ]
  }

  ngOnInit(): void {
    this.thuDen = {};
    this.checkStatus = this.listStatusLetter[0];
    this.checkStatusLetter = this.listStatusLetter[0];
    this.selectionYear = this.years[this.years.length - 1]
    this.getDonVi();
    this.getAllThuMoi();
    this.getTypeLetterOnInit();
  }

  onRowSelect(ev: any) {
    this.selectedRowLetter = ev.data;
    this.selectedAffiliatedReceiveUnit = this.selectedRowLetter.selectedAffiliatedReceiveUnit;
    this.listNguoiGui = [ev.data.sender]
    this.listReceiveUnit = [ev.data.receiveUnit]
    this.listAffiliatedReceiveUnit = [ev.data.affiliatedReceiveUnit]
    this.listPersonForUnit = [this.selectedRowLetter.recipient]
    this.textCode = this.selectedRowLetter.textCode;
    this.codecn = this.selectedRowLetter.code;
    this.diachi = [ev.data.receiveAddress]
  }

  onSearch() {
    this.checkStatusLetter = this.listStatusLetter[5]
    const param = {
      status: 3,
      organizationId: this.selectedReceiveUnit ? this.selectedReceiveUnit?.sysOrganizationId : null,
      year: this.selectionYear?.year,
      keyword: this.keyword
    }
    this.thuDaNhanservice.getAllThuMoi(param).subscribe((data: any) => {
      this.listThuMoi = data.result.content;
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

  getTypeLetterOnInit() {
    this.checkboxTypeLetter = this.listTypeLetters[0];
  }

  getAllThuMoi() {
    this.checkStatusLetter = this.listStatusLetter[3]
    const param = {
      status: 3,
    }
    this.thuDaNhanservice.getAllThuMoi(param).subscribe((data: any) => {
      console.log(data)
      if (data) {
        this.listThuMoi = data.result.content;
        console.log('aaaaa', this.listThuMoi)
      }
    })

  }

  loadnhan() {
    this.checkStatusLetter = this.listStatusLetter[3]
    const param = {
      status: 3,
      organizationId: this.selectedReceiveUnit ? this.selectedReceiveUnit?.sysOrganizationId : null,
      year: this.selectionYear?.year,
      keyword: this.keyword
    }
    setTimeout(() => {
      this.thuDaNhanservice.getAllThuMoi(param).subscribe((data: any) => {
        this.listThuMoi = data.result.content;
      })
    }, 500)
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




