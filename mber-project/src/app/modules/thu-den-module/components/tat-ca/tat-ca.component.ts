import { Component, OnInit } from '@angular/core';
import {iComponentBase} from "../../../base-module/functions/iServiceBase";
import {LocalStorageService} from "../../../system-module/functions/store/local-storage.service";
import {Title} from "@angular/platform-browser";
import {MessageService} from "primeng/api";
import {TatCaService} from "./tat-ca.service";
import {DoMatModel, DonViModel, NhanVienModel, ThuDenModel} from "../../../base-module/models";
import {SharedApi} from "../../../base-module/service/api.shared.services";
import {StatusLetterFrom, StatusLetterTo} from "../../../base-module/enum/trang-thai-thu/statusLetter.enum";

@Component({
  selector: 'app-tat-ca',
  templateUrl: './tat-ca.component.html',
  styleUrls: ['./tat-ca.component.scss']
})
export class TatCaComponent extends iComponentBase implements OnInit {
  diachi: any;
  isVanthu = false;
  user : any;
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
  listThuMoi: ThuDenModel;
  inputDate = new Date();
  sendDate = new Date();
  listNguoiGui:any;
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
  constructor(private tatCaservice: TatCaService,
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
        status: StatusLetterFrom.NEW,
        code: 'new',
        name: 'Mới'
      },
      {
        status: StatusLetterTo.NOT_RECEIVED,
        code: 'NOT_RECEIVED',
        name: 'Chưa nhận'
      },
      {
        status: StatusLetterTo.RECEIVED,
        code: 'return',
        name: 'Đã Nhận'
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
    this.textCode= this.selectedRowLetter.textCode;
    this.codecn= this.selectedRowLetter.code;
    this.diachi= [ev.data.receiveAddress]
  }
  onSearch() {
   // this.checkStatusLetter = this.listStatusLetter[5]
    const param = {
     // status: 3,
      organizationId: this.selectedReceiveUnit ? this.selectedReceiveUnit?.sysOrganizationId : null,
      year: this.selectionYear?.year,
      keyword: this.keyword
    }
    this.tatCaservice.getAllThuMoi().subscribe((data: any) => {
      this.listThuMoi = data.result.items;
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
    this.tatCaservice.getAllThuMoi().subscribe((data: any) => {
      console.log(data)
      if (data) {
        this.listThuMoi = data.result.items;
        console.log('aaaaa',data)
      }
    })

  }
  loadnhan() {
   // this.checkStatusLetter = this.listStatusLetter[3]
    const param = {
    //  status: 3,
      organizationId: this.selectedReceiveUnit ? this.selectedReceiveUnit?.sysOrganizationId : null,
      year: this.selectionYear?.year,
      keyword: this.keyword
    }
    setTimeout(()=> {
      this.tatCaservice.getAllThuMoi().subscribe((data: any) => {
        this.listThuMoi = data.result.items;
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

