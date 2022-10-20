import {Component, OnInit} from '@angular/core';
import {SharedApi} from "../../../base-module/service/api.shared.services";
import {NhanVienModel, NoiNhanBenNgoaiModel} from "../../../base-module/models";

@Component({
  selector: 'app-noi-nhan-ben-ngoai',
  templateUrl: './noi-nhan-ben-ngoai.component.html',
  styleUrls: ['./noi-nhan-ben-ngoai.component.scss']
})
export class NoiNhanBenNgoaiComponent implements OnInit {
  listNoiNhanBenNgoai: NoiNhanBenNgoaiModel[];
  cols = [
    {field: 'id', header: 'Mã code', style: 'width: 6%; text-align: center'},
    {field: 'contactName', header: 'Tên liên hệ', style: 'width: 20%; text-align: left'},
    {field: 'address', header: 'Địa chỉ', style: 'width: auto; text-align: left'},
    {field: 'phone', header: 'Số điện thoại', style: 'width: 20%; text-align: left'},
  ]

  constructor(private shareApi: SharedApi) {
  }

  ngOnInit(): void {
    this.shareApi.getAllNoiNhanBenNgoai().subscribe((data: any) => {
      this.listNoiNhanBenNgoai = data.result.items
      console.log(data);
    })
  }

}
