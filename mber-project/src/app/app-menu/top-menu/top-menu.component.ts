import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from "../../modules/system-module/functions/store/local-storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {
  imagePath = 'assets/layout/images/logo.png'
  submenu = {
    thuDen: '/thu-den',
    thuDi: '/thu-di',
    baoCao: '/bao-cao'
  }
  childMenuThuDen = [
    {
      link: this.submenu.thuDen + '/nhap-moi',
      name: 'Nhập mới'
    },
    {
      link: this.submenu.thuDen + '/thu-moi',
      name: 'Thư mơi'
    },
    {
      link: this.submenu.thuDen + '/thu-chua-nhan',
      name: 'Thư chưa nhận'
    },
    {
      link: this.submenu.thuDen + '/thu-da-nhan',
      name: 'Thư đã nhận'
    },
    {
      link: this.submenu.thuDen + '/tat-ca',
      name: 'Tất cả'
    }
  ]
  childMenuThuDi = [
    {
      link: this.submenu.thuDi + '/nhap-moi',
      name: 'Nhập mới'
    },
    {
      link: this.submenu.thuDi + '/thu-dang-soan',
      name: 'Thư đang soạn'
    },
    {
      link: this.submenu.thuDi + '/thu-tra-lai',
      name: 'Thư trả lại'
    },
    {
      link: this.submenu.thuDi + '/thu-cho-xu-ly',
      name: 'Thư chờ xử lý'
    },
    {
      link: this.submenu.thuDi + '/thu-da-gui',
      name: 'Thư đã gửi'
    },
    {
      link: this.submenu.thuDi + '/tat-ca-thu-di',
      name: 'Tất cả'
    },
    {
      link: this.submenu.thuDi + '/import-thu-di',
      name: 'Import thư đi'
    }
  ]

  listMenuBaoCao = [
    {
      link: this.submenu.baoCao + '/bao-cao-so-thu-di',
      name: 'Báo cáo số thư đi'
    },
    {
      link: this.submenu.baoCao + '/bao-cao-so-thu-den',
      name: 'Báo cáo số thư đến'
    },
    {
      link: this.submenu.baoCao + '/bao-cao-theo-chi-phi',
      name: 'Báo cáo theo chi phí'
    },
    {
      link: this.submenu.baoCao + '/bao-cao-tong-hop-thu',
      name: 'Báo cáo tổng hợp thư'
    },
  ]
  isLogin = false;
  user: any;

  isVanThu = [{vanthu: 'vanthu'}, {nhanvien: 'nhanvien'}]
  selectVanthu = false;
  selectNhanVien = false;

  constructor(private tokenStorageService:
                LocalStorageService,
              public router: Router, public route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.user = this.tokenStorageService.getUserFromStorage();
    if (this.user) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  }

  logout() {
    this.tokenStorageService.logout();
    this.isLogin = false;
    window.location.reload();
  }

  // tạm thời chưa có quyền làm tạm cái này
  todoCheckVanThu() {
    this.selectVanthu = true;
    this.selectNhanVien = false;
    if(this.selectVanthu == true){
      window.localStorage.setItem('vanthu', 'vanthu')
      window.localStorage.removeItem('nhanvien')
      setTimeout(() => {
        window.location.reload();
      }, 100)
    }
  }

  todoCheckNhanVien() {
    this.selectNhanVien = true;
    this.selectVanthu = false;
    if(this.selectNhanVien == true){
      window.localStorage.setItem('nhanvien', 'nhanvien')
      window.localStorage.removeItem('vanthu')
      setTimeout(() => {
        window.location.reload();
      }, 100)
    }
  }
}
