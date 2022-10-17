import {apiServiceBase} from "../../../base-module/service/api-service-base";
import * as API from "../../../base-module/service/api-gateway";

import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ThuDangSoanService extends apiServiceBase {
  // get thư đi theo trạng thái đang soạn, mơi, đã gửi.....
  public getThuDangSoan(status: any): Observable<any> {
    return this.postData(API.PHAN_HE.THU_DI, API.API_THU_DI.GET_THU_DI_THEO_LOAI, status);
  }
  public deletedThuDangSoan(id: any) {
    return this.deletedData(API.PHAN_HE.THU_DI, API.API_THU_DI.DELETED +'/'+id)
  }
}

